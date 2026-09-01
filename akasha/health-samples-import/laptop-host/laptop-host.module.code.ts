import type { SshTarget } from "@akasha/ssh-access/ssh-target"

export const MACBOOK: SshTarget = {
  user: "walton",
  host: "100.64.0.2",
  keyPath: "~/.ssh/id_ed25519",
}
