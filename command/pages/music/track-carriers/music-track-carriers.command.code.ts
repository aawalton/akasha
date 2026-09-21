import {
  idFrom,
  linkFrom,
} from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import { composedEdit } from "akasha/change/modules/page-editing/page-editing.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { plan } from "akasha/command/argument/pages/plan.argument.ts"
import {
  answering,
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { releaseOf } from "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts"
import { musicTrackCarriers as page } from "akasha/command/pages/music/track-carriers/music-track-carriers.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  numberAt,
  recordsIn,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const TRACK = "track"

const RELEASE = "release"

const SPOTIFY = "spotify"

const IDENTITY = "externalIdentity"

const CARRIED_BY = "carriedBy"

const DISC_NUMBER = "discNumber"

const POSITION = "position"

const NAMED = [json, plan] as const

export type Carrier = {
  readonly release: string
  readonly discNumber?: number
  readonly position?: number
  readonly externalId: string
  readonly externalLink?: string
}

export type Counted = {
  readonly tracks: number
  readonly filled: number
  readonly already: number
  readonly skipped: number
}

export type Filling = { readonly counts: Counted; readonly changes: readonly Asking[] }

export function carrierOf(value: Value): Carrier | null {
  const slug = releaseOf(value)
  if (slug === null) return null
  const said = idFrom(value[IDENTITY], SPOTIFY)
  if (said === null) return null
  const disc = numberAt(value, DISC_NUMBER)
  const place = numberAt(value, POSITION)
  const link = linkFrom(value[IDENTITY], SPOTIFY)
  return {
    release: `${RELEASE}/${slug}`,
    ...(disc === null ? {} : { discNumber: disc }),
    ...(place === null ? {} : { position: place }),
    externalId: said,
    ...(link === null ? {} : { externalLink: link }),
  }
}

export function carriesAlready(value: Value): boolean {
  return recordsIn(value[CARRIED_BY]).length > 0
}

export function valuesCarried(was: Value, carrier: Carrier): Value {
  return { ...was, [CARRIED_BY]: [carrier] }
}

export function fillingIn(root: string): Filling {
  const source = sourceFor(root)
  const changes: Asking[] = []
  let tracks = 0
  let filled = 0
  let already = 0
  let skipped = 0
  for (const one of valuesOfType(root, TRACK)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    tracks += 1
    if (carriesAlready(one.value)) {
      already += 1
      continue
    }
    const carrier = carrierOf(one.value)
    if (carrier === null) {
      skipped += 1
      continue
    }
    filled += 1
    changes.push(composedEdit(root, TRACK, slug, valuesCarried(one.value, carrier), source))
  }
  return { counts: { tracks, filled, already, skipped }, changes }
}

export function rowsOf(counts: Counted): readonly string[] {
  return [
    `tracks\t${counts.tracks}`,
    `filled\t${counts.filled}`,
    `already\t${counts.already}`,
    `skipped\t${counts.skipped}`,
  ]
}

export function messageOf(counts: Counted): string {
  return `name the release carrying ${counts.filled} track(s)`
}

async function answered(argv: readonly string[], given: Given, landing: Landing): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), DATA)
  const found = fillingIn(given.root)
  const rows = read.taken.json ? [JSON.stringify(found.counts)] : rowsOf(found.counts)
  if (read.taken.plan || found.changes.length === 0) return told(rows)
  const landed = await landing(given.root, found.changes, messageOf(found.counts))
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return refused(wrong.join("; "), DATA)
  return told(rows)
}

export async function musicTrackCarriers(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async () => await answered(argv, given, landing))
}
