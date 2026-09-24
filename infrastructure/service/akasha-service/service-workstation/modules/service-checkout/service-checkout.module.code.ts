import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"

export function checkoutAt(): string {
  return rootStated(process.env) ?? process.cwd()
}
