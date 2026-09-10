import { textIn } from "@akasha/code/body-text"
import { formattedBody } from "@akasha/code/code-format"
import type { Change } from "@akasha/pages/change"
import type {
  Adding,
  FileChange,
  Moving,
  Replacing,
} from "../../../changes/modules/answer/change-answer.module.types.ts"
import { mappedFor } from "../address-mapping/address-mapping.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"
import type { Bodies } from "../drafting/drafting.module.code.ts"
import { unexportableIn } from "../export-naming/export-naming.module.code.ts"
import type { Refused } from "../landing/landing.module.code.ts"
import { changeOf } from "../landing/landing.module.code.ts"
import { lockingFor } from "../manifest-locking/manifest-locking.module.code.ts"
import type { FileMove } from "../path-moving/path-moving.module.code.ts"
import { globbedFor } from "../source-globbing/source-globbing.module.code.ts"
import { steppedFor } from "../spacing-stepping/spacing-stepping.module.code.ts"
import { typesFor } from "../type-generating/type-generating.module.code.ts"
import { workedFor } from "../worked-typing/worked-typing.module.code.ts"

export type Formatting = {
  readonly edits: readonly Replacing[]
  readonly formatted: readonly string[]
}

function sameAs(one: Uint8Array, other: Uint8Array): boolean {
  if (one.byteLength !== other.byteLength) return false
  return one.every((byte, at) => byte === other[at])
}

const BYTES = new TextEncoder()

const FATAL = new TextDecoder("utf-8", { fatal: true })

const NO_TEXT = "spells no text, so its body is edited by nothing; a move or a removal takes it"

function textFrom(bytes: Uint8Array): string | null {
  try {
    return FATAL.decode(bytes)
  } catch {
    return null
  }
}

function bodyIn(one: Adding | Replacing): string {
  return one.kind === "add" ? one.content : one.contentTo
}

export type Stated = { readonly rows: readonly FileChange[] } | { readonly why: string }

export function rowsOf(held: Bodies): Stated {
  const rows: FileChange[] = []
  for (const [path, one] of held) {
    if (one.body === null) {
      rows.push({ kind: "remove", path })
      continue
    }
    const content = textFrom(one.body)
    if (content === null) return { why: `${path} ${NO_TEXT}` }
    rows.push({ kind: "add", path, content })
  }
  return { rows }
}

export function rowsFrom(root: string, base: string, changes: readonly FileChange[]): Stated {
  const rows: FileChange[] = []
  for (const one of changes) {
    if (one.kind === "move" || one.kind === "remove") {
      rows.push(one)
      continue
    }
    const body = bodyIn(one)
    const held = bodyAt(root, base, one.path)
    if (held === null) {
      rows.push({ kind: "add", path: one.path, content: body })
      continue
    }
    const was = textFrom(held)
    if (was === null) return { why: `${one.path} ${NO_TEXT}` }
    if (was === body) continue
    rows.push({ kind: "replace", path: one.path, contentFrom: was, contentTo: body })
  }
  return { rows }
}

export function formattingIn(
  root: string,
  changes: readonly FileChange[],
  already: ReadonlyMap<string, Uint8Array> = new Map()
): Formatting {
  const edits: Replacing[] = []
  const formatted: string[] = []
  for (const one of changes) {
    if (one.kind === "move" || one.kind === "remove") continue
    const body = BYTES.encode(bodyIn(one))
    const was = already.get(one.path)
    if (was !== undefined && sameAs(was, body)) continue
    const said = formattedBody(root, one.path, body)
    if (!said.changed) continue
    edits.push({
      kind: "replace",
      path: one.path,
      contentFrom: textIn(body),
      contentTo: textIn(said.body),
    })
    formatted.push(one.path)
  }
  return { edits, formatted }
}

function pathIn(one: FileChange): string {
  return one.kind === "move" ? one.pathTo : one.path
}

function foldedOver(...runs: readonly (readonly FileChange[])[]): readonly FileChange[] {
  const held = new Map<string, FileChange>()
  for (const run of runs) for (const one of run) held.set(pathIn(one), one)
  return [...held.values()]
}

export function sequenced(
  changes: readonly FileChange[],
  rows: readonly (Adding | Replacing)[]
): readonly FileChange[] {
  return rows.length === 0 ? changes : foldedOver(changes, rows)
}

export type Prepared = {
  readonly formatting: Formatting
  readonly authored: readonly FileChange[]
  readonly changes: readonly FileChange[]
  readonly said: readonly string[]
  readonly over: Change | null
}

export function preparing(
  root: string,
  base: string,
  changes: readonly FileChange[],
  moves: readonly FileMove[] = [],
  already: ReadonlyMap<string, Uint8Array> = new Map()
): Prepared | Refused {
  const formatting = formattingIn(root, changes, already)
  const folded = foldedOver(changes, formatting.edits)
  const stated = rowsFrom(root, base, folded)
  if ("why" in stated) return { refusals: [stated.why] }
  const moved: readonly Moving[] = moves.map((one) => ({
    kind: "move",
    pathFrom: one.from,
    pathTo: one.to,
  }))
  const rows = [...moved, ...stated.rows]
  const unexportable = unexportableIn(rows)
  if (unexportable.length > 0) return { refusals: unexportable }
  const locking = lockingFor(root, base, rows)
  const change = changeOf(root, base, rows)
  const worked = workedFor(change)
  const mapped = mappedFor(change)
  const stepped = steppedFor(change)
  const globbed = globbedFor(change)
  const typed = typesFor(change)
  const added = [
    ...locking.edits,
    ...worked.edits,
    ...mapped.edits,
    ...stepped.edits,
    ...globbed.edits,
    ...typed.edits,
  ]
  return {
    formatting,
    authored: rows,
    changes: [...rows, ...added],
    said: [
      ...locking.said,
      ...worked.said,
      ...mapped.said,
      ...stepped.said,
      ...globbed.said,
      ...typed.said,
    ],
    over: added.length === 0 ? change : null,
  }
}
