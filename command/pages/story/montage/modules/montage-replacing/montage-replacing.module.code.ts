import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"

const SESSION = "session"

const ANSWERED = "answered"

const ENDS_AT = "endsAt"

const BREAK = "\n"

type Held<Of> = { readonly answered: Of } | { readonly refused: string }

export type Prior = {
  readonly text: string
  readonly lines: readonly Readonly<Record<string, unknown>>[]
}

export type Outcomes = { readonly kept: readonly string[]; readonly prior: Prior | null }

export type Chaptered = { readonly position: number; readonly ends: unknown }

export type Starting = {
  readonly kept: readonly string[]
  readonly earlier: readonly unknown[]
  readonly chapters: readonly Chaptered[]
  readonly opens: unknown
}

function parsed(line: string): Readonly<Record<string, unknown>> | null {
  try {
    const held: unknown = JSON.parse(line)
    return isRecord(held) ? held : null
  } catch {
    return null
  }
}

function sessioned(line: string): boolean {
  return typeof parsed(line)?.[SESSION] === "number"
}

export function priorIn(lines: readonly string[]): Held<Outcomes> {
  const start = lines.findIndex(sessioned)
  if (start === -1) return { answered: { kept: lines, prior: null } }
  const block = lines.slice(start)
  if (!block.every(sessioned)) {
    return { refused: "a montage reruns only while its lines are the last of its turn's outcomes" }
  }
  const text = block.map((one) => `${one}${BREAK}`).join("")
  const held = block.map((one) => parsed(one) ?? {})
  return { answered: { kept: lines.slice(0, start), prior: { text, lines: held } } }
}

function endOf(line: string): string | null {
  const answered = parsed(line)?.[ANSWERED]
  const ends = isRecord(answered) ? answered[ENDS_AT] : undefined
  return typeof ends === "string" ? ends : null
}

export function startOf(said: Starting): string | null {
  for (const line of said.kept.toReversed()) {
    const ends = endOf(line)
    if (ends !== null) return ends
  }
  for (const ends of said.earlier) if (typeof ends === "string") return ends
  const latest = said.chapters
    .filter((one) => typeof one.ends === "string")
    .toSorted((a, b) => b.position - a.position)[0]
  if (latest !== undefined) return latest.ends as string
  return typeof said.opens === "string" ? said.opens : null
}
