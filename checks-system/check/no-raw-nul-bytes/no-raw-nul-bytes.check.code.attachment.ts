import { carriesBytes } from "../../../page/file-kind/carries-bytes.ts"
import type { Check } from "../check-shape.ts"

const NUL = 0

const NEWLINE = 0x0a

type Site = {
  readonly line: number
  readonly column: number
}

function sitesIn(body: Uint8Array): readonly Site[] {
  const found: Site[] = []
  let line = 1
  let start = 0
  for (let i = 0; i < body.length; i += 1) {
    if (body[i] === NEWLINE) {
      line += 1
      start = i + 1
      continue
    }
    if (body[i] === NUL) found.push({ line, column: i - start + 1 })
  }
  return found
}

function reasonFor(found: readonly Site[]): readonly string[] {
  const first = found[0]
  if (first === undefined) return []
  const where = `line ${first.line} column ${first.column}`
  if (found.length === 1) {
    return [`${where} is a raw NUL byte, which hides the whole file from a search`]
  }
  return [`${where} is the first of ${found.length} raw NUL bytes, which hide the whole file from a search`]
}

export const noRawNulBytes = {
  slug: "no-raw-nul-bytes",
  needs: "file",
  cached: false,
  run: ({ path, body }) => (carriesBytes(path) ? [] : reasonFor(sitesIn(body))),
} satisfies Check

export default noRawNulBytes
