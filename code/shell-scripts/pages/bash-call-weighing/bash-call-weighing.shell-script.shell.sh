# shellcheck shell=bash
#
# READ INTO THE SHELL A BASH CALL RUNS IN, NEVER RUN ON ITS OWN. A hook puts the line that reads
# this file in front of the command an agent wrote. The shell joins a control group of its own,
# and an exit trap reads what that group spent and appends one line beside the seat's page. There
# is no shebang and no `set -e`: both belong to a script that owns its process, and this one does
# not. Every step is allowed to fail, because a call is worth more than the weighing of it.

__akasha_at=$1
__akasha_head=$2
__akasha_began=${EPOCHREALTIME/./}
__akasha_group=""
__akasha_home=""

__akasha_own_micros() {
  local stat fields
  read -r stat < /proc/self/stat || return 0
  read -ra fields <<< "${stat#*) }"
  printf '%s' $(( (fields[11] + fields[12] + fields[13] + fields[14]) * 10000 ))
}

__akasha_open() {
  local own parent control at
  read -r own < /proc/self/cgroup || return 0
  own=${own#*::}
  parent=${own%/*}
  [ -n "$parent" ] || return 0
  read -r control < "/sys/fs/cgroup${parent}/cgroup.subtree_control" || return 0
  case " $control " in *" cpu "*) ;; *) return 0 ;; esac
  case " $control " in *" memory "*) ;; *) return 0 ;; esac
  at="/sys/fs/cgroup${parent}/akasha-call-$$"
  mkdir "$at" 2>/dev/null || return 0
  if printf '%s\n' "$$" > "$at/cgroup.procs" 2>/dev/null; then
    __akasha_home=$own
    __akasha_group=$at
  else
    rmdir "$at" 2>/dev/null
  fi
}

__akasha_shut() {
  local code=$? micros=0 peak=0 measured=false key value ended
  [ "$BASHPID" = "$$" ] || return 0
  ended=${EPOCHREALTIME/./}
  if [ -n "$__akasha_group" ]; then
    printf '%s\n' "$$" > "/sys/fs/cgroup${__akasha_home}/cgroup.procs" 2>/dev/null
    while read -r key value; do
      [ "$key" = usage_usec ] && micros=$value
    done < "$__akasha_group/cpu.stat"
    read -r peak < "$__akasha_group/memory.peak" || peak=0
    rmdir "$__akasha_group" 2>/dev/null
    measured=true
  else
    micros=$(__akasha_own_micros)
  fi
  printf '%s"wallMs":%s,"cpuSeconds":0,"childCpuSeconds":%s.%06d,"peakBytes":%s,"residentBeforeBytes":0,"peakAddedBytes":%s,"peakMeasured":%s,"readCalls":0,"writeCalls":0,"readBytes":0,"pathsChanged":0,"refusals":0}\n' \
    "$__akasha_head" "$(( (ended - __akasha_began) / 1000 ))" \
    "$(( micros / 1000000 ))" "$(( micros % 1000000 ))" \
    "$peak" "$peak" "$measured" >> "$__akasha_at"
  return "$code"
}

__akasha_open
trap __akasha_shut EXIT
