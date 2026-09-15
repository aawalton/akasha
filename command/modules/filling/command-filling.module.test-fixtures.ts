import {
  type Filing,
  filledIn,
  type Prose,
} from "akasha/command/modules/filling/command-filling.module.code.ts"
import { inputIn, type Piping } from "akasha/command/modules/piping/piping.module.code.ts"

export function proseIn(
  root: string,
  named: Readonly<Record<string, string>>,
  one: Filing,
  piping: Piping = inputIn
): Prose {
  return filledIn(root, named[one.said], named[one.file], one, piping)
}
