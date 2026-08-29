import type { Body } from "../../checking.module.code.ts"
import { judgingEachFile } from "../../checking.module.code.ts"

const NUL = 0

const NEWLINE = 0x0a

type Site = {
  readonly line: number
  readonly column: number
}

export function sitesIn(bytes: Uint8Array): readonly Site[] {
  const found: Site[] = []
  let line = 1
  let start = 0
  for (let at = 0; at < bytes.length; at += 1) {
    if (bytes[at] === NEWLINE) {
      line += 1
      start = at + 1
      continue
    }
    if (bytes[at] === NUL) found.push({ line, column: at - start + 1 })
  }
  return found
}

function reasonFor(found: readonly Site[]): readonly string[] {
  const one = found[0]
  if (one === undefined) return []
  const where = `line ${one.line} column ${one.column}`
  if (found.length === 1) {
    return [`${where} is a raw NUL byte, which hides the whole file from a search`]
  }
  return [
    `${where} is the first of ${found.length} raw NUL bytes, which hide the whole file from a search`,
  ]
}

export function reasonsIn(given: Body): readonly string[] {
  return reasonFor(sitesIn(given.bytes))
}

export const noRawNulBytes = judgingEachFile(reasonsIn)
