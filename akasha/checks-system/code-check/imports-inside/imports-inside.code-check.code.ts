import {
  landingOf,
  specifiersIn,
} from "../../../code-system/code-specifier/code-specifier.module.code.ts"
import { judgingEachFile, overEachText } from "../../change-walking/change-walking.module.code.ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

export function reachedBy(at: string, specifier: string): string | null {
  if (specifier.startsWith("/")) return specifier
  return landingOf(at, specifier)
}

function inside(landed: string): boolean {
  return landed === AKASHA || landed.startsWith(INSIDE)
}

function found(path: string, text: string): readonly string[] {
  if (!path.startsWith(INSIDE)) return []
  const said: string[] = []
  for (const one of specifiersIn(path, text)) {
    const landed = reachedBy(path, one)
    if (landed === null || inside(landed)) continue
    said.push(
      `\`${one}\` reaches \`${landed}\` — an akasha file imports no file outside the akasha folder`
    )
  }
  return said
}

export const reasonsIn = overEachText(found)

export const importsInside = judgingEachFile(reasonsIn)
