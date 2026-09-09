const UNDER = "-"

const SLASH = "/"

const PARTS = "parts"

export type Held = {
  readonly named: string
  readonly said: string | null
}

export function partsOf(page: Record<string, unknown> | null): readonly string[] {
  const said = page === null ? null : page[PARTS]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string")
}

export function slugOfPart(part: string): string {
  const at = part.indexOf(SLASH)
  return at === -1 ? part : part.slice(at + 1)
}

export function underOf(named: string, part: string): string | null {
  const opens = `${named}${UNDER}`
  const slug = slugOfPart(part)
  return slug.startsWith(opens) ? slug.slice(opens.length) : null
}

export function spaced(slug: string): string {
  return slug.split(UNDER).join(" ")
}

export function widest(said: readonly string[]): number {
  return said.reduce((held, one) => (one.length > held ? one.length : held), 0)
}

export function listingOf(
  under: string,
  definition: string | null,
  held: readonly Held[],
  help: string
): readonly string[] | null {
  if (held.length === 0) return null
  const wide = widest(held.map((one) => one.named))
  const report = [definition === null ? under : `${under} — ${definition}`, ""]
  for (const one of held) {
    report.push(one.said === null ? `  ${one.named}` : `  ${one.named.padEnd(wide)}  ${one.said}`)
  }
  report.push("", `say \`${under} <command> ${help}\` for what one takes`)
  return report
}
