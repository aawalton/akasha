import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  eventsIn,
  type Valued,
} from "akasha/agents/hooks/hook-dispatch/hook-dispatch.module.code.ts"
import { linkFor, linksMade } from "akasha/agents/hooks/hook-links/hook-links.module.code.ts"
import { indexNamed, valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const PAGE_TYPE = "agent-hook"

const ENDING = ".ts"

const CODE = ".code.ts"

const TIMEOUT = 15

const BUN = "$HOME/.bun/bin/bun"

export interface HookCommand {
  readonly type: "command"
  readonly command: string
  readonly timeout: number
}

export interface HookRegistration {
  readonly matcher: string
  readonly hooks: readonly HookCommand[]
}

export function commandFor(event: string): string {
  return `${BUN} ${linkFor(event)}`
}

function runnableIn(root: string, listed: readonly Valued[]): undefined {
  for (const one of listed) {
    const slug = String(one.value["slug"])
    if (!Array.isArray(one.value["runsAt"]) || one.value["runsAt"].length === 0) {
      throw new Error(`\`${slug}\` is an agent hook and names no event it runs at`)
    }
    if (!one.path.endsWith(ENDING)) {
      throw new Error(`\`${slug}\` is an agent hook and its page is not named \`${ENDING}\``)
    }
    const codePath = `${one.path.slice(0, -ENDING.length)}${CODE}`
    if (!existsSync(join(root, codePath))) {
      throw new Error(`\`${slug}\` is an agent hook and ${codePath} is not there to run`)
    }
  }
  return undefined
}

export function hooksFrom(root: string): Record<string, HookRegistration[]> {
  const listed = valuesOfType(root, PAGE_TYPE) as readonly Valued[]
  if (listed.length === 0) {
    throw new Error(
      `\`${indexNamed()}\` names no \`${PAGE_TYPE}\`, so nothing would guard any tool call and a ` +
        "clean launch would mean nothing"
    )
  }
  runnableIn(root, listed)
  const events = eventsIn(listed)
  linksMade(root, events)
  const found: Record<string, HookRegistration[]> = {}
  for (const event of events) {
    const command: HookCommand = { type: "command", command: commandFor(event), timeout: TIMEOUT }
    found[event] = [{ matcher: "", hooks: [command] }]
  }
  return found
}

export function hooksMerged(
  stated: unknown,
  derived: Record<string, HookRegistration[]>
): Record<string, unknown> {
  const held: Record<string, unknown> =
    stated !== null && typeof stated === "object" && !Array.isArray(stated)
      ? { ...(stated as Record<string, unknown>) }
      : {}
  for (const [event, registrations] of Object.entries(derived)) {
    const already = held[event]
    held[event] = Array.isArray(already) ? [...already, ...registrations] : [...registrations]
  }
  return held
}
