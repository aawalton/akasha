import {
  type Body,
  overEachFile,
  overEachText,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { landingOf, specifiersIn } from "akasha/code/code-specifier/code-specifier.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const ENDINGS: readonly string[] = [".ts", ".tsx", ".css"]

const CARRIED = namesDrawn(ENDINGS, " or ")

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

export function refusalsOver(change: Change): readonly Judged[] {
  const stands: Stands = (at) => change.after(at) !== null
  return overEachFile(change, reasonsIn(stands))
}
