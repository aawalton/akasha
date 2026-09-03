import { refuseParentless } from "@tools/lib/refuse-parentless"
import { LOG } from "../supervisor-config/supervisor-config.module.code.ts"

export type RowAgentLaunch = "spawned" | "opened"

const SPAWNED: RowAgentLaunch = "spawned"

export function mintSeatId(): string {
  return Bun.randomUUIDv7()
}

export async function createAgent(
  _account: string,
  launch: RowAgentLaunch,
  parent?: string | null
): Promise<string> {
  const orphaned = refuseParentless(parent ?? null, launch === SPAWNED)
  if (orphaned !== null) throw new Error(`createAgent: ${orphaned}`)
  const id = mintSeatId()
  console.log(`${LOG} Minted seat: ${id}`)
  return id
}
