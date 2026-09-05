import { shape } from "@akasha/utils-narrow/shape"
import {
  type Definition,
  everyKind,
} from "../../compose-subagents/compose-subagents.module.code.ts"

const LOG = "[spawn-agents]"

const COMPOSE_MODULE = "compose-subagents"

const DELEGATION_TOOL = "Agent"

const DELEGATION_OFF =
  `Delegation is OFF for this launch: the ${DELEGATION_TOOL} tool is disallowed, so this seat ` +
  `cannot dispatch a subagent at all. A subagent started without these definitions is never ` +
  `told to read its seat, and nothing it can see tells it apart from one that was.`

const AGENT_MAP = shape.record(shape.string(), shape.unknown())

/** The composed map as the client's `--agents` flag takes it, or nothing where it holds none. */
export function renderSubagentDefinitions(
  composed: Readonly<Record<string, Definition>>
): string | null {
  const parsed = AGENT_MAP.safeParse(composed)
  if (!parsed.success) return null
  if (Object.keys(parsed.data).length === 0) return null
  return JSON.stringify(parsed.data)
}

export function resolveSubagentDefinitions(): Promise<string | null> {
  try {
    const rendered = renderSubagentDefinitions(everyKind())
    if (rendered === null) {
      console.error(
        `${LOG} subagent definitions NOT loaded: ${COMPOSE_MODULE} answered no definition at ` +
          `all. ${DELEGATION_OFF}`
      )
    }
    return Promise.resolve(rendered)
  } catch (error) {
    const said = error instanceof Error ? error.message : String(error)
    console.error(
      `${LOG} subagent definitions NOT loaded: ${COMPOSE_MODULE} threw (${said}). ${DELEGATION_OFF}`
    )
    return Promise.resolve(null)
  }
}

export function disallowedToolsForLaunch(
  declared: readonly string[],
  agentsJson: string | null
): readonly string[] {
  if (agentsJson !== null) return declared
  return [...declared, DELEGATION_TOOL]
}
