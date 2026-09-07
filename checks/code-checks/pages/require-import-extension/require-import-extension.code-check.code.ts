import { landingOf, specifiersIn } from "@akasha/code/code-specifier"
import {
  type Body,
  input,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const ENDINGS: readonly string[] = [".ts", ".tsx", ".css"]

const CARRIED = ENDINGS.map((one) => `\`${one}\``).join(" or ")

export type Stands = (path: string) => boolean

function withoutItsEnding(landed: string): string {
  const cut = landed.lastIndexOf(".")
  return cut > landed.lastIndexOf("/") ? landed.slice(0, cut) : landed
}

function namesAFileThatStands(landed: string, stands: Stands): boolean {
  return [landed, withoutItsEnding(landed)].some((one) =>
    ENDINGS.some((ending) => stands(`${one}${ending}`))
  )
}

function found(path: string, text: string, stands: Stands): readonly string[] {
  const said: string[] = []
  for (const one of specifiersIn(path, text)) {
    const landed = landingOf(path, one)
    if (landed === null) continue
    if (ENDINGS.some((ending) => one.endsWith(ending))) continue
    if (!namesAFileThatStands(landed, stands)) continue
    said.push(`\`${one}\` is written without the ${CARRIED} extension of the file it names`)
  }
  return said
}

export function reasonsIn(stands: Stands): (given: Body) => readonly string[] {
  return overEachText((path, text) => found(path, text, stands))
}

export const requireImportExtension = input(TEXTS, (change, shadow) => {
  const stands: Stands = (at) => change.after(at) !== null
  const said: Judged[] = []
  for (const given of TEXTS.from(change, shadow)) {
    for (const reason of found(given.path, given.text, stands)) {
      said.push({ path: given.path, reason })
    }
  }
  return said
})
