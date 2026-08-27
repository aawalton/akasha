import { z } from "zod"

const OPENED_SHAPE = z.union([z.array(z.unknown()), z.record(z.string(), z.unknown())])

function shapedLikeRecord(text: string): boolean {
  let start = 0
  let end = text.length - 1
  while (start <= end && text.charCodeAt(start) <= 32) start += 1
  while (end > start && text.charCodeAt(end) <= 32) end -= 1
  if (end <= start) return false
  const head = text[start]
  const tail = text[end]
  return (head === "{" && tail === "}") || (head === "[" && tail === "]")
}

function openedText(text: string): unknown {
  if (!shapedLikeRecord(text)) return text
  try {
    const opened = OPENED_SHAPE.safeParse(JSON.parse(text))
    return opened.success ? opened.data : text
  } catch {
    return text
  }
}

function openedEntry(one: unknown): unknown {
  return typeof one === "string" ? openedText(one) : one
}

export function openedValue(value: unknown): unknown {
  if (typeof value === "string") {
    const opened = openedText(value)
    return Array.isArray(opened) ? opened.map(openedEntry) : opened
  }
  if (Array.isArray(value)) return value.map(openedEntry)
  return value
}

export function openedValues(values: Readonly<Record<string, unknown>>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(values)) out[key] = openedValue(value)
  return out
}

export function openedRows<Row extends { readonly values: Record<string, unknown> }>(
  rows: readonly Row[]
): readonly (Omit<Row, "values"> & { values: Record<string, unknown> })[] {
  return rows.map((row) => ({ ...row, values: openedValues(row.values) }))
}
