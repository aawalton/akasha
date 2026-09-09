import type { Adding, Replacing } from "@akasha/changes/change-answer/types"
import { textIn } from "@akasha/code/body-text"
import { formattedBody } from "@akasha/code/code-format"
import type { Change } from "@akasha/pages/change"
import { globbedFor } from "../../commands/modules/source-globbing/source-globbing.module.code.ts"
import { steppedFor } from "../../commands/modules/spacing-stepping/spacing-stepping.module.code.ts"
import { mappedFor } from "../address-mapping/address-mapping.module.code.ts"
import { unexportableIn } from "../export-naming/export-naming.module.code.ts"
import type { FileEdit, Refused } from "../landing/landing.module.code.ts"
import { changeOf } from "../landing/landing.module.code.ts"
import { lockingFor } from "../manifest-locking/manifest-locking.module.code.ts"
import type { FileMove } from "../path-moving/path-moving.module.code.ts"
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

export function formattingIn(
  root: string,
  changes: readonly FileEdit[],
  already: ReadonlyMap<string, Uint8Array> = new Map()
): Formatting {
  const edits: Replacing[] = []
  const formatted: string[] = []
  for (const one of changes) {
    if (one.body === null) continue
    const was = already.get(one.path)
    if (was !== undefined && sameAs(was, one.body)) continue
    const said = formattedBody(root, one.path, one.body)
    if (!said.changed) continue
    edits.push({
      kind: "replace",
      path: one.path,
      contentFrom: textIn(one.body),
      contentTo: textIn(said.body),
    })
    formatted.push(one.path)
  }
  return { edits, formatted }
}

const BYTES = new TextEncoder()

function bodiedFrom(rows: readonly (Adding | Replacing)[]): readonly FileEdit[] {
  return rows.map((one) => ({
    path: one.path,
    body: BYTES.encode(one.kind === "add" ? one.content : one.contentTo),
  }))
}

function foldedOver(...runs: readonly (readonly FileEdit[])[]): readonly FileEdit[] {
  const held = new Map<string, FileEdit>()
  for (const run of runs) for (const one of run) held.set(one.path, one)
  return [...held.values()]
}

export function sequenced(
  edits: readonly FileEdit[],
  rows: readonly (Adding | Replacing)[]
): readonly FileEdit[] {
  return rows.length === 0 ? edits : foldedOver(edits, bodiedFrom(rows))
}

export type Prepared = {
  readonly formatting: Formatting
  readonly authored: readonly FileEdit[]
  readonly changes: readonly FileEdit[]
  readonly said: readonly string[]
  readonly over: Change | null
}

export function preparing(
  root: string,
  base: string,
  changes: readonly FileEdit[],
  moves: readonly FileMove[] = [],
  already: ReadonlyMap<string, Uint8Array> = new Map()
): Prepared | Refused {
  const formatting = formattingIn(root, changes, already)
  const authored = foldedOver(changes, bodiedFrom(formatting.edits))
  const unexportable = unexportableIn(authored)
  if (unexportable.length > 0) return { refusals: unexportable }
  const locking = lockingFor(root, base, authored, moves)
  const change = changeOf(root, { base, edits: authored, moves })
  const worked = workedFor(change)
  const mapped = mappedFor(change)
  const stepped = steppedFor(change)
  const globbed = globbedFor(change)
  const typed = typesFor(change)
  const added = [
    ...bodiedFrom(locking.edits),
    ...bodiedFrom(worked.edits),
    ...bodiedFrom(mapped.edits),
    ...bodiedFrom(stepped.edits),
    ...bodiedFrom(globbed.edits),
    ...bodiedFrom(typed.edits),
  ]
  return {
    formatting,
    authored,
    changes: added.length === 0 ? authored : [...authored, ...added],
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
