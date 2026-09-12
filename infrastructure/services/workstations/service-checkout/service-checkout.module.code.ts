import { rootStated } from "akasha/commands/modules/rooting/rooting.module.code.ts"

export function checkoutAt(): string {
  return rootStated(process.env) ?? process.cwd()
}
