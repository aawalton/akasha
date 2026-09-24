import type { SshTarget } from "akasha/alan/harness/ssh-access/modules/ssh-target/ssh-target.module.code.ts"
import { macbook } from "akasha/infrastructure/machine/host/pages/macbook.host.ts"

export const MACBOOK: SshTarget = {
  user: macbook.loginUser,
  host: macbook.address,
  keyPath: macbook.keyPath,
}
