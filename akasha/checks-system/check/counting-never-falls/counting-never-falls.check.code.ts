import {
  numberAt,
  type Value,
  valueIn,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { bodyOf } from "../../checking/checking.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"
import { typeNamedIn } from "../introduced-property-is-a-part/introduced-property-is-a-part.check.code.ts"

const NEXT_SEQ = "nextSeq"

export function countAt(value: Value | null): number | null {
  return value === null ? null : numberAt(value, NEXT_SEQ)
}

export function loadedAt(root: string, path: string, bytes: Uint8Array | null): Value | null {
  if (bytes === null) return null
  const text = bodyOf({ root, path, bytes })
  return text === null ? null : valueIn(text)
}

export function stoppedAt(was: number): string {
  return `counted to ${was} and states no \`next-seq\` — a count starting over hands out what it handed out before`
}

export function fellTo(was: number, now: number): string {
  return `counted to ${was} and now counts to ${now} — the numbers between stand on pages already landed and would be handed out again`
}

export function countingNeverFalls(leaving: Leaving): readonly Judged[] {
  const said: Judged[] = []
  for (const path of leaving.changed) {
    if (typeNamedIn(path) === null) continue
    const bytes = leaving.at(path)
    if (bytes === null) continue
    const was = countAt(loadedAt(leaving.root, path, leaving.was(path)))
    if (was === null) continue
    const now = countAt(loadedAt(leaving.root, path, bytes))
    if (now === null) said.push({ path, reason: stoppedAt(was) })
    else if (now < was) said.push({ path, reason: fellTo(was, now) })
  }
  return said
}
