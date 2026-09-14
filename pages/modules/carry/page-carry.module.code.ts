export type Held = string | readonly string[] | null

export type Values = Readonly<Record<string, Held>>

function jsonOf(value: unknown): string {
  return JSON.stringify(value) ?? ""
}

function carriedText(value: unknown): string {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return jsonOf(value)
}

export function carried(value: unknown): Held {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (value === null || value === undefined) return null
  if (Array.isArray(value)) return value.map((one) => carriedText(one))
  return jsonOf(value)
}
