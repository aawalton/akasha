import { classifyExtension, type FileKind } from "@akasha/code-system/file-kind"
import { type FileKindNodeType, nodeTypeOf } from "@akasha/graph/file-kind-authorship"
import { blankCode, type CommentSyntax } from "../blank-comments/blank-comments.module.code.ts"

export interface Restatement {
  readonly file: string
  readonly line: number
  readonly symbol: string
  readonly fields: readonly string[]
  readonly span: string
}

const RESTATEMENT =
  /`([A-Za-z_$][A-Za-z0-9_$]*)\(\{ ?([A-Za-z_$][A-Za-z0-9_$]*\??(?: ?, ?[A-Za-z_$][A-Za-z0-9_$]*\??)*) ?\}\)`/g

type ProseForm =
  | { readonly kind: "whole-file" }
  | { readonly kind: "comments"; readonly syntax: CommentSyntax }
  | { readonly kind: "unlexed" }

export const PROSE_FORM = {
  md: { kind: "whole-file" },

  ts: { kind: "comments", syntax: "ts" },
  tsx: { kind: "comments", syntax: "ts" },
  js: { kind: "comments", syntax: "ts" },
  jsx: { kind: "comments", syntax: "ts" },
  sh: { kind: "comments", syntax: "shell" },

  css: { kind: "unlexed" },
  lua: { kind: "unlexed" },
  sql: { kind: "unlexed" },
  rust: { kind: "unlexed" },
  swift: { kind: "unlexed" },
  dockerfile: { kind: "unlexed" },
  "systemd-unit": { kind: "unlexed" },
  yaml: { kind: "unlexed" },
  yml: { kind: "unlexed" },
  json: { kind: "unlexed" },
  jsonl: { kind: "unlexed" },
  toml: { kind: "unlexed" },
  txt: { kind: "unlexed" },
  lock: { kind: "unlexed" },
  image: { kind: "unlexed" },
  xml: { kind: "unlexed" },
  html: { kind: "unlexed" },
  python: { kind: "unlexed" },
  csv: { kind: "unlexed" },
  certificate: { kind: "unlexed" },
  env: { kind: "unlexed" },
  conf: { kind: "unlexed" },
  ignore: { kind: "unlexed" },
  "sops-config": { kind: "unlexed" },
  "sops-secret": { kind: "unlexed" },
} as const satisfies Record<FileKind, ProseForm>

function isFileKind(key: string): key is FileKind {
  return key in PROSE_FORM
}

export const PROSE_CARRIER_KINDS: readonly FileKind[] = Object.keys(PROSE_FORM)
  .filter(isFileKind)
  .filter((kind) => PROSE_FORM[kind].kind !== "unlexed")

export const PROSE_CARRIER_NODE_TYPES: readonly FileKindNodeType[] =
  PROSE_CARRIER_KINDS.map(nodeTypeOf)

export const UNLEXED_KINDS: readonly FileKind[] = Object.keys(PROSE_FORM)
  .filter(isFileKind)
  .filter((kind) => PROSE_FORM[kind].kind === "unlexed")

export function carriesProse(file: string): boolean {
  const kind = classifyExtension(file)
  return kind !== null && PROSE_FORM[kind].kind !== "unlexed"
}

export function proseIn(file: string, text: string): string | null {
  const kind = classifyExtension(file)
  if (kind === null) return null
  const form: ProseForm = PROSE_FORM[kind]
  if (form.kind === "unlexed") return null
  return form.kind === "whole-file" ? text : blankCode(text, form.syntax)
}

export function findRestatements(file: string, text: string): readonly Restatement[] {
  const prose = proseIn(file, text)
  if (prose === null) return []
  const out: Restatement[] = []
  for (const match of prose.matchAll(RESTATEMENT)) {
    const [span, symbol, body] = match
    if (symbol === undefined || body === undefined) continue
    out.push({
      file,
      line: countLines(prose, match.index),
      symbol,
      fields: body.split(",").map((field) => field.trim().replace(/\?$/, "")),
      span,
    })
  }
  return out
}

function countLines(text: string, index: number): number {
  let line = 1
  for (let i = 0; i < index; i++) if (text[i] === "\n") line++
  return line
}

export function restatementKey(restatement: Restatement): string {
  return `${restatement.file}#${restatement.symbol}`
}

export function restatementCarrier(key: string): string {
  const at = key.lastIndexOf("#")
  return at < 0 ? key : key.slice(0, at)
}

export interface RatchetVerdict {
  readonly failures: readonly Restatement[]
  readonly grandfathered: readonly string[]
  readonly departed: readonly string[]
  readonly repaired: readonly string[]
}

export function applyRatchet(
  found: readonly Restatement[],
  accepted: readonly string[],
  carriers: ReadonlySet<string>
): RatchetVerdict {
  const known = new Set(accepted)
  const present = new Set(found.map(restatementKey))
  const gone = accepted.filter((key) => !present.has(key))
  return {
    failures: found.filter((restatement) => !known.has(restatementKey(restatement))),
    grandfathered: accepted.filter((key) => present.has(key)).sort(),
    departed: gone.filter((key) => !carriers.has(restatementCarrier(key))).sort(),
    repaired: gone.filter((key) => carriers.has(restatementCarrier(key))).sort(),
  }
}

export type RatchetWrite =
  | { readonly kind: "written"; readonly accepted: readonly string[] }
  | { readonly kind: "refused"; readonly wouldAdd: readonly string[] }

export function nextRatchet(
  foundKeys: readonly string[],
  accepted: readonly string[],
  drop: readonly string[]
): RatchetWrite {
  const known = new Set(accepted)
  const wouldAdd = [...new Set(foundKeys.filter((key) => !known.has(key)))].sort()
  if (wouldAdd.length > 0) return { kind: "refused", wouldAdd }
  const dropping = new Set(drop)
  return { kind: "written", accepted: accepted.filter((key) => !dropping.has(key)).sort() }
}
