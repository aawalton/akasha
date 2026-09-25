import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export type Clearing = {
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
    if (filedBy?.get(one.propertySlug) !== undefined) {
      return `${clears}, and \`${key}\` is held in a file, which clearing it would leave behind`
    }
  }
  return null
}
