export const MOBILE_SCRATCH_AT = "/var/tmp"

export const SSH_KEEPALIVE_INTERVAL_SECONDS = 15
export const SSH_KEEPALIVE_COUNT_MAX = 4

export function sshConnectionOptions(): readonly string[] {
  return [
    "-o",
    "StrictHostKeyChecking=no",
    "-o",
    "UserKnownHostsFile=/dev/null",
    "-o",
    "ConnectTimeout=10",
    "-o",
    `ServerAliveInterval=${SSH_KEEPALIVE_INTERVAL_SECONDS}`,
    "-o",
    `ServerAliveCountMax=${SSH_KEEPALIVE_COUNT_MAX}`,
  ]
}

export function remoteScriptPath(unique: string): string {
  return `${MOBILE_SCRATCH_AT}/mobile-cut-${unique}.sh`
}

const SESSION_LOOK_SECONDS = 2

const TERM_GRACE_SECONDS = 10

const SESSION_LOST_EXIT = 129

const OWN_GROUP = [
  "set -m",
  'bash "$1" & job=$!',
  "set +m",
  "s=$PPID",
  'while [ "$s" -gt 1 ] && ! ps -o comm= -p "$s" | grep -q sshd; do s=$(ps -o ppid= -p "$s" | tr -d " "); done',
  "s=${s:-1}",
  `while kill -0 "$job" 2>/dev/null; do if [ "$s" -gt 1 ] && ! kill -0 "$s" 2>/dev/null; then kill -TERM -- -"$job"; sleep ${TERM_GRACE_SECONDS}; kill -KILL -- -"$job" 2>/dev/null; exit ${SESSION_LOST_EXIT}; fi; sleep ${SESSION_LOOK_SECONDS}; done`,
  'wait "$job"',
].join("; ")

export function remoteRunScriptCommand(remotePath: string): string {
  return `trap 'rm -f ${remotePath}' EXIT HUP INT TERM; bash -c '${OWN_GROUP}' delivered ${remotePath}`
}

export function rsyncSshTransport(expandedKeyPath: string): string {
  return `ssh -i ${expandedKeyPath} ${sshConnectionOptions().join(" ")}`
}
