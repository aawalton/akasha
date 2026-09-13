import {
  type LogicalModel,
  parseModel,
} from "akasha/agents/models/modules/vocab/model-vocab.module.code.ts"
import { writerIn } from "akasha/agents/modules/read-record/read-record.module.code.ts"
import { akashaBesideOf } from "akasha/agents/seats/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { seatAbove } from "akasha/agents/subagents/modules/naming/subagent-naming.module.code.ts"

export const CO_AUTHORED = "Co-Authored-By"

export const SESSION = "Claude-Session"

export const SESSION_NAMED = "CLAUDE_CODE_BRIDGE_SESSION_ID"

const CO_AUTHOR_AT = "noreply@anthropic.com"

const SESSION_UNDER = "https://claude.ai/code/"

const ANY_MODEL = "Claude"

const EXTENDED_SAID = " (1M context)"

const NAMED: Readonly<Record<LogicalModel, string>> = {
  fable: "Claude Fable 5",
  opus: "Claude Opus 5",
  sonnet: "Claude Sonnet 5",
  haiku: "Claude Haiku 4.5",
}

const MODEL = "model"

export type Attribution = {
  readonly model: string | null
  readonly session: string | null
}

export function modelNamed(model: string | null): string {
  if (model === null) return ANY_MODEL
  const spec = parseModel(model)
  if (spec === null) return ANY_MODEL
  return `${NAMED[spec.logical]}${spec.extended ? EXTENDED_SAID : ""}`
}

export function attributionLines(held: Attribution): readonly string[] {
  const lines = [`${CO_AUTHORED}: ${modelNamed(held.model)} <${CO_AUTHOR_AT}>`]
  if (held.session !== null && held.session !== "") {
    lines.push(`${SESSION}: ${SESSION_UNDER}${held.session}`)
  }
  return lines
}

const TRAILING = /\s+$/

const TRAILER = /^[A-Za-z][A-Za-z0-9-]*:\s/

function keyOf(line: string): string {
  return line.slice(0, line.indexOf(":")).toLowerCase()
}

function keyIn(line: string): string | null {
  const said = line.trim()
  return TRAILER.test(said) ? keyOf(said) : null
}

export function attributed(message: string, held: Attribution): string {
  const body = message.replace(TRAILING, "")
  const lines = body.split("\n")
  const keys = new Set(lines.map(keyIn))
  const left = attributionLines(held).filter((one) => !keys.has(keyOf(one)))
  if (left.length === 0) return message
  const said = left.join("\n")
  if (body === "") return said
  const last = lines[lines.length - 1] ?? ""
  return `${body}${keyIn(last) === null ? "\n\n" : "\n"}${said}`
}

function besideOf(agent: string): Record<string, unknown> | null {
  const own = akashaBesideOf(agent)
  if (own !== null) return own
  const above = seatAbove(agent)
  return above === null ? null : akashaBesideOf(above)
}

function modelIn(env: Readonly<Record<string, string | undefined>>): string | null {
  try {
    const agent = writerIn(env)
    if (agent === null) return null
    const held = besideOf(agent)?.[MODEL]
    return typeof held === "string" && held !== "" ? held : null
  } catch {
    return null
  }
}

export function attributionHeld(
  env: Readonly<Record<string, string | undefined>> = process.env
): Attribution {
  const session = env[SESSION_NAMED]
  return { model: modelIn(env), session: session === undefined || session === "" ? null : session }
}
