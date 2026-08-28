import type { DeclaredType, Value } from "../formula/formula.ts"

const TEXTS: ReadonlySet<string> = new Set([
  "text",
  "slug",
  "lower-kebab-case",
  "uuid",
  "path",
  "url",
  "relation-address",
  "relation-id",
  "relation-name",
  "relation-seq",
  "relation-slug",
])

const KINDS: Readonly<Record<string, DeclaredType>> = {
  number: { kind: "number" },
  boolean: { kind: "boolean" },
  instant: { kind: "instant" },
  "calendar-date": { kind: "date" },
}

const NONE = "none"

const LIST = "list"

const SELECT = "select"

const DATE = /^\d{4}-\d{2}-\d{2}$/

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

const ABSENT: Value = { kind: "absent" }

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

export const valuedAs = (raw: unknown, type: DeclaredType): Value => {
  if (type.kind !== "list") return scalarAs(raw, type.kind)
  if (!Array.isArray(raw)) return ABSENT
  const items = raw.map((one) => scalarAs(one, type.of)).filter((one) => one.kind !== "absent")
  return { kind: "list", of: type.of, items }
}
