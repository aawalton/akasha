export interface HarnessRow {
  readonly id: string
  readonly name: string | null
  readonly parent_agent_id: string | null
  readonly principal: string | null
  readonly launch: string | null
  readonly mode: string | null
  readonly live: boolean
  readonly state: string | null
  readonly waitingOn: string | null
  readonly color: string | null
  readonly at: string | null
}

export interface SubagentPage {
  readonly seat: string
  readonly own: string
  readonly at: string
}

export interface ForestAnswer {
  readonly repo: string | null
  readonly rows: readonly HarnessRow[]
  readonly subagentPages: readonly SubagentPage[]
}

function stringOrNull(value: unknown, field: string, at: number): string | null {
  if (value === null || typeof value === "string") {
    return value
  }
  throw new Error(`agent-forest: rows[${at}].${field} is neither a string nor null`)
}

function rowColor(row: Record<string, unknown>, at: number): string | null {
  const field = Object.hasOwn(row, "color") ? "color" : "colour"
  return stringOrNull(row[field], field, at)
}

export function parseForestRows(answer: unknown): readonly HarnessRow[] {
  if (
    answer === null ||
    typeof answer !== "object" ||
    !Array.isArray((answer as { rows?: unknown }).rows)
  ) {
    throw new Error("agent-forest: the answer carries no `rows` array, so it names no seat at all")
  }
  return (answer as { rows: readonly unknown[] }).rows.map((raw, at) => {
    if (raw === null || typeof raw !== "object") {
      throw new Error(`agent-forest: rows[${at}] is not an object`)
    }
    const row = raw as Record<string, unknown>
    if (typeof row.id !== "string" || row.id === "") {
      throw new Error(`agent-forest: rows[${at}] carries no id, and a row with none is no seat`)
    }
    if (typeof row.live !== "boolean") {
      throw new Error(`agent-forest: rows[${at}].live is not a boolean`)
    }
    return {
      id: row.id,
      name: stringOrNull(row.name, "name", at),
      parent_agent_id: stringOrNull(row.parent_agent_id, "parent_agent_id", at),
      principal: stringOrNull(row.principal, "principal", at),
      launch: stringOrNull(row.launch, "launch", at),
      mode: stringOrNull(row.mode, "mode", at),
      live: row.live,
      state: stringOrNull(row.state, "state", at),
      waitingOn: stringOrNull(row.waitingOn, "waitingOn", at),
      color: rowColor(row, at),
      at: stringOrNull(row.at ?? null, "at", at),
    }
  })
}

function textIn(held: Record<string, unknown>, key: string): string | null {
  const value = held[key]
  return typeof value === "string" && value !== "" ? value : null
}

export function parseSubagentPages(answer: unknown): readonly SubagentPage[] {
  if (answer === null || typeof answer !== "object") {
    return []
  }
  const held = (answer as { subagents?: unknown }).subagents
  if (!Array.isArray(held)) {
    return []
  }
  const found: SubagentPage[] = []
  for (const raw of held) {
    if (raw === null || typeof raw !== "object") {
      continue
    }
    const one = raw as Record<string, unknown>
    const seat = textIn(one, "seat")
    const own = textIn(one, "own")
    const at = textIn(one, "at")
    if (seat === null || own === null || at === null) {
      continue
    }
    found.push({ seat, own, at })
  }
  return found
}

export function parseForest(answer: unknown): ForestAnswer {
  const rows = parseForestRows(answer)
  const held = answer as Record<string, unknown>
  const repo = textIn(held, "repo")
  return {
    repo,
    rows,
    subagentPages: repo === null ? [] : parseSubagentPages(answer),
  }
}

export function parseStateColor(answer: unknown, state: string): string {
  if (answer === null || typeof answer !== "object") {
    throw new Error("agent-turn-colors: the answer is not an object, so it names no color")
  }
  const held = answer as { colors?: unknown; colours?: unknown }
  const colors = held.colors ?? held.colours
  if (colors === null || colors === undefined || typeof colors !== "object") {
    throw new Error(
      "agent-turn-colors: the answer carries neither a `colors` nor a `colours` record"
    )
  }
  const named = (colors as Record<string, unknown>)[state]
  if (typeof named !== "string" || named === "") {
    throw new Error(`agent-turn-colors: nothing was answered for the \`${state}\` state`)
  }
  return named
}
