import type { Act } from "./check-shape.ts"
import { onDisk } from "./tree.ts"

const SUBAGENT_MARK = "--"

function said(name: string): string {
  return (process.env[name] ?? "").trim()
}

export function writerId(): string | null {
  const seat = said("AGENT_ID") !== "" ? said("AGENT_ID") : said("CLAUDE_CODE_SESSION_ID")
  if (seat === "") return null
  const acting = said("ACTING_AGENT_ID")
  return acting.startsWith(`${seat}${SUBAGENT_MARK}`) ? acting : seat
}

export function actOn(root: string, writer: string | null): Act {
  return { writer, before: onDisk(root) }
}
