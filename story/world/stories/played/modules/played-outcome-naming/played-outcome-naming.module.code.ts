import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { askedLoudly } from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import type { Actor } from "akasha/story/world/stories/played/modules/played-outcome-card/played-outcome-card.module.code.tsx"

const SLUG_KEY = "slug"

const UNREVEALED_KEY = "unrevealed"

const TITLE_KEY = "title"

const COLOR_KEY = "color"

const PARTED = "/"

export type Actors = ReadonlyMap<string, Actor>

function slugsByType(names: readonly string[]): ReadonlyMap<string, readonly string[]> {
  const byType = new Map<string, string[]>()
  for (const name of new Set(names)) {
    const address = addressIn(name)
    if (address.kind !== "qualified") continue
    const slugs = byType.get(address.pageTypeSlug) ?? []
    byType.set(address.pageTypeSlug, [...slugs, address.slug])
  }
  return byType
}

export async function actorsOf(names: readonly string[]): Promise<Actors> {
  const actors = new Map<string, Actor>()
  await Promise.all(
    [...slugsByType(names)].map(async ([type, slugs]) => {
      const asked = await askedLoudly({
        "page-type": type,
        where: { slug: { in: [...slugs] } },
        keys: [SLUG_KEY, TITLE_KEY, COLOR_KEY],
      })
      if (!asked.ok) return
      for (const row of asked.answer.rows) {
        const slug = textIn(row.values[SLUG_KEY])
        const name = textIn(row.values[TITLE_KEY])
        if (slug === null || name === null) continue
        actors.set(`${type}${PARTED}${slug}`, { name, color: textIn(row.values[COLOR_KEY]) })
      }
    })
  )
  return actors
}

export async function unrevealedOf(names: readonly string[]): Promise<ReadonlySet<string>> {
  const unrevealed = new Set<string>()
  await Promise.all(
    [...slugsByType(names)].map(async ([type, slugs]) => {
      const asked = await askedLoudly({
        "page-type": type,
        where: { slug: { in: [...slugs] } },
        keys: [SLUG_KEY, UNREVEALED_KEY],
      })
      if (!asked.ok) {
        for (const slug of slugs) unrevealed.add(`${type}${PARTED}${slug}`)
        return
      }
      for (const row of asked.answer.rows) {
        const slug = textIn(row.values[SLUG_KEY])
        if (slug !== null && row.values[UNREVEALED_KEY] === true) {
          unrevealed.add(`${type}${PARTED}${slug}`)
        }
      }
    })
  )
  return unrevealed
}
