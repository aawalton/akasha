import { join } from "node:path"
import { specifiersIn } from "../../../code-system/code-specifier.module.code.ts"
import type { Body } from "../../checking.module.code.ts"
import { bodyOf, overEachFile } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const TS = ".ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const RELATIVE = /^\.\.?\//

export function landingOf(at: string, specifier: string): string | null {
  if (specifier.startsWith("/")) return specifier
  if (!RELATIVE.test(specifier)) return null
  return join(at.slice(0, at.lastIndexOf("/")), specifier)
}

function inside(landed: string): boolean {
  return landed === AKASHA || landed.startsWith(INSIDE)
}

export function reasonsIn(given: Body): readonly string[] {
  if (!given.path.endsWith(TS)) return []
  if (!given.path.startsWith(INSIDE)) return []
  const text = bodyOf(given)
  if (text === null) return []
  const said: string[] = []
  for (const one of specifiersIn(given.path, text)) {
    const landed = landingOf(given.path, one)
    if (landed === null || inside(landed)) continue
    said.push(
      `\`${one}\` reaches \`${landed}\` — an akasha file imports no file outside the akasha folder`
    )
  }
  return said
}

export function importsInside(leaving: Leaving): readonly Judged[] {
  return overEachFile(leaving, reasonsIn)
}
