export type Verdict = "pass" | "fail" | "advisory" | "not-applicable"

export interface Population {
  readonly measured: number
  readonly unit: string
}

export function over(measured: number, unit: string): Population {
  return { measured, unit }
}

export interface Outcome {
  readonly name: string
  readonly verdict: Verdict
  readonly detail: string
  readonly messages: readonly string[]
  readonly population?: Population
  readonly owed?: readonly string[]
  readonly elapsedMs?: number
  readonly bandReplaced?: Verdict
}

export function judge(
  name: string,
  detail: string,
  messages: readonly string[],
  owed: readonly string[] = []
): Outcome {
  const outcome: Outcome = { name, verdict: messages.length === 0 ? "pass" : "fail", detail, messages }
  return owed.length === 0 ? outcome : { ...outcome, owed }
}

export function advise(name: string, detail: string, notices: readonly string[]): Outcome {
  return { name, verdict: notices.length === 0 ? "pass" : "advisory", detail, messages: notices }
}

export function skip(name: string, detail: string): Outcome {
  return { name, verdict: "not-applicable", detail, messages: [] }
}

function pad(text: string, width: number): string {
  return text.length >= width ? `${text} ` : text + " ".repeat(width - text.length)
}

export function render(outcomes: readonly Outcome[]): readonly string[] {
  const lines: string[] = []
  for (const outcome of outcomes) {
    const searched =
      outcome.population === undefined
        ? ""
        : `[over ${outcome.population.measured} ${outcome.population.unit}] `
    lines.push(
      `  ${pad(`[${outcome.name}]`, 21)}${pad(outcome.verdict, 16)}${searched}${outcome.detail}`
    )
    for (const message of outcome.messages)
      for (const line of message.split("\n")) lines.push(line === "" ? "" : `      ${line}`)
  }
  return lines
}

export function refusals(outcomes: readonly Outcome[]): readonly string[] {
  return outcomes.flatMap((o) => (o.verdict === "fail" ? o.messages : []))
}

export function anyRefused(outcomes: readonly Outcome[]): boolean {
  return outcomes.some((o) => o.verdict === "fail")
}
