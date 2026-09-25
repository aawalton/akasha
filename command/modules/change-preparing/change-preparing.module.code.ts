import { generatedOver } from "akasha/change/generator/modules/change-generating/change-generating.module.code.ts"
import {
  type Adding,
  type FileChange,
  leftAt,
  type Moving,
  type Replacing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textIn } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { formattedBody } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import { DATA } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Refused } from "akasha/command/modules/landing/landing.module.code.ts"
import {
  changeOf,
  type Settled,
} from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import type { FileMove } from "akasha/command/modules/path-moving/path-moving.module.code.ts"
import {
  entriedIn,
  identifiedOver,
} from "akasha/command/modules/value-minting/value-minting.change-generator.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import {
  type Facing,
  facingIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { unexportableIn } from "akasha/page/modules/export-name/modules/export-naming/export-naming.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { type Shadow, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { loadedFrom } from "akasha/page/modules/value/page-value.module.code.ts"

type Formatting = {
  readonly edits: readonly Replacing[]
  readonly formatted: readonly string[]
}

const BYTES = new TextEncoder()

const FATAL = new TextDecoder("utf-8", { fatal: true })

export const NO_TEXT =
  "spells no text, so its body is edited by nothing; a move or a removal takes it"

const ID = "id"

export const PAGE_IDLESS =
  "is a page stating no `id` that nothing minted one for, so the change does not land"

const ENTRY_IDLESS =
  "holds an entry stating no `id` that nothing minted one for, so the change does not land"

function textFrom(bytes: Uint8Array): string | null {
  try {
    return FATAL.decode(bytes)
  } catch {
    return null
  }
}

export function bodyIn(one: Adding | Replacing): string {
  return one.kind === "add" ? one.content : one.contentTo
}

function bodied(one: FileChange): one is Adding | Replacing {
  return one.kind === "add" || one.kind === "replace"
}

export type Stated = { readonly rows: readonly FileChange[] } | { readonly why: string }

export function rowsFrom(root: string, base: string, changes: readonly FileChange[]): Stated {
  const rows: FileChange[] = []
  for (const one of changes) {
    if (!bodied(one)) {
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

function formattingIn(
  root: string,
  changes: readonly FileChange[],
  already: ReadonlySet<string> = new Set()
): Formatting {
  const edits: Replacing[] = []
  const formatted: string[] = []
  for (const one of changes) {
    if (!bodied(one)) continue
    if (already.has(one.path)) continue
    const body = BYTES.encode(bodyIn(one))
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

function foldedOver(...runs: readonly (readonly FileChange[])[]): readonly FileChange[] {
  const held = new Map<string, FileChange>()
  const ended: FileChange[] = []
  for (const run of runs) {
    for (const one of run) {
      if (one.kind === "append") ended.push(one)
      else held.set(leftAt(one), one)
    }
  }
  return [...held.values(), ...ended]
}

function idlessIn(shadow: Shadow, changes: readonly FileChange[]): readonly string[] {
  const pageTypes = shadow.index.pageTypesIn()
  const entried = entriedIn(shadow.index)
  const found: string[] = []
  for (const one of changes) {
    if (!bodied(one)) continue
    const body = bodyIn(one)
    if (pageNamed(one.path, pageTypes)) {
      const value = loadedFrom(body).value
      if (value !== null && value[ID] === undefined) found.push(`\`${one.path}\` ${PAGE_IDLESS}`)
      continue
    }
    if (entried(one.path) && identifiedOver(body) !== null) {
      found.push(`\`${one.path}\` ${ENTRY_IDLESS}`)
    }
  }
  return found
}

export type Prepared = {
  readonly formatting: Formatting
  readonly changes: readonly FileChange[]
  readonly said: readonly string[]
  readonly over: Change | null
  readonly facing: Facing
  readonly settled: Settled | null
}

export function preparing(
  root: string,
  base: string,
  changes: readonly FileChange[],
  moves: readonly FileMove[] = [],
  already: ReadonlySet<string> = new Set()
): Prepared | Refused {
  const formatting = formattingIn(root, changes, already)
  const folded = foldedOver(changes, formatting.edits)
  const stated = rowsFrom(root, base, folded)
  if ("why" in stated) return { refusals: [stated.why], code: DATA }
  const moved: readonly Moving[] = moves.map((one) => ({
    kind: "move",
    pathFrom: one.from,
    pathTo: one.to,
  }))
  const rows = [...moved, ...stated.rows]
  const unexportable = unexportableIn(rows)
  if (unexportable.length > 0) return { refusals: unexportable, code: DATA }
  const change = changeOf(root, base, rows)
  const generated = generatedOver(change, (more) => changeOf(root, base, [...rows, ...more]))
  if (generated.refused.length > 0) return { refusals: generated.refused, code: DATA }
  const made = generated.edits
  const whole = made.length === 0 ? change : changeOf(root, base, [...rows, ...made])
  const cast = shadowFor(whole)
  const added = made
  const idless = "refused" in cast ? [] : idlessIn(cast.shadow, foldedOver(rows, added))
  if (idless.length > 0) return { refusals: idless, code: DATA }
  return {
    formatting,
    changes: [...rows, ...added],
    facing: facingIn(root, "refused" in cast ? root : cast.reading),
    settled: "refused" in cast || cast.settled === null ? null : { base, settling: cast.settled },
    said: generated.said,
    over: added.length === 0 ? change : null,
  }
}
