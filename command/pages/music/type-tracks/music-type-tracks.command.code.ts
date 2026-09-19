import { trackTypeFor } from "akasha/alan/music/catalog/modules/track-typing/track-typing.module.code.ts"
import { composedEdit } from "akasha/change/modules/page-editing/page-editing.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { limit } from "akasha/command/argument/pages/limit.argument.ts"
import {
  answering,
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicTypeTracks as page } from "akasha/command/pages/music/type-tracks/music-type-tracks.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const TRACK = "track"

const TRACK_TYPE = "trackType"

const NAMED = [json, limit] as const

export type Taken = { readonly json: boolean; readonly limit: number | null }

export type Counted = {
  readonly tracks: number
  readonly typed: number
  readonly left: number
}

export type Typing = { readonly counts: Counted; readonly changes: readonly Asking[] }

export function taken(
  argv: readonly string[],
  calledAs: string
): Taken | { readonly refused: string } {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const most = read.taken.limit ?? null
  if (most !== null && most < 1) {
    return {
      refused: `\`${limit.said}\` takes a whole number of one or more, and this call names \`${most}\``,
    }
  }
  return { json: read.taken.json, limit: most }
}

export function typedOver(value: Value, title: string): Value | null {
  const kind = trackTypeFor(title)
  return value[TRACK_TYPE] === kind ? null : { ...value, [TRACK_TYPE]: kind }
}

export function typingIn(root: string, most: number | null): Typing {
  const source = sourceFor(root)
  const changes: Asking[] = []
  let tracks = 0
  let left = 0
  for (const one of valuesOfType(root, TRACK)) {
    const slug = textIn(one.value, "slug")
    const title = textIn(one.value, "title")
    if (slug === null || title === null) continue
    tracks += 1
    const values = typedOver(one.value, title)
    if (values === null) continue
    if (most !== null && changes.length >= most) {
      left += 1
      continue
    }
    changes.push(composedEdit(root, TRACK, slug, values, source))
  }
  return { counts: { tracks, typed: changes.length, left }, changes }
}

export function rowsOf(counts: Counted): readonly string[] {
  return [`tracks\t${counts.tracks}`, `typed\t${counts.typed}`, `left\t${counts.left}`]
}

export function messageOf(counts: Counted): string {
  return `state the kind of recording on ${counts.typed} track(s)`
}

async function ran(argv: readonly string[], given: Given, landing: Landing): Promise<Answer> {
  const asked = taken(argv, given.calledAs)
  if ("refused" in asked) return refused(asked.refused, DATA)
  const found = typingIn(given.root, asked.limit)
  const rows = asked.json ? [JSON.stringify(found.counts)] : rowsOf(found.counts)
  if (found.changes.length === 0) return told(rows)
  const landed = await landing(given.root, found.changes, messageOf(found.counts))
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return refused(wrong.join("; "), DATA)
  return told(rows)
}

export async function musicTypeTracks(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async () => await ran(argv, given, landing))
}
