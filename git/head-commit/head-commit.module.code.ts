import { said as gitSaid } from "akasha/git/running/git-running.module.code.ts"

export function headOf(root: string): string {
  return gitSaid(root, ["rev-parse", "HEAD"]).trim()
}
