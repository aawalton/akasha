import type { Shaped } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import type { Rowing } from "akasha/page/modules/entries/page-entries.module.code.ts"
import {
  recordsIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const FILED_AS_IDENTITY = new Set(["id", "slug", "type"])

type Naming = {
  readonly key: string
  readonly propertySlug: string
  readonly said: string
  readonly held: unknown
  readonly identity: boolean
}

function namingsAmong(
  record: Value,
  under: string,
  fieldOf: (key: string) => string | null,
  identity: boolean
): readonly Naming[] {
  const found: Naming[] = []
  for (const [key, held] of Object.entries(record)) {
    if (held === null) continue
    const field = fieldOf(key)
    if (field === null) continue
    found.push({ key, propertySlug: field, said: `${under} ${field}`, held, identity })
  }
  return found
}

export function namingsIn(value: Value, known: Shaped): readonly Naming[] {
  const found: Naming[] = []
  for (const [key, held] of Object.entries(value)) {
    if (held === null) continue
    const propertySlug = known.slugOfKeyIn(value, key)
    if (propertySlug === null) continue
    const identity = FILED_AS_IDENTITY.has(key)
    if (known.targetOf(propertySlug) !== null) {
      found.push({ key, propertySlug, said: propertySlug, held, identity })
      continue
    }
    if (known.fieldsOf(propertySlug).length === 0) continue
    for (const entry of recordsIn(held)) {
      found.push(
        ...namingsAmong(
          entry,
          propertySlug,
          (inner) => known.fieldOfKey(propertySlug, inner),
          identity
        )
      )
    }
  }
  return found
}

export function namingsInRows(rowing: readonly Rowing[], known: Shaped): readonly Naming[] {
  return rowing.flatMap((one) =>
    one.rows.flatMap((row) =>
      namingsAmong(row, one.slug, (key) => known.rowFieldOfKey(one.slug, key), false)
    )
  )
}
