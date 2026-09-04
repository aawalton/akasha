#!/usr/bin/env bun

import { array, num, object, str } from "../shape/monarch-shape.module.code.ts"

const REPO = `${import.meta.dir}/../../../..`
const EVIDENCE = `${import.meta.dir}/../evidence/monarch-evidence.module.code.ts`
const RELATIVE = "alan/harness/monarch/evidence/monarch-evidence.module.code.ts"

export const ALLOWED_TOOLS = [`Bash(bun ${EVIDENCE}:*)`, `Bash(bun ${RELATIVE}:*)`]

export const EVIDENCE_COMMAND = `bun ${EVIDENCE}`

export interface SeatRun {
  readonly text: string
  readonly costUsd: number
  readonly turns: number
  readonly commands: readonly string[]
  readonly denials: readonly string[]
}

function commandOf(part: Record<string, unknown>): string {
  const input = object(part.input, "tool_use.input")
  const command = input.command
  return typeof command === "string" ? command : JSON.stringify(input)
}

function commandsIn(event: Record<string, unknown>): readonly string[] {
  if (event.type !== "assistant") return []
  const message = object(event.message, "event.message")
  const parts = array(message.content ?? [], "event.message.content")
  return parts
    .map((part) => object(part, "event.message.content[]"))
    .filter((part) => part.type === "tool_use")
    .map(commandOf)
}

function denialsIn(result: Record<string, unknown>): readonly string[] {
  return array(result.permission_denials ?? [], "result.permission_denials").map((row, i) => {
    const held = object(row, `result.permission_denials[${i}]`)
    const input = object(held.tool_input ?? {}, `result.permission_denials[${i}].tool_input`)
    const command = input.command
    return typeof command === "string" ? command : JSON.stringify(input)
  })
}

function reasonIn(out: string): string | null {
  for (const line of out.split("\n").reverse()) {
    if (line.trim() === "") continue
    try {
      const said = object(JSON.parse(line), "stream event").result
      if (typeof said === "string" && said !== "") return said
    } catch {}
  }
  return null
}

function withoutInheritedRouting(env: NodeJS.ProcessEnv): Record<string, string> {
  const held: Record<string, string> = {}
  for (const [key, value] of Object.entries(env)) {
    if (key === "ANTHROPIC_UNIX_SOCKET" || key === "ANTHROPIC_BASE_URL") continue
    if (value !== undefined) held[key] = value
  }
  return held
}

export async function runSeat(prompt: string, model: string, minutes: number): Promise<SeatRun> {
  const child = Bun.spawn(
    [
      "claude",
      "-p",
      "--model",
      model,
      "--output-format",
      "stream-json",
      "--verbose",
      "--allowedTools",
      ALLOWED_TOOLS.join(","),
    ],
    {
      stdin: new TextEncoder().encode(prompt),
      stdout: "pipe",
      stderr: "pipe",
      cwd: REPO,
      env: withoutInheritedRouting(process.env),
    }
  )
  let killed = false
  const cutoff = setTimeout(() => {
    killed = true
    child.kill()
  }, minutes * 60_000)
  const [out, err, code] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ])
  clearTimeout(cutoff)
  if (code !== 0) {
    throw new Error(
      killed
        ? `the reviewing seat was killed at the ${minutes}-minute ceiling this run set on it`
        : `the reviewing seat exited ${code} well inside the ceiling — ${
            reasonIn(out) ?? "and its stream said nothing about why"
          }\n${err.trim()}`
    )
  }
  const commands: string[] = []
  let result: Record<string, unknown> | null = null
  for (const line of out.split("\n")) {
    if (line.trim() === "") continue
    const event = object(JSON.parse(line), "stream event")
    commands.push(...commandsIn(event))
    if (event.type === "result") result = event
  }
  if (result === null) throw new Error("the seat's stream carried no result event")
  return {
    text: str(result.result, "result.result"),
    costUsd: num(result.total_cost_usd, "result.total_cost_usd"),
    turns: num(result.num_turns, "result.num_turns"),
    commands,
    denials: denialsIn(result),
  }
}
