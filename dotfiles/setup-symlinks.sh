#!/usr/bin/env bash

set -euo pipefail

DOTFILES="$(cd -- "$(dirname -- "$(readlink -f -- "$0")")" && pwd -P)"
. "$DOTFILES/../tools/lib/repo-roots.sh"
REPOS="$(dirname -- "$AKASHA_ROOT")"

. "$DOTFILES/lib/link.sh"

echo "Setting up dotfile symlinks..."
link "$DOTFILES/.bashrc"     "$HOME/.bashrc"
link "$DOTFILES/.profile"    "$HOME/.profile"
[ "$(uname)" = "Darwin" ] && link "$DOTFILES/.zshrc" "$HOME/.zshrc"
link "$DOTFILES/.tmux.conf"  "$HOME/.tmux.conf"
link "$DOTFILES/.gitconfig"  "$HOME/.gitconfig"
link "$DOTFILES/.ignore"     "$HOME/.ignore"
link "$DOTFILES/.config/git/ignore" "$HOME/.config/git/ignore"
link "$DOTFILES/bin/ops" "$HOME/.local/bin/ops"
link "$DOTFILES/bin/akasha" "$HOME/.local/bin/akasha"
[ "$(uname)" = "Darwin" ] || link "$DOTFILES/.config/containers/registries.conf.d/00-short-name-permissive.conf" "$HOME/.config/containers/registries.conf.d/00-short-name-permissive.conf"
[ "$(uname)" = "Darwin" ] || link "$DOTFILES/.config/containers/registries.conf.d/01-insecure-cluster-registry.conf" "$HOME/.config/containers/registries.conf.d/01-insecure-cluster-registry.conf"
[ "$(uname)" = "Darwin" ] || link "$DOTFILES/.local/share/applications/wallpaper-black.desktop" "$HOME/.local/share/applications/wallpaper-black.desktop"
link "$DOTFILES/repos/.vscode" "$REPOS/.vscode"

if [ "$(uname)" = "Darwin" ]; then
  echo "Skipping /etc/sysctl.d symlink (Linux-only; macOS detected)."
else
  echo "Setting up system config symlinks (sudo required)..."
  ETC_SYSCTL_SRC="$DOTFILES/etc-sysctl.d/99-claude-keepalive.conf"
  ETC_SYSCTL_DST="/etc/sysctl.d/99-claude-keepalive.conf"
  if [ -L "$ETC_SYSCTL_DST" ] && [ "$(readlink "$ETC_SYSCTL_DST")" = "$ETC_SYSCTL_SRC" ]; then
    echo "  $ETC_SYSCTL_DST already linked"
  else
    if [ -e "$ETC_SYSCTL_DST" ] && [ ! -L "$ETC_SYSCTL_DST" ]; then
      sudo mv "$ETC_SYSCTL_DST" "${ETC_SYSCTL_DST}.bak"
      echo "  backed up $ETC_SYSCTL_DST -> ${ETC_SYSCTL_DST}.bak"
    fi
    [ -L "$ETC_SYSCTL_DST" ] && sudo rm "$ETC_SYSCTL_DST"
    sudo ln -s "$ETC_SYSCTL_SRC" "$ETC_SYSCTL_DST"
    echo "  $ETC_SYSCTL_DST -> $ETC_SYSCTL_SRC"
    sudo sysctl --system >/dev/null
    echo "  applied via sudo sysctl --system"
  fi
fi

if [ "$(uname)" != "Darwin" ]; then
  ETC_UDEV_SRC="$DOTFILES/etc-udev-rules.d/70-btw5.rules"
  ETC_UDEV_DST="/etc/udev/rules.d/70-btw5.rules"
  if [ -L "$ETC_UDEV_DST" ] && [ "$(readlink "$ETC_UDEV_DST")" = "$ETC_UDEV_SRC" ]; then
    echo "  $ETC_UDEV_DST already linked"
  else
    if [ -e "$ETC_UDEV_DST" ] && [ ! -L "$ETC_UDEV_DST" ]; then
      sudo mv "$ETC_UDEV_DST" "${ETC_UDEV_DST}.bak"
      echo "  backed up $ETC_UDEV_DST -> ${ETC_UDEV_DST}.bak"
    fi
    [ -L "$ETC_UDEV_DST" ] && sudo rm "$ETC_UDEV_DST"
    sudo ln -s "$ETC_UDEV_SRC" "$ETC_UDEV_DST"
    echo "  $ETC_UDEV_DST -> $ETC_UDEV_SRC"
    sudo udevadm control --reload
    sudo udevadm trigger --subsystem-match=hidraw --subsystem-match=usb
    echo "  applied via udevadm reload + trigger"
  fi
fi

if [ "$(uname)" != "Darwin" ]; then
  ETC_OOMD_SRC="$DOTFILES/etc-systemd-oomd.conf.d/99-swap-used-limit.conf"
  ETC_OOMD_DST="/etc/systemd/oomd.conf.d/99-swap-used-limit.conf"
  if [ -f "$ETC_OOMD_DST" ] && [ ! -L "$ETC_OOMD_DST" ] && cmp -s "$ETC_OOMD_SRC" "$ETC_OOMD_DST"; then
    echo "  $ETC_OOMD_DST already current"
  else
    sudo mkdir -p /etc/systemd/oomd.conf.d
    sudo rm -f "$ETC_OOMD_DST"
    sudo install -m 0644 -T "$ETC_OOMD_SRC" "$ETC_OOMD_DST"
    echo "  installed (copied) $ETC_OOMD_DST"
    sudo systemctl restart systemd-oomd
    echo "  applied via systemctl restart systemd-oomd"
  fi
fi

if [ "$(uname)" != "Darwin" ]; then
  ETC_SWAPUNIT_SRC="$DOTFILES/etc-systemd-system/var-swap-swapfile.swap"
  ETC_SWAPUNIT_DST="/etc/systemd/system/var-swap-swapfile.swap"
  if [ -f "$ETC_SWAPUNIT_DST" ] && [ ! -L "$ETC_SWAPUNIT_DST" ] && cmp -s "$ETC_SWAPUNIT_SRC" "$ETC_SWAPUNIT_DST"; then
    echo "  $ETC_SWAPUNIT_DST already current"
  else
    sudo rm -f "$ETC_SWAPUNIT_DST"
    sudo install -m 0644 -T "$ETC_SWAPUNIT_SRC" "$ETC_SWAPUNIT_DST"
    echo "  installed (copied) $ETC_SWAPUNIT_DST"
    sudo systemctl daemon-reload
  fi
  sudo systemctl enable var-swap-swapfile.swap >/dev/null 2>&1 || true
  if [ -f /var/swap/swapfile ]; then
    sudo systemctl start var-swap-swapfile.swap || true
    echo "  enabled + activated var-swap-swapfile.swap"
  else
    echo "  enabled var-swap-swapfile.swap (swapfile absent — provision-workstation.sh step 9 creates + starts it)"
  fi
fi

echo "Ensuring headscale control-plane VIP in /etc/hosts (sudo required)..."
HEADSCALE_HOSTS_LINE="192.168.68.240 headscale.alanwalton.com"
if grep -qF "$HEADSCALE_HOSTS_LINE" /etc/hosts 2>/dev/null; then
  echo "  headscale.alanwalton.com VIP entry already present"
else
  printf '\n# headscale control-plane: intra-LAN MetalLB VIP (see packages/shared/dotfiles/CLAUDE.md)\n%s\n' \
    "$HEADSCALE_HOSTS_LINE" | sudo tee -a /etc/hosts >/dev/null
  echo "  added '$HEADSCALE_HOSTS_LINE' to /etc/hosts"
fi

link_summary

echo "Done."
