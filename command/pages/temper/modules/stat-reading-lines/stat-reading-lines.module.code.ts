import { reportedStatsReadingSchema } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { z } from "zod"

const lineShape = z.object({
  id: z.string(),
  result: z.string(),
  character: z.string(),
  buildHash: z.string(),
  bar: z.enum(["frontBar", "backBar"]),
  reading: reportedStatsReadingSchema,
})

export type ReadingLine = z.infer<typeof lineShape>

export type Unread = { readonly line: number; readonly why: string }

type ReadingLines = {
  readonly lines: readonly ReadingLine[]
  readonly unread: readonly Unread[]
}

type Choosing = {
  readonly last: number
  readonly capturedAt?: number | undefined
  readonly id?: string | undefined
}

const SHORT = 18

export function shortIdOf(id: string): string {
  return id.slice(0, SHORT)
}

function whyOf(error: z.ZodError): string {
  const first = error.issues[0]
  if (first === undefined) return "it does not read"
  const at = first.path.length === 0 ? "" : ` at \`${first.path.join(".")}\``
  return `${first.message}${at}`
}

export function readingLinesIn(body: string): ReadingLines {
  const lines: ReadingLine[] = []
  const unread: Unread[] = []
  body.split("\n").forEach((text, at) => {
    if (text.trim() === "") return
    let held: unknown
    try {
      held = JSON.parse(text)
    } catch {
      unread.push({ line: at + 1, why: "it is no JSON" })
      return
    }
    const parsed = lineShape.safeParse(held)
    if (parsed.success) lines.push(parsed.data)
    else unread.push({ line: at + 1, why: whyOf(parsed.error) })
  })
  lines.sort((one, two) => one.reading.capturedAt - two.reading.capturedAt)
  return { lines, unread }
}

function newestFirst(lines: readonly ReadingLine[]): readonly ReadingLine[] {
  return [...lines].reverse()
}

export function chosenIn(
  lines: readonly ReadingLine[],
  choosing: Choosing
): { readonly chosen: readonly ReadingLine[] } | { readonly refused: string } {
  const { capturedAt, id } = choosing
  if (capturedAt !== undefined) {
    const found = lines.filter((one) => one.reading.capturedAt === capturedAt)
    if (found.length === 0) return { refused: `no reading was captured at ${capturedAt}` }
    return { chosen: newestFirst(found) }
  }
  if (id !== undefined) {
    const found = lines.filter((one) => one.id.startsWith(id))
    if (found.length === 0) return { refused: `no reading's id starts \`${id}\`` }
    if (found.length > 1) {
      const named = found.map((one) => shortIdOf(one.id)).join(", ")
      return { refused: `\`${id}\` starts ${found.length} readings' ids: ${named}` }
    }
    return { chosen: found }
  }
  if (choosing.last < 1) return { refused: "at least one reading is shown" }
  return { chosen: newestFirst(lines.slice(-choosing.last)) }
}
