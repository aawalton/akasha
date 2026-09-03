#!/usr/bin/env bash

set -euo pipefail

HERE="$(cd -- "$(dirname -- "$(readlink -f -- "$0")")" && pwd -P)"
REPO="$(cd -- "$HERE/../../../../.." && pwd -P)"
. "$REPO/akasha/machines/provisioning/scripts/repo-roots/repo-roots.shell-script.shell.sh"
AKASHA="$AKASHA_ROOT"
FILES="$AKASHA_ROOT/akasha/machines/provisioning/provisioned-files/pages"
SUDOERS_FILE="/etc/sudoers.d/walton-nopasswd"
SUDOERS_LINE="$(whoami) ALL=(ALL) NOPASSWD: ALL"
HEADSCALE_LOGIN="https://headscale.alanwalton.com"

if [ "$(uname)" != "Darwin" ]; then
  echo "ERROR: provision-macbook.sh is for macOS only (uname=$(uname))." >&2
  echo "       Use provision-workstation.sh on the Bazzite workstation." >&2
  exit 1
fi

if ! sudo -n true 2>/dev/null; then
  echo "ERROR: passwordless sudo is required and is a manual prerequisite." >&2
  echo "       Run once with your password, then re-run this script:" >&2
  echo "         echo '$SUDOERS_LINE' | sudo tee $SUDOERS_FILE >/dev/null && sudo chmod 440 $SUDOERS_FILE" >&2
  exit 1
fi
if ! sudo grep -qxF "$SUDOERS_LINE" "$SUDOERS_FILE" 2>/dev/null; then
  echo "==> Re-asserting passwordless sudo drop-in..."
  echo "$SUDOERS_LINE" | sudo tee "$SUDOERS_FILE" >/dev/null
  sudo chmod 440 "$SUDOERS_FILE"
fi

if ! command -v brew >/dev/null 2>&1 && [ ! -x /opt/homebrew/bin/brew ]; then
  echo "==> Installing Homebrew..."
  NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
if [ -x /opt/homebrew/bin/brew ]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi

echo "==> Updating Homebrew and installing Brewfile.macos formulae + casks..."
brew update
brew bundle --file "$FILES/macbook-brewfile.provisioned-file.content.conf"

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

if ! command -v bun >/dev/null 2>&1 && [ ! -x "$HOME/.bun/bin/bun" ]; then
  echo "==> Installing bun..."
  curl -fsSL https://bun.sh/install | bash
fi

if ! command -v claude >/dev/null 2>&1 && [ ! -x "$HOME/.local/bin/claude" ]; then
  echo "==> Installing Claude Code..."
  curl -fsSL https://claude.ai/install.sh | bash
fi

echo "==> Cloning the repositories this machine builds from..."
origin_base="$(git -C "$REPO" remote get-url origin | sed 's![^/]*$!!')"
ensure_clone() {
  local repo="$1" root="$2"
  if [ -d "$root/.git" ]; then
    echo "    $repo — already cloned at $root"
    return 0
  fi
  echo "    $repo — cloning into $root"
  mkdir -p "$(dirname "$root")"
  git clone "$origin_base$repo.git" "$root"
}
ensure_clone akasha "$AKASHA"

echo "==> Installing workspace dependencies (bun install)..."
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
( cd "$AKASHA" && bun install )

echo "==> Setting up home-directory symlinks..."
bash "$HERE/../setup-symlinks/setup-symlinks.shell-script.shell.sh"

echo "==> Starting tailscaled (root system daemon)..."
sudo brew services start tailscale

echo "==> Joining the tailnet (headscale control plane)..."
if tailscale status --json 2>/dev/null | grep -Eq '"BackendState": *"Running"'; then
  echo "  already connected:"
  tailscale status 2>/dev/null | head -1
elif [ -n "${TS_AUTHKEY:-}" ]; then
  sudo tailscale up --login-server="$HEADSCALE_LOGIN" --authkey="$TS_AUTHKEY" --accept-routes
  echo "  joined; programming subnet routes (--accept-routes)."
else
  echo "WARN: TS_AUTHKEY unset and node not connected — join manually:" >&2
  echo "      1. Mint a key inside headscale-0 (user ID 1, not name):" >&2
  echo "         kubectl exec -n headscale headscale-0 -- headscale preauthkeys create -u 1" >&2
  echo "      2. sudo tailscale up --login-server=$HEADSCALE_LOGIN --authkey=<key> --accept-routes" >&2
fi

echo "==> Starting node_exporter (Prometheus host metrics)..."
brew services start node_exporter

echo "==> Configuring macOS split-DNS resolvers for cluster.local / svc.cluster.local..."
sudo mkdir -p /etc/resolver
for suffix in cluster.local svc.cluster.local; do
  if grep -qxF "nameserver 100.100.100.100" "/etc/resolver/$suffix" 2>/dev/null; then
    echo "  /etc/resolver/$suffix already set"
  else
    printf 'nameserver 100.100.100.100\n' | sudo tee "/etc/resolver/$suffix" >/dev/null
    echo "  wrote /etc/resolver/$suffix"
  fi
done
sudo killall -HUP mDNSResponder 2>/dev/null || true

echo "==> Installing the Appium xcuitest driver (WebDriverAgent for the iOS Simulator)..."
if appium driver list --installed 2>&1 | grep -q "xcuitest"; then
  echo "    xcuitest driver already installed — skipping."
else
  appium driver install xcuitest
fi

echo "==> Raising the appium-ios-device web-inspector frame ceiling to 128 MB..."
wi_files=$(find "$HOME/.appium" -path '*appium-ios-device*/webinspector/index.js' 2>/dev/null)
if [ -z "$wi_files" ]; then
  echo "ERROR: no appium-ios-device webinspector/index.js under ~/.appium — is the xcuitest driver installed?" >&2
  exit 1
fi
for f in $wi_files; do
  if grep -q 'MAX_FRAME_SIZE = 128 \*' "$f"; then
    echo "    already 128 MB — skipping $f"
  elif grep -q 'MAX_FRAME_SIZE = 20 \*' "$f"; then
    sed -i '' -e 's/MAX_FRAME_SIZE = 20 \*/MAX_FRAME_SIZE = 128 */' "$f"
    echo "    patched $f"
  else
    echo "ERROR: MAX_FRAME_SIZE (20 or 128) not found in $f — appium-ios-device changed upstream; re-derive the frame-ceiling patch." >&2
    exit 1
  fi
done

echo
echo "Done. Manual follow-up (GUI / credentials — cannot be scripted):"
echo "  - Brave: sign in and enter your Sync code."
echo "  - 1Password: sign in to your account."
echo "  - Claude Code: run 'claude' and authenticate."
echo "  - Ensure the SOPS age key, ~/.kube/config, and ~/.secrets.env were copied"
echo "    from the workstation (phase-0 prerequisites — see CLAUDE.md)."
