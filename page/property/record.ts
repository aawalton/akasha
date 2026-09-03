import type { Frontmatter } from "../frontmatter.ts"
import { stringAt } from "../text/text.ts"
import { nested, textOf, within, wrongShape } from "./stated.ts"
import type { Held, RecordField, Rule, Stated } from "./stated.ts"

const RECORD = "record"

export interface DeclaredField extends RecordField {
  readonly at: string
}

export const statedOf = (fm: Frontmatter): Stated => ({
  pattern: stringAt(fm, "pattern"),
  backstop: stringAt(fm, "backstop"),
  values: (fm.fields.get("values") as Held | undefined) ?? null,
  max: stringAt(fm, "max"),
})

export function recordsFor(
  declared: ReadonlyMap<string, readonly DeclaredField[]>,
  kinds: ReadonlyMap<string, string>
): ReadonlyMap<string, readonly RecordField[]> {
  const records = new Map<string, readonly RecordField[]>()
  for (const [slug, kind] of kinds) {
    if (kind !== RECORD) continue
    const standing = [...(declared.get(slug) ?? [])].sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0))
    const fields: RecordField[] = []
    for (const one of standing) {
      if (one.type === "") continue
      fields.push({
        name: one.name,
        type: one.type,
        required: one.required,
        oneOf: one.oneOf,
        stated: one.stated,
      })
    }
    if (fields.length > 0) records.set(slug, fields)
  }
  return records
}

const spelled = (names: readonly string[], joiner: string): string =>
  names.map((one) => `\`${one}\``).join(joiner)

export function recordRule(
  slug: string,
  fields: readonly RecordField[],
  resolve: (field: RecordField) => { rule: Rule | null; why: string | null }
): { rule: Rule | null; why: string | null } {
  const held = new Map<string, Rule>()
  for (const field of fields) {
    const { rule, why } = resolve(field)
    if (rule === null) return { rule: null, why: `\`${slug}.${field.name}\` — ${why}` }
    held.set(field.name, rule)
  }
  const groups = new Map<string, string[]>()
  for (const field of fields) {
    if (field.oneOf === null) continue
    groups.set(field.oneOf, [...(groups.get(field.oneOf) ?? []), field.name])
  }
  return {
    rule: {
      says: `a map of ${fields.map((one) => `\`${one.name}\``).join(", ")}`,
      holds: (value) => {
        const under: Held = value === "" ? {} : value
        if (typeof under === "string" || Array.isArray(under)) return wrongShape(under)
        const written = new Set<string>()
        for (const [key, stated] of Object.entries(under)) {
          written.add(key)
          const rule = held.get(key)
          if (rule === undefined) return within(`\`${key}\`, which \`${slug}\` does not declare`)
          const fault = rule.holds(stated)
          if (fault === null) continue
          return nested(`${textOf(fault)} at \`${key}\``, fault, `\`${key}\` takes ${rule.says}`)
        }
        for (const field of fields)
          if (field.required && !written.has(field.name)) return within(`no \`${field.name}\``)
        for (const names of groups.values()) {
          const stated = names.filter((one) => written.has(one))
          if (stated.length === 1) continue
          return within(
            stated.length === 0 ? `none of ${spelled(names, ", ")}` : `${spelled(stated, " and ")} together`
          )
        }
        return null
      },
    },
    why: null,
  }
}
