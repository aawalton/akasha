import type { SshTarget } from "akasha/alan/harness/ssh-access/ssh-target/ssh-target.module.code.ts"

export const MACBOOK: SshTarget = {
  user: "walton",
  host: "100.64.0.2",
  keyPath: "~/.ssh/id_ed25519",
}
