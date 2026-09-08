import { classifyExtension, type FileKind } from "@akasha/code/file-kind"
import { type FileKindNodeType, nodeTypeOf } from "@akasha/graph/file-kind-authorship"
import { blankCode, type CommentSyntax } from "../blank-comments/blank-comments.module.code.ts"
import { lineAtOffset } from "../line-counting/line-counting.module.code.ts"

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
      line: lineAtOffset(prose, match.index),
      symbol,
      fields: body.split(",").map((field) => field.trim().replace(/\?$/, "")),
      span,
    })
  }
  return out
}
