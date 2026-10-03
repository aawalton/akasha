import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { beats as beatsFile } from "akasha/story/chapter/properties/beats.file-property.ts"
import {
  cachedOf,
  changesRefused,
  mergedOf,
  type Reading,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import {
  type Beats,
  beatsWritten,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { typeOf } from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import {
  type Handed,
  type Held,
  MECHANICS,
  type Moved,
  PLAYER,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const BEATS = exportedAs(beatsFile.propertySlug)

const PROSE = "prose"

type Refused = { readonly refused: string }

export type Changing = (root: string) => Reading

export function beatsBodyOf(held: Beats, said: Moved): string | null {
  if (said.planned !== null) return beatsWritten({ ...said.planned, changes: [], memory: [] })
  if (said.changes === null && said.memory === null) return null
  const changes = said.changes ?? held.changes
  return beatsWritten({ ...held, changes, memory: said.memory ?? held.memory })
}

export function bodiesOf(
  said: Moved,
  held: Beats
): { readonly bodies?: { readonly [key: string]: string } } {
  const bodies: { [key: string]: string } = {}
  if (said.prose !== null) bodies[PROSE] = said.prose
  const beats = beatsBodyOf(held, said)
  if (beats !== null) bodies[BEATS] = beats
  return Object.keys(bodies).length === 0 ? {} : { bodies }
}

export function changesIndexed(root: string): Reading {
  const pathOf = (page: string) => listedAt(root, typeOf(page), slugOf(page))[0]?.path ?? null
  return {
    exists: (page) => pathOf(page) !== null,
    valueOf: (page, key) => {
      const at = pathOf(page)
      return at === null ? undefined : valueAt(at, root)?.[key]
    },
  }
}

export function changesChecked(reading: Reading, held: Held, handed: Handed): string | null {
  if (handed.kind !== "record" || held.status !== MECHANICS) return null
  const more = handed.changes ?? []
  if (more.length === 0) return null
  return changesRefused(mergedOf(held.changes ?? [], more), reading)
}

export function cacheNamed(
  reading: Reading,
  held: Held,
  status: TurnStep
): readonly Naming[] | Refused {
  const changes = held.changes ?? []
  if (status !== PLAYER || changes.length === 0) return []
  const cached = cachedOf(changes, reading)
  if ("refused" in cached) return cached
  return cached.map(
    (one): Naming => ({
      pageTypeSlug: typeOf(one.page),
      slug: slugOf(one.page),
      merge: !one.made,
      values: one.values,
    })
  )
}
