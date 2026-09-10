import { join } from "node:path"
import { SUBAGENT_MARK } from "../reading/reading.module.code.ts"

export function counted(many: number, one: string): string {
  return `${many} ${one}${many === 1 ? "" : "s"}`
}

const PRESENCE_AT = "seat-system/subagents/presence/subagent-presence.module.code.ts"

const PUTTING_UP = "write"

export function puttingUpSaid(root: string, agentId: string | null): string {
  const mark = agentId === null ? -1 : agentId.indexOf(SUBAGENT_MARK)
  const held =
    agentId === null || mark <= 0
      ? "<the seat> <the id the subagent runs under> <the kind it was dispatched as> <the seat's id>"
      : `<the seat> ${agentId.slice(mark + SUBAGENT_MARK.length)}` +
        ` <the kind it was dispatched as> ${agentId.slice(0, mark)}`
  return `bun ${join(root, PRESENCE_AT)} ${root} ${PUTTING_UP} ${held}`
}
