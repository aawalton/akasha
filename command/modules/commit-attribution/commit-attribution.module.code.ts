import { parseModel, toWireId } from "akasha/agent/model/modules/vocab/model-vocab.module.code.ts"
import { writerIn } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { akashaBesideOf } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { seatAbove } from "akasha/agent/subagent/modules/naming/subagent-naming.module.code.ts"

const CO_AUTHORED = "Co-Authored-By"

const SESSION = "Claude-Session"

export const SESSION_NAMED = "CLAUDE_CODE_BRIDGE_SESSION_ID"

const CO_AUTHOR_AT = "noreply@anthropic.com"

const SESSION_UNDER = "https://claude.ai/code/"

const ANY_MODEL = "Claude"

const EXTENDED_SAID = " (1M context)"

const NUMBERED = /^[0-9]+$/

const MODEL = "model"

export type Attribution = {
  readonly model: string | null
  readonly session: string | null
}

function titledAs(wire: string): string {
  const words: string[] = []
  const numbers: string[] = []
  for (const part of wire.split("-")) {
    if (NUMBERED.test(part)) numbers.push(part)
    else words.push(part.charAt(0).toUpperCase() + part.slice(1))
  }
  if (numbers.length > 0) words.push(numbers.join("."))
  return words.join(" ")
}

export function modelNamed(model: string | null): string {
  const spec = model === null ? null : parseModel(model)
  if (spec === null) return ANY_MODEL
  return `${titledAs(toWireId(spec.logical))}${spec.extended ? EXTENDED_SAID : ""}`
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

function blockAt(lines: readonly string[]): number {
  for (let at = lines.length - 1; at >= 0; at -= 1) {
    if ((lines[at] ?? "").trim() === "") return at + 1
  }
  return 0
}

function trailersLast(lines: readonly string[]): boolean {
  const at = blockAt(lines)
  if (at === 0 || at >= lines.length) return false
  return lines.slice(at).every((one) => keyIn(one) !== null)
}

export function attributed(message: string, held: Attribution): string {
  const body = message.replace(TRAILING, "")
  const lines = body.split("\n")
  const keys = new Set(lines.map(keyIn))
  const left = attributionLines(held).filter((one) => !keys.has(keyOf(one)))
  if (left.length === 0) return message
  const said = left.join("\n")
  if (body === "") return said
  return `${body}${trailersLast(lines) ? "\n" : "\n\n"}${said}`
}

function besideAbove(agent: string): Record<string, unknown> | null {
  const above = seatAbove(agent)
  return above === null ? null : akashaBesideOf(above)
}

function modelHeldBy(agent: string): string | null {
  const own = akashaBesideOf(agent) ?? besideAbove(agent)
  const held = own?.[MODEL]
  return typeof held === "string" && held !== "" ? held : null
}

function modelIn(env: Readonly<Record<string, string | undefined>>): string | null {
  try {
    const agent = writerIn(env)
    return agent === null ? null : modelHeldBy(agent)
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
