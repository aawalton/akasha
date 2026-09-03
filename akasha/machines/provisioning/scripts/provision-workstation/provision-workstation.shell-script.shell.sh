#!/usr/bin/env bash

set -euo pipefail

HERE="$(cd -- "$(dirname -- "$(readlink -f -- "$0")")" && pwd -P)"
. "$HERE/../repo-roots/repo-roots.shell-script.shell.sh"
AKASHA="$AKASHA_ROOT"
FILES="$AKASHA_ROOT/akasha/machines/provisioning/provisioned-files/pages"
SUDOERS_FILE="/etc/sudoers.d/walton-nopasswd"
SUDOERS_LINE="$(whoami) ALL=(ALL) NOPASSWD: ALL"

if ! command -v brew >/dev/null 2>&1; then
  echo "ERROR: Homebrew/linuxbrew not found on PATH." >&2
  echo "Install it first: https://brew.sh (linuxbrew lands at /home/linuxbrew/.linuxbrew)." >&2
  exit 1
fi

if ! sudo -n true 2>/dev/null; then
  echo "ERROR: passwordless sudo is required and is a manual prerequisite." >&2
  echo "       Run once with your password, then re-run this script:" >&2
  echo "         echo '$SUDOERS_LINE' | sudo tee $SUDOERS_FILE >/dev/null && sudo chmod 0440 $SUDOERS_FILE" >&2
  exit 1
fi
if ! sudo grep -qxF "$SUDOERS_LINE" "$SUDOERS_FILE" 2>/dev/null; then
  echo "==> Re-asserting passwordless sudo drop-in ($SUDOERS_FILE)..."
  sudoers_tmp="$(mktemp)"
  printf '%s\n' "$SUDOERS_LINE" >"$sudoers_tmp"
  if ! sudo visudo -cf "$sudoers_tmp" >/dev/null; then
    rm -f "$sudoers_tmp"
    echo "ERROR: generated sudoers drop-in failed visudo validation — not installing." >&2
    exit 1
  fi
  sudo install -m 0440 -o root -g root "$sudoers_tmp" "$SUDOERS_FILE"
  rm -f "$sudoers_tmp"
fi

echo "==> Updating Homebrew and installing Brewfile formulae..."
brew update
brew bundle --file "$FILES/workstation-brewfile.provisioned-file.content.conf"

echo "==> Symlinking libpq client binaries into ~/.local/bin..."
mkdir -p "$HOME/.local/bin"
libpq_bin="$(brew --prefix)/opt/libpq/bin"
if [ -d "$libpq_bin" ]; then
  for b in "$libpq_bin"/*; do
    ln -sf "$b" "$HOME/.local/bin/$(basename "$b")"
  done
else
  echo "WARN: $libpq_bin not found — skipping libpq symlinks." >&2
fi

echo "==> Installing the playwright MCP's Chromium..."
npx --yes @playwright/mcp@0.0.76 --version >/dev/null 2>&1 || true
core_cli="$(find "$HOME/.npm/_npx" -path '*/playwright-core/cli.js' 2>/dev/null | head -1)"
if [ -n "$core_cli" ]; then
  node "$core_cli" install chromium
else
  echo "WARN: bundled playwright-core not found in the npx cache;" >&2
  echo "      falling back to 'npx playwright-core install chromium' (may differ in revision)." >&2
  npx --yes playwright-core install chromium
fi
ws_core_cli="$(find "$AKASHA/node_modules" -path '*/playwright-core/cli.js' 2>/dev/null | head -1)"
if [ -n "$ws_core_cli" ]; then
  node "$ws_core_cli" install chromium
else
  echo "WARN: workspace playwright-core not found in $AKASHA/node_modules — run 'bun install' first." >&2
fi

echo "==> Installing ast-grep..."
ASTGREP_LIB="$HOME/.local/lib/ast-grep"
astgrep_url="$(cd "$AKASHA" && bun -e 'import { CI_TOOLCHAIN_URLS } from "@akasha/ci-benchmark/toolchain-manifest"; console.log(CI_TOOLCHAIN_URLS.astGrepZip)')"
astgrep_want="$(printf '%s\n' "$astgrep_url" | sed -n 's|.*/download/\([^/]*\)/.*|\1|p')"
astgrep_have=""
if [ -x "$ASTGREP_LIB/ast-grep" ]; then
  astgrep_have="$("$ASTGREP_LIB/ast-grep" --version 2>/dev/null | awk '{print $2}')"
fi
if [ "$astgrep_have" != "$astgrep_want" ]; then
  astgrep_zip="$(mktemp --suffix=.zip)"
  if wget -qO "$astgrep_zip" "$astgrep_url"; then
    mkdir -p "$ASTGREP_LIB"
    unzip -qo "$astgrep_zip" ast-grep -d "$ASTGREP_LIB"
    chmod +x "$ASTGREP_LIB/ast-grep"
    echo "    ast-grep $astgrep_want installed to $ASTGREP_LIB"
  else
    echo "WARN: could not download ast-grep $astgrep_want — the ast-grep check cannot be run locally until installed." >&2
  fi
  rm -f "$astgrep_zip"
else
  echo "    ast-grep $astgrep_have already installed — skipping."
fi
if [ -x "$ASTGREP_LIB/ast-grep" ]; then
  ln -sf "$ASTGREP_LIB/ast-grep" "$HOME/.local/bin/ast-grep"
fi

echo "==> Enabling the rootless podman docker-compat socket..."
if command -v podman >/dev/null 2>&1; then
  systemctl --user enable --now podman.socket
else
  echo "WARN: podman not found — gen-types (migration run) will fail without a container runtime." >&2
fi

echo "==> Installing the vendored upstream TamrielTradeCentre addon (ESOUI, via community-addon install command)..."
if [ "$(uname)" != "Darwin" ]; then
  if ! (cd "$AKASHA" && bun akasha/command-system/cli/cli.module.code.ts temper-community-addon-install TamrielTradeCentre); then
    echo "WARN: TamrielTradeCentre install via community-addon command failed — continuing." >&2
  fi
fi


echo "==> Projecting the workstation-service pages into systemd units..."
if [ -f "$AKASHA/akasha/command-system/cli/cli.module.code.ts" ]; then
  if ! (cd "$AKASHA" && bun akasha/command-system/cli/cli.module.code.ts service install --all); then
    echo "WARN: 'akasha service install --all' failed — every service that a" >&2
    echo "      workstation-service page describes is uninstalled on this box." >&2
    echo "      Re-run it once the cause is cleared." >&2
  fi
else
  echo "WARN: no akasha checkout at $AKASHA, so the workstation-service pages cannot" >&2
  echo "      be read and none of the services they describe is installed." >&2
fi

systemctl --user daemon-reload
loginctl enable-linger "$USER"

echo "==> Enabling SELinux container_use_devices for GPU container access..."
if command -v getsebool >/dev/null 2>&1; then
  if [ "$(getsebool container_use_devices 2>/dev/null | awk '{print $3}')" != "on" ]; then
    sudo setsebool -P container_use_devices on
  else
    echo "    container_use_devices already on — skipping."
  fi
else
  echo "WARN: getsebool not found — skipping (no SELinux on this host?)." >&2
fi

loginctl enable-linger "$USER"

echo "==> Wiring the wallpaper-black KDE shortcut (Meta+L)..."
if command -v gdbus >/dev/null 2>&1 && gdbus call --session --dest org.kde.kglobalaccel --object-path /kglobalaccel --method org.freedesktop.DBus.Peer.Ping >/dev/null 2>&1; then
  meta_l_owner="$(gdbus call --session --dest org.kde.kglobalaccel --object-path /kglobalaccel --method org.kde.KGlobalAccel.getGlobalShortcutsByKey 268435532 || true)"
  if [[ "$meta_l_owner" != *"wallpaper-black.desktop"* ]]; then
    kbuildsycoca6 >/dev/null 2>&1 || true
    gdbus call --session --dest org.kde.kglobalaccel --object-path /kglobalaccel --method org.kde.KGlobalAccel.setShortcutKeys "['ksmserver','Lock Session','','']" "[([16777402,0,0,0],)]" 4 >/dev/null
    gdbus call --session --dest org.kde.kglobalaccel --object-path /kglobalaccel --method org.kde.KGlobalAccel.doRegister "['wallpaper-black.desktop','_launch','Wallpaper Black','Wallpaper Black']"
    gdbus call --session --dest org.kde.kglobalaccel --object-path /kglobalaccel --method org.kde.KGlobalAccel.setShortcutKeys "['wallpaper-black.desktop','_launch','Wallpaper Black','Wallpaper Black']" "[([268435532,0,0,0],)]" 4 >/dev/null
  else
    echo "    Meta+L already bound to wallpaper-black — skipping."
  fi
else
  echo "WARN: org.kde.kglobalaccel not reachable — skipping (no KDE session?)." >&2
fi

echo "==> Ensuring disk-backed swapfile (OOM cushion below zram)..."
if [ ! -f /var/swap/swapfile ]; then
  sudo btrfs subvolume create /var/swap 2>/dev/null || sudo mkdir -p /var/swap
  sudo btrfs filesystem mkswapfile --size 64g /var/swap/swapfile
fi
if [ -f /etc/systemd/system/var-swap-swapfile.swap ]; then
  sudo systemctl start var-swap-swapfile.swap || true
else
  echo "    WARN: var-swap-swapfile.swap unit not installed — run setup-symlinks.sh first." >&2
fi
echo "    swap: $(swapon --show=NAME,SIZE,PRIO --noheadings | tr '\n' ' ')"

echo "==> Materializing Claude account alias snapshot (best-effort)..."
if ! (cd "$AKASHA" && bun ops claude-account sync-aliases) 2>/dev/null; then
  echo "    WARN: alias snapshot not written — run 'bun ops claude-account sync-aliases' once the akasha repo is in place." >&2
fi

echo
echo "Done. Manual follow-up:"
echo "  - Ensure the kubeconfig, ~/.secrets.env, tailscale enrollment, and home symlinks"
echo "    (setup-symlinks.sh) are in place — those are not provisioned by this script."
echo "  - Restore the workstation SMS outbound creds into ~/.secrets.env from the telnyx"
echo "    account page, which is their tracked source:"
echo "      akasha page-secret-reveal --file-path akasha/sms-core/telnyx-accounts/pages/outbound/outbound.telnyx-account.ts --key api-key"
echo "    and the from-number is stated on that page. Add each as"
echo "    'export KEY=value' (edit specific lines; never overwrite the file)."
echo "  - Once the akasha repo is in place, run 'bun ops claude-account sync-aliases' to"
echo "    rebuild ~/.claude/account-aliases.json (the cN shell aliases) from the account pages."
