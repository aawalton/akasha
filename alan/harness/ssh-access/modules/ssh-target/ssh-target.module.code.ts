import { expandTilde } from "akasha/file/disk/modules/expand-tilde/expand-tilde.module.code.ts"

export interface SshTarget {
  readonly user: string
  readonly host: string
  readonly keyPath: string
}

export function sshArgs(target: SshTarget): readonly string[] {
  return [
    "-i",
    expandTilde(target.keyPath),
    "-o",
    "StrictHostKeyChecking=no",
    "-o",
    "UserKnownHostsFile=/dev/null",
    "-o",
    "ConnectTimeout=10",
    `${target.user}@${target.host}`,
  ]
}
