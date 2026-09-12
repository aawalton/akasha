import type { SshTarget } from "akasha/alan/harness/mobile-cli/modules/mobile-ssh/mobile-ssh.module.code.ts"

export const MACBOOK: SshTarget = {
  user: "walton",
  host: "100.64.0.2",
  keyPath: "~/.ssh/id_ed25519",
}
