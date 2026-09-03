# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples
#
# PARITY: keep feature-aligned with the `zshrc` provisioned-file page (the macOS
# MacBook's zsh config). This file is Linux/bash-specific (linuxbrew prefix,
# /home paths, `shopt`, bash completions); .zshrc carries the macOS-correct
# equivalents. When you add a shared feature (a PATH entry, a secret load, a
# tool init) here, add the platform-correct version to .zshrc too.

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# Load secrets (DATABASE_URL, API keys) for interactive shells
# BASH_ENV handles non-interactive shells (e.g. Claude Code's Bash tool)
[ -f ~/.secrets.env ] && source ~/.secrets.env

# shellcheck source=/dev/null
_rc="$(readlink -f -- "${BASH_SOURCE[0]}")"
_rc_dir="$(dirname -- "$_rc")"
for _rc_roots in \
  "$_rc_dir/../../../../../tools/lib/repo-roots.sh" \
  "${AKASHA_ROOT:-$HOME/repos/akasha}/tools/lib/repo-roots.sh"
do
  if [ -n "$_rc" ] && [ -f "$_rc_roots" ]; then . "$_rc_roots"; break; fi
done
unset _rc _rc_dir _rc_roots

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

PS1='\w\$ '
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# colored GCC warnings and errors
#export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi
export PATH="$HOME/.local/bin:$PATH"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# personal cli. The set of shell functions is composed by `akasha shell-init-bash`, which
# stands at `akasha/seat-system/commands/shell-init-bash/`. It composed nothing here for a while:
# the generator it replaced kept being evalled after its own imports had stopped resolving, and a
# generator that exits nonzero inside `$(...)` leaves the shell with no functions and says nothing.
# `_akasha_reload` probes this same spelling on every launch, so the two agree by construction.
eval "$("${AKASHA_ROOT:-$HOME/repos/akasha}/dotfiles/bin/akasha" shell-init-bash)"
export DISABLE_COST_WARNINGS=1


# The launchers `rg`, `btw5`, `wallpaper-black`, `find-session` and `ci-cost-snapshot` are
# linked into ~/.local/bin by setup-symlinks.sh, which is already on PATH above, rather
# than reached through a directory of the repo put on PATH.

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

eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"

# Bun completions
eval "$(bun completions)"

# Sourcing returns the exit status of the LAST command run, and `s.` aliases
# `source ~/.bashrc` — so a final command that exits nonzero makes a clean reload
# look like it errored (silent, but $? != 0). Keep an explicit success as the last
# line so sourcing ~/.bashrc is always exit 0.
true
