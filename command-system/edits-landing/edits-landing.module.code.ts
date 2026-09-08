import { existsSync } from "node:fs"
import { join } from "node:path"
import { NOT_TEXT, notText, pathsOf, replayed } from "@akasha/changes/change-answer"
import type { Answer as Said } from "@akasha/changes/change-answer/types"
import { bytesOf } from "@akasha/changes/change-shadow"
import { bodyIn } from "@akasha/changes/edits-keeping"
import { formattedBody } from "@akasha/code/code-format"
import type { Bodies, Body } from "../drafting/drafting.module.code.ts"
import type { FileMove } from "../path-moving/path-moving.module.code.ts"

const BYTES = new TextEncoder()

const NOT_TEXT_SAID = "is not text, so no body is worked out for it"

export function owingIn(said: Said): ReadonlyMap<string, boolean> {
  const owed = new Map<string, boolean>()
  for (const one of said.edits) {
    if (one.readersOweReading === undefined) continue
    const at = one.kind === "move" ? [one.pathFrom, one.pathTo] : [one.path]
    for (const path of at) owed.set(path, (owed.get(path) ?? false) || one.readersOweReading)
  }
  return owed
}

export type Landing = {
  readonly held: Bodies
  readonly carries: readonly FileMove[]
}

export function carriesIn(said: Said): readonly FileMove[] {
  const named = new Map<string, number>()
  for (const one of said.edits) {
    for (const path of pathsOf(one)) named.set(path, (named.get(path) ?? 0) + 1)
  }
  const carries: FileMove[] = []
  for (const one of said.edits) {
    if (one.kind !== "move") continue
    if (named.get(one.pathFrom) !== 1 || named.get(one.pathTo) !== 1) continue
    carries.push({ from: one.pathFrom, to: one.pathTo })
  }
  return carries
}

export function bodiesFrom(root: string, said: Said): Landing | { readonly why: string } {
  const carries = carriesIn(said)
  const moved = new Set(carries.flatMap((one) => [one.from, one.to]))
  const reads = bodyIn(root)
  const after = replayed(said, (path) =>
    moved.has(path) ? (existsSync(join(root, path)) ? NOT_TEXT : null) : reads(path)
  )
  if ("refused" in after) return { why: after.refused }
  const owed = owingIn(said)
  const held = new Map<string, Body>()
  for (const [path, body] of after) {
    if (moved.has(path)) continue
    if (notText(body)) return { why: `\`${path}\` ${NOT_TEXT_SAID}` }
    const done = body === null ? null : formattedBody(root, path, BYTES.encode(body))
    const owes = owed.get(path)
    held.set(path, {
      was: bytesOf(reads(path)),
      body: done === null ? null : done.body,
      ...(owes === undefined ? {} : { readersOweReading: owes }),
    })
  }
  return { held, carries }
}
