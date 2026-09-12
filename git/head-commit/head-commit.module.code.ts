import { said as gitSaid } from "akasha/git/modules/running/git-running.module.code.ts"

export function headOf(root: string): string {
  return gitSaid(root, ["rev-parse", "HEAD"]).trim()
}
