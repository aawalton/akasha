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

export function remoteRunScriptCommand(remotePath: string): string {
  return `trap 'rm -f ${remotePath}' EXIT HUP INT TERM; bash ${remotePath}`
}

export function rsyncSshTransport(expandedKeyPath: string): string {
  return `ssh -i ${expandedKeyPath} ${sshConnectionOptions().join(" ")}`
}
