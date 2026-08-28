/**
 * Where the pages system's stated types meet the formula language's.
 *
 * A page type states each property's type in the pages system's own vocabulary, declared as data in
 * `pages/page-property-type/` and 54 types wide. The formula language holds six. This file is the
 * whole of the translation between them.
 *
 * IT IS A TABLE RATHER THAN A RULE, and deliberately. Nothing on a property type's own page says
 * which of the six it reaches — `text`, `slug`, `relation-slug`, `number`, `instant` and
 * `calendar-date` are all alike `kind: primitive` there — so the mapping is written here until it
 * is written there, and a spelling reaches the language only by being named in it.
 *
 * A TYPE NOT NAMED HERE REACHES NOTHING, rather than falling back to text. A `json`, a
 * `map(reading)` or a page's rows is not a text, and calling it one would hand a formula a value it
 * could then compare — which is the fault this package exists to remove. A key of such a type is
 * carried beside the shape instead, and a query naming it is refused saying what it holds.
 *
 * PURE. No disk, no clock. What reads a file is `files.ts`.
 */

import type { DeclaredType, Value } from "../formula/formula.ts"

/** Every stated type holding one run of characters. A relation is the slug, name or id it holds. */
const TEXTS: ReadonlySet<string> = new Set([
  "text",
  "slug",
  "uuid",
  "path",
  "url",
  "relation-address",
  "relation-id",
  "relation-name",
  "relation-seq",
  "relation-slug",
])

/** The stated types holding one value of another kind, each under what it reaches. */
const KINDS: Readonly<Record<string, DeclaredType>> = {
  number: { kind: "number" },
  boolean: { kind: "boolean" },
  instant: { kind: "instant" },
  "calendar-date": { kind: "date" },
}

/** A stated type meaning the key may hold nothing, which is already true of every key. */
const NONE = "none"

/** The stated type holding several values of one kind. */
const LIST = "list"

/** The stated type holding one of a written-out set, which holds whatever that set is written in. */
const SELECT = "select"

/** A day, as a page writes one. */
const DATE = /^\d{4}-\d{2}-\d{2}$/

/** A stated type split into the word it leads with and what stands inside its brackets. */
const partsOf = (spelling: string): { readonly head: string; readonly of: string | null } => {
  const open = spelling.indexOf("(")
  if (open < 0 || !spelling.endsWith(")")) return { head: spelling, of: null }
  const inside = spelling.slice(open + 1, -1)
  const comma = inside.indexOf(",")
  return {
    head: spelling.slice(0, open).trim(),
    of: (comma < 0 ? inside : inside.slice(0, comma)).trim(),
  }
}

/**
 * What the formula language holds a key of this stated type to hold, or `null` where it holds none.
 *
 * A UNION REACHES NOTHING. `path | list(path, max 8)` is two types, and the language has one place
 * to put a type. `| none` is dropped first, being a statement about absence, which every key is
 * already open to.
 *
 * A COUNT LIMIT IS NOT PART OF A TYPE, so `list(relation-slug, max 20)` and `list(relation-slug)`
 * reach the same thing. What a limit is for is judged where a page is written, not where one is
 * read.
 */
export const heldBy = (spelling: string): DeclaredType | null => {
  const arms = spelling
    .split("|")
    .map((one) => one.trim())
    .filter((one) => one !== NONE && one !== "")
  const only = arms.length === 1 ? arms[0] : undefined
  if (only === undefined) return null

  const { head, of } = partsOf(only)
  if (TEXTS.has(head)) return { kind: "text" }
  const kind = KINDS[head]
  if (kind !== undefined) return kind
  if (of === null) return null
  if (head === SELECT) return heldBy(of)
  if (head !== LIST) return null
  const item = heldBy(of)
  if (item === null) return null
  const held = item.kind
  if (held === "list" || held === "date") return null
  return { kind: "list", of: held }
}

/** Nothing stands under the key. */
const ABSENT: Value = { kind: "absent" }

/** What one scalar a page states holds, under the type its page type declares for it. */
const scalarAs = (
  raw: unknown,
  kind: "text" | "number" | "boolean" | "instant" | "date"
): Value => {
  if (raw === null || raw === undefined) return ABSENT
  if (kind === "text") {
    if (typeof raw === "object") return ABSENT
    return { kind: "text", text: String(raw) }
  }
  if (kind === "boolean") {
    if (typeof raw === "boolean") return { kind: "boolean", boolean: raw }
    if (raw === "true") return { kind: "boolean", boolean: true }
    if (raw === "false") return { kind: "boolean", boolean: false }
    return ABSENT
  }
  if (kind === "number") {
    if (typeof raw === "number") return Number.isFinite(raw) ? { kind: "number", number: raw } : ABSENT
    if (typeof raw !== "string") return ABSENT
    const held = Number(raw.trim())
    return raw.trim() !== "" && Number.isFinite(held) ? { kind: "number", number: held } : ABSENT
  }
  if (kind === "date") {
    return typeof raw === "string" && DATE.test(raw.trim())
      ? { kind: "date", date: raw.trim() }
      : ABSENT
  }
  if (typeof raw === "number") return Number.isFinite(raw) ? { kind: "instant", instant: raw } : ABSENT
  if (typeof raw !== "string") return ABSENT
  const at = Date.parse(raw.trim())
  return Number.isFinite(at) ? { kind: "instant", instant: at } : ABSENT
}

/**
 * What one value a page states holds, under the type its page type declares for it.
 *
 * THE DECLARATION DECIDES AND THE VALUE DOES NOT. A page writing `2026` under a key declared text
 * holds the text `2026`, and one writing `"9"` under a key declared number holds the number nine —
 * because the page type said so, not because the characters looked like one thing or the other.
 * Which way a page's frontmatter happened to parse is an accident of YAML and is not allowed to
 * decide what a query means.
 *
 * A VALUE THAT CANNOT BE READ UNDER ITS DECLARED TYPE IS ABSENT. The page is wrong, and saying so
 * is the work of a check over pages rather than of the store that reads them; here it holds
 * nothing, and a formula reaching it answers absent.
 *
 * A LIST DROPS THE ITEMS IT CANNOT READ AND KEEPS THE REST, a list being several values rather than
 * one, so one bad item does not take the others with it.
 */
export const valuedAs = (raw: unknown, type: DeclaredType): Value => {
  if (type.kind !== "list") return scalarAs(raw, type.kind)
  if (!Array.isArray(raw)) return ABSENT
  const items = raw.map((one) => scalarAs(one, type.of)).filter((one) => one.kind !== "absent")
  return { kind: "list", of: type.of, items }
}
