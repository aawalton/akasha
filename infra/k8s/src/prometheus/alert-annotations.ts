import { askNamed } from "@shared/pages-query"
import { z } from "zod"

const QUERY = "alerts-all"

export interface AlertWords {
  readonly summary: string
  readonly description: string
}

function held(values: Record<string, unknown>, key: string): string | null {
  const one = values[key]
  return typeof one === "string" && one.trim() !== "" ? one.trim() : null
}

export async function alertWords(): Promise<ReadonlyMap<string, AlertWords>> {
  const asked = await askNamed(QUERY)
  if (!asked.ok) {
    throw new Error(
      `alert words: the ${QUERY} page query went unanswered, so every alert composed here would ` +
        `ship with no summary and no description — ${asked.why}`
    )
  }
  const found = new Map<string, AlertWords>()
  for (const row of asked.answer.rows) {
    const slug = held(row.values, "slug")
    const summary = held(row.values, "summary")
    const description = held(row.values, "description")
    if (slug === null || summary === null || description === null) continue
    found.set(slug, { summary, description })
  }
  return found
}

export function slugOf(alertName: string): string {
  return alertName
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
}

function quoted(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`
}

const ALERT_LINE = /^(\s*)- alert: (\S+)\s*$/

const ALERT_LINE_CAPTURE = z.tuple([z.string(), z.string(), z.string()])

function parseAlertLine(line: string): { readonly indent: string; readonly name: string } | null {
  const captured = ALERT_LINE_CAPTURE.safeParse(ALERT_LINE.exec(line))
  return captured.success ? { indent: captured.data[1], name: captured.data[2] } : null
}

export function withAnnotations(yaml: string, words: ReadonlyMap<string, AlertWords>): string {
  const out: string[] = []
  for (const line of yaml.split("\n")) {
    out.push(line)
    const found = parseAlertLine(line)
    if (found === null) continue
    const held = words.get(slugOf(found.name))
    if (held === undefined) continue
    const pad = `${found.indent}  `
    out.push(`${pad}annotations:`)
    out.push(`${pad}  summary: ${quoted(held.summary)}`)
    out.push(`${pad}  description: ${quoted(held.description)}`)
  }
  return out.join("\n")
}
