export interface LibcSonameFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly spec: string
}

const LIBC_BASENAME =
  /^(libc\.|libc-|libm\.so|libdl\.so|libpthread\.so|librt\.so|libutil\.so|ld-musl-|ld-linux)/

const IDENT_CHAR = /[A-Za-z0-9_$]/
const QUOTES = new Set(['"', "'", "`"])
const CALLEE = "dlopen"

function isSpace(c: string | undefined): boolean {
  return c === " " || c === "\t" || c === "\n" || c === "\r"
}

function isLibcSpec(spec: string): boolean {
  return LIBC_BASENAME.test(spec.slice(spec.lastIndexOf("/") + 1))
}

function lineStartsOf(source: string): readonly number[] {
  const starts: number[] = [0]
  for (let i = 0; i < source.length; i++) {
    if (source[i] === "\n") starts.push(i + 1)
  }
  return starts
}

function lineIndexOf(starts: readonly number[], offset: number): number {
  let lo = 0
  let hi = starts.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if ((starts[mid] ?? 0) <= offset) lo = mid
    else hi = mid - 1
  }
  return lo
}

function literalArgAt(source: string, calleeStart: number): string | null {
  let i = calleeStart + CALLEE.length
  while (isSpace(source[i])) i++
  if (source[i] !== "(") return null
  i++
  while (isSpace(source[i])) i++
  const quote = source[i]
  if (quote === undefined || !QUOTES.has(quote)) return null
  const end = source.indexOf(quote, i + 1)
  if (end < 0) return null
  return source.slice(i + 1, end)
}

export function scanLibcSonameBindings(args: {
  readonly file: string
  readonly source: string
}): readonly LibcSonameFinding[] {
  const { file, source } = args
  const out: LibcSonameFinding[] = []
  const starts = lineStartsOf(source)

  let from = 0
  while (true) {
    const at = source.indexOf(CALLEE, from)
    if (at < 0) break
    from = at + CALLEE.length

    const prev = source[at - 1]
    if (prev !== undefined && IDENT_CHAR.test(prev)) continue

    const spec = literalArgAt(source, at)
    if (spec === null || !isLibcSpec(spec)) continue

    const line = lineIndexOf(starts, at)
    out.push({ file, line: line + 1, column: at - (starts[line] ?? 0) + 1, spec })
  }
  return out
}
