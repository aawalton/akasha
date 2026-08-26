import type { Act } from "../checks/check/check-shape.ts"
import { onDisk } from "../checks/run/tree.ts"

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
