# ~/.zshrc — interactive zsh config for macOS machines (the MacBook).
#
# PARITY: keep feature-aligned with the `bashrc` provisioned-file page (the
# Bazzite workstation's bash config). Same features, macOS-correct paths.
# .bashrc is Linux/bash-specific (linuxbrew prefix, /home paths, `shopt`, bash
# completions) and is deliberately NOT sourced here — sourcing it under zsh on
# macOS would error and set dead paths. When you add a shared feature (a PATH
# entry, a secret load, a tool init) to one file, add the platform-correct
# equivalent to the other.
#
# Linked to ~/.zshrc by setup-symlinks.sh (macOS only); this page states that path.

# If not running interactively, don't do anything.
[[ $- == *i* ]] || return

# Load secrets (DATABASE_URL, API keys) for interactive shells.
# BASH_ENV handles non-interactive shells (e.g. Claude Code's Bash tool).
[ -f ~/.secrets.env ] && source ~/.secrets.env

# Homebrew (Apple Silicon prefix).
[ -x /opt/homebrew/bin/brew ] && eval "$(/opt/homebrew/bin/brew shellenv)"

# ~/.local/bin (libpq client bins, claude), bun, node@22 (keg-only).
export PATH="$HOME/.local/bin:$PATH"
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
[ -d /opt/homebrew/opt/node@22/bin ] && export PATH="/opt/homebrew/opt/node@22/bin:$PATH"

_rc="${(%):-%x}"
_rc="${_rc:A}"
[ -n "$_rc" ] && [ -f "${_rc:h}/../../scripts/repo-roots/repo-roots.shell-script.shell.sh" ] && . "${_rc:h}/../../scripts/repo-roots/repo-roots.shell-script.shell.sh"
unset _rc

# The launchers are linked into ~/.local/bin by setup-symlinks.sh, already on PATH above.

# bun completions.
[ -s "$HOME/.bun/_bun" ] && source "$HOME/.bun/_bun"

# Talos cluster node access. Talos nodes run no sshd — reach them via the
# talosctl gRPC API (:50000) over the tailscale-routed LAN, not ssh. node-N IPs
# are the live kubectl InternalIPs (node-01..06).
# USAGE: `node-3` opens that node's live talosctl dashboard; `node-3 <talosctl-cmd>` runs the command on it (e.g. `node-3 logs kubelet`, `node-3 read /etc/os-release`, `node-3 service`).
export TALOSCONFIG="${TALOSCONFIG:-$HOME/.talos/main.config}"
_talos_node() { local ip="$1"; shift; if [ "$#" -eq 0 ]; then talosctl -e "$ip" -n "$ip" dashboard; else talosctl -e "$ip" -n "$ip" "$@"; fi; }
node-1() { _talos_node 192.168.68.87 "$@"; }; node-01() { node-1 "$@"; }
node-2() { _talos_node 192.168.68.88 "$@"; }; node-02() { node-2 "$@"; }
node-3() { _talos_node 192.168.68.75 "$@"; }; node-03() { node-3 "$@"; }
node-4() { _talos_node 192.168.68.90 "$@"; }; node-04() { node-4 "$@"; }
node-5() { _talos_node 192.168.68.78 "$@"; }; node-05() { node-5 "$@"; }
node-6() { _talos_node 192.168.68.93 "$@"; }; node-06() { node-6 "$@"; }

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/opt/homebrew/Caskroom/miniforge/base/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/opt/homebrew/Caskroom/miniforge/base/etc/profile.d/conda.sh" ]; then
        . "/opt/homebrew/Caskroom/miniforge/base/etc/profile.d/conda.sh"
    else
        export PATH="/opt/homebrew/Caskroom/miniforge/base/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<
