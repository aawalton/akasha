import { ENTRY_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

type Clearing = {
  readonly pageTypeSlug: string
  readonly values: Readonly<Record<string, unknown>>
  readonly clears?: readonly string[]
  readonly bodies?: Readonly<Record<string, string>>
}

export function clearRefused(
  asked: Clearing,
  carried: readonly Carried[],
  filedBy: ReadonlyMap<string, string | null> | undefined
): string | null {
  const bodies = asked.bodies ?? {}
  for (const key of asked.clears ?? []) {
    const clears = `\`${key}\` is cleared`
    const one = carried.find((each) => each.key === key)
    if (one === undefined) {
      return `${clears}, and \`${asked.pageTypeSlug}\` declares no property carried as \`${key}\``
    }
    if (key in asked.values || key in bodies) return `${clears} and handed over in one write`
    if (one.uncommitted) {
      return `${clears}, and \`${key}\` is kept beside the page, where clearing it reaches nothing`
    }
    const named = filedBy?.get(one.propertySlug)
    if (named === undefined) continue
    if (one.pageTypeSlug === ENTRY_PROPERTY) {
      return `${clears}, and \`${key}\` is held in a file as rows, which clearing it would leave behind`
    }
    if (named !== null) {
      return `${clears}, and \`${key}\` is held in a file named \`${named}\`, which clearing it would leave behind`
    }
  }
  return null
}

type Holding = {
  readonly filed: boolean
  readonly nullable: () => boolean
}

type Handed = "written" | "dropped" | { readonly refused: string }

export function nothingHanded(
  pageTypeSlug: string,
  one: Carried,
  value: unknown,
  holding: Holding
): Handed {
  if (value !== null && value !== undefined) return "written"
  if (one.uncommitted || holding.filed) return "written"
  if (value === null && holding.nullable()) return "written"
  if (!one.required) return "dropped"
  return {
    refused:
      `\`${one.key}\` is handed over as ${String(value)}, and \`${pageTypeSlug}\` requires ` +
      `\`${one.key}\`, so no page is written without it`,
  }
}
