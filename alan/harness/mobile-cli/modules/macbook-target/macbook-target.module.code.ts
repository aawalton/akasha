import type { SshTarget } from "akasha/alan/harness/mobile-cli/modules/mobile-ssh/mobile-ssh.module.code.ts"
import { macbook } from "akasha/infrastructure/machine/host/pages/macbook.host.ts"

export const MACBOOK: SshTarget = {
  user: macbook.loginUser,
  host: macbook.address,
  keyPath: macbook.keyPath,
}
