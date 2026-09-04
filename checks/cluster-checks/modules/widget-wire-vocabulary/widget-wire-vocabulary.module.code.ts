import { z } from "zod"

export type CanonicalKind = "array" | "members" | "body"

export interface CanonicalRef {
  readonly file: string
  readonly anchor: string
  readonly kind: CanonicalKind
}

export type VocabularyRead =
  | { readonly ok: true; readonly names: readonly string[] }
  | { readonly ok: false; readonly reason: string }

const MAX_CHAIN = 8

const QUOTED_NAME_RE = /"([a-zA-Z]\w*)"/g
const MEMBER_RE = /^\s*(?:readonly\s+)?([A-Za-z_]\w*)\??\s*:/gm
const EXTENDS_RE = /\bextends\s+([A-Za-z_]\w*)/

const EXTENDS_MATCH_SCHEMA = z.tuple([z.string(), z.string()])

function blockAfter(source: string, anchor: string, close: string): string | undefined {
  const at = source.indexOf(anchor)
  if (at === -1) return undefined
  const open = at + anchor.length
  const end = source.indexOf(close, open)
  if (end === -1) return undefined
  return source.slice(open, end)
}

function withoutComments(block: string): string {
  return block.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "")
}

function namesIn(block: string, pattern: RegExp): readonly string[] {
  const names: string[] = []
  for (const match of block.matchAll(pattern)) {
    const name = match[1]
    if (name === undefined) continue
    names.push(name)
  }
  return names
}

function literalKeys(block: string): readonly string[] | undefined {
  if (block.includes("...")) return undefined
  const keys: string[] = []
  for (const entry of withoutComments(block).split(",")) {
    const head = (entry.split(":")[0] ?? "").trim()
    if (head === "") continue
    if (!/^[A-Za-z_]\w*$/.test(head)) return undefined
    keys.push(head)
  }
  return keys
}

function findDeclaration(
  name: string,
  siblings: ReadonlyMap<string, string>
): CanonicalRef | undefined {
  for (const [file, source] of siblings) {
    for (const opening of [`export interface ${name} `, `export type ${name} = `]) {
      const at = source.indexOf(opening)
      if (at === -1) continue
      const lineEnd = source.indexOf("\n", at)
      const anchor = source.slice(at, lineEnd === -1 ? undefined : lineEnd)
      if (!anchor.trimEnd().endsWith("{")) continue
      return { file, anchor: anchor.trimEnd(), kind: "members" }
    }
  }
  return undefined
}

function ownMembers(source: string, anchor: string): readonly string[] | undefined {
  const block = blockAfter(source, anchor, "\n}")
  if (block === undefined) return undefined
  return namesIn(withoutComments(block), MEMBER_RE)
}

function readMembers(
  ref: CanonicalRef,
  read: (file: string) => string,
  siblings: (file: string) => ReadonlyMap<string, string>
): VocabularyRead {
  const names: string[] = []
  let step: CanonicalRef | undefined = ref
  const seen = new Set<string>()

  for (let depth = 0; step !== undefined; depth += 1) {
    if (depth >= MAX_CHAIN) {
      return { ok: false, reason: `the \`extends\` chain from \`${ref.anchor}\` did not end` }
    }
    const source = read(step.file)
    const own = ownMembers(source, step.anchor)
    if (own === undefined) {
      return {
        ok: false,
        reason: `\`${step.anchor}\` was not found in ${step.file}, or its body did not close — either it moved or the file could not be read. Nothing was compared, which is not the same as nothing disagreeing`,
      }
    }
    names.push(...own)

    const extended = EXTENDS_MATCH_SCHEMA.safeParse(EXTENDS_RE.exec(step.anchor))
    if (!extended.success) break
    const parent = extended.data[1]
    if (seen.has(parent)) {
      return {
        ok: false,
        reason: `the \`extends\` chain from \`${ref.anchor}\` revisits \`${parent}\``,
      }
    }
    seen.add(parent)
    const next: CanonicalRef | undefined = findDeclaration(parent, siblings(step.file))
    if (next === undefined) {
      return {
        ok: false,
        reason: `\`${step.anchor}\` extends \`${parent}\`, which is declared nowhere beside ${step.file} — so part of the wire vocabulary was never read`,
      }
    }
    step = next
  }

  return { ok: true, names }
}

export function readWireVocabulary(args: {
  readonly ref: CanonicalRef
  readonly read: (file: string) => string
  readonly siblings: (file: string) => ReadonlyMap<string, string>
}): VocabularyRead {
  const { ref, read, siblings } = args
  if (ref.kind === "members") return readMembers(ref, read, siblings)

  const source = read(ref.file)
  const block = blockAfter(source, ref.anchor, ref.kind === "array" ? "]" : "}")
  if (block === undefined) {
    return {
      ok: false,
      reason: `\`${ref.anchor}\` was not found in ${ref.file}, or its body did not close — either it moved or the file could not be read. Nothing was compared, which is not the same as nothing disagreeing`,
    }
  }
  if (ref.kind === "array") return { ok: true, names: namesIn(block, QUOTED_NAME_RE) }

  const keys = literalKeys(block.replace(/^\s*\{/, ""))
  if (keys === undefined) {
    return {
      ok: false,
      reason: `the body literal at \`${ref.anchor}\` in ${ref.file} does not spell its own keys — a spread or an expression decides them elsewhere, so this is not the declaration to hold a payload against`,
    }
  }
  return { ok: true, names: keys }
}
