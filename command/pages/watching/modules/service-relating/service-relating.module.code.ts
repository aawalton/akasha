import { streamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { slugOf } from "akasha/command/pages/watching/modules/title-knowing/title-knowing.module.code.ts"
import type { Calls } from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"
import { nameFaultIn } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

export type Services = {
  readonly named: ReadonlyMap<string, string>
  readonly slugs: ReadonlySet<string>
}

type Relating = {
  readonly related: (names: readonly string[]) => readonly string[]
  readonly fresh: () => readonly Naming[]
}

const SERVICE = streamingService.slug

export const NO_SERVICES: Services = { named: new Map(), slugs: new Set() }

function addressOf(slug: string): string {
  return `${SERVICE}/${slug}`
}

export function servicesFrom(rows: readonly Row[]): Services {
  const named = new Map<string, string>()
  const slugs = new Set<string>()
  for (const row of rows) {
    if (typeof row.slug !== "string") continue
    slugs.add(row.slug)
    for (const name of stringsIn(row.providerNames)) named.set(name.trim(), addressOf(row.slug))
  }
  return { named, slugs }
}

export async function servicesKnown(calls: Calls): Promise<Services | string> {
  const rows = await calls.ask({ pageTypeSlug: SERVICE, keys: ["slug", "providerNames"] })
  return "refused" in rows ? rows.refused : servicesFrom(rows.rows)
}

function slugFor(name: string): string {
  const plain = slugOf(name)
  return nameFaultIn(plain) === null ? plain : `${SERVICE}-${plain}`
}

export function relatingBy(services: Services): Relating {
  const named = new Map(services.named)
  const slugs = new Set(services.slugs)
  const made: Naming[] = []
  const reached = (name: string): string => {
    const held = named.get(name)
    if (held !== undefined) return held
    const slug = slugFor(name)
    if (!slugs.has(slug)) {
      slugs.add(slug)
      const values = { title: name, providerNames: [name], free: false, held: false }
      made.push({ pageTypeSlug: SERVICE, slug, fresh: true, values })
    }
    named.set(name, addressOf(slug))
    return addressOf(slug)
  }
  const related = (names: readonly string[]): readonly string[] => {
    const trimmed = names.map((one) => one.trim()).filter((one) => one !== "")
    return [...new Set(trimmed.map(reached))].sort()
  }
  return { related, fresh: () => [...made] }
}
