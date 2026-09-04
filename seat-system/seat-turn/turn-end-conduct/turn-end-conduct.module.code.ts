import { textAt, type Value, valueAt } from "@akasha/pages-system/page-value"

export const CONDUCT_RELATIVE_PATH =
  "alan/harness/agents/annoyance/alan-harness-agents-annoyance.domain.ts"

const DEFINITION = "definition"

const INVARIANTS = "invariants"

const STATEMENT = "statement"

function statementsIn(value: Value): readonly string[] {
  const held = value[INVARIANTS]
  if (!Array.isArray(held)) return []
  const said: string[] = []
  for (const one of held) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const line = textAt(one as Value, STATEMENT)
    if (line !== null && line !== "") said.push(line)
  }
  return said
}

export function conductFrom(value: Value): string {
  const definition = textAt(value, DEFINITION)
  const said = definition === null || definition === "" ? [] : [definition]
  return [...said, ...statementsIn(value)].join("\n\n").trim()
}

export function conductIn(root: string): string {
  const path = `${root}/${CONDUCT_RELATIVE_PATH}`
  let value: Value | null
  try {
    value = valueAt(CONDUCT_RELATIVE_PATH, root)
  } catch (cause) {
    throw new Error(
      `turn-end-reading: the conduct at ${path} could not be read, so this turn end has nothing ` +
        `to be read against: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
  if (value === null)
    throw new Error(
      `turn-end-reading: ${CONDUCT_RELATIVE_PATH} answers to no page value, so this turn end has ` +
        "nothing to be read against."
    )
  const body = conductFrom(value)
  if (body === "")
    throw new Error(
      `turn-end-reading: ${CONDUCT_RELATIVE_PATH} states no definition and no invariant, so it ` +
        "says nothing about what annoys its principal. It is the whole of what a reading is " +
        "taken against, so no turn end is read without it."
    )
  return body
}
