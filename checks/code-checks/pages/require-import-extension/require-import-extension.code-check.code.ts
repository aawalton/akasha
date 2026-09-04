import { landingOf, specifiersIn } from "@akasha/code-system/code-specifier"
import {
  judgingEach,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"

const ENDINGS: readonly string[] = [".ts", ".tsx", ".css"]

const CARRIED = ENDINGS.map((one) => `\`${one}\``).join(" or ")

function found(path: string, text: string): readonly string[] {
  const said: string[] = []
  for (const one of specifiersIn(path, text)) {
    if (landingOf(path, one) === null) continue
    if (ENDINGS.some((ending) => one.endsWith(ending))) continue
    said.push(`\`${one}\` is written without the ${CARRIED} extension of the file it names`)
  }
  return said
}

export const reasonsIn = overEachText(found)

export const requireImportExtension = judgingEach(TEXTS, (given) => found(given.path, given.text))
