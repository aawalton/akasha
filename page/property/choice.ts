
import type { Frontmatter } from "../frontmatter.ts"
import type { Property } from "./property.ts"

export function choicesHeld(
  properties: readonly Property[],
  fm: Frontmatter
): { refusals: readonly string[]; unjudged: readonly string[] } {
  const groups = new Map<string, Property[]>()
  for (const one of properties) {
    if (one.oneOf === null) continue
    groups.set(one.oneOf, [...(groups.get(one.oneOf) ?? []), one])
  }
  const refusals: string[] = []
  const unjudged: string[] = []
  for (const [choice, members] of groups) {
    const named = members.map((one) => `\`${one.name}\``).join(", ")
    const on = [...new Set(members.map((one) => one.on))].join(", ")
    if (members.length < 2) {
      unjudged.push(`\`${choice}\`: it names ${named} alone on \`${on}\`, and a choice stands over two keys or more`)
      continue
    }
    const stated = members.filter((one) => fm.fields.has(one.name))
    if (stated.length === 1) continue
    const says = stated.length === 0 ? "none of them" : stated.map((one) => `\`${one.name}\``).join(" and ")
    refusals.push(
      `exactly one of ${named} stands, which is the \`${choice}\` choice on \`${on}\`, and this states ${says}`
    )
  }
  return { refusals, unjudged }
}
