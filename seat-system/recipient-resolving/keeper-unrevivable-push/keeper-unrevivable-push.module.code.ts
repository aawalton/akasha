import type { NotifyInput } from "../../../alan/harness/notification-feeds/notification-feed-rows/notification-feed-rows.module.code.ts"
import {
  ALAN_PERSON,
  notify,
} from "../../../alan/harness/notification-feeds/notifying/notifying.module.code.ts"
import { writeMessage } from "../../messaging/message-file/message-file.module.code.ts"

const KEEPER_UNREVIVABLE_KIND = "keeper-unrevivable"
const KEEPER_UNREVIVABLE_SOURCE = "supervisor"

export function buildKeeperUnrevivableNotifyInput(name: string, agentId: string): NotifyInput {
  return {
    title: `${name} is down and cannot be woken`,
    body:
      `The recipient-resolver found ${name} (${agentId}) absent with pending inbound work and tried ` +
      "to revive her. The revive did not take — she either never booted or came back without " +
      "advancing past the revive baseline. Nothing has been restarted.",
    kind: KEEPER_UNREVIVABLE_KIND,
    source: KEEPER_UNREVIVABLE_SOURCE,
  }
}

export async function pushKeeperUnrevivableToAlan(name: string, agentId: string): Promise<void> {
  await notify(ALAN_PERSON, buildKeeperUnrevivableNotifyInput(name, agentId))
}

export function buildUnrevivableMessageBody(name: string, agentId: string): string {
  return (
    `\`${name}\` (${agentId}) was absent with inbound work waiting, so the recipient-resolver tried ` +
    "to revive it. The revive did not take — it either never booted or came back without advancing " +
    "past the revive baseline. Nothing has been restarted, and the work that reached it is still waiting."
  )
}

export async function messageUnrevivableToKeeper(
  keeper: string,
  name: string,
  agentId: string
): Promise<undefined> {
  const wrote = await writeMessage({
    to: keeper,
    from: KEEPER_UNREVIVABLE_SOURCE,
    warrant: "announce",
    body: buildUnrevivableMessageBody(name, agentId),
  })
  if (wrote.kind === "refused") {
    throw new Error(
      `nothing is waiting for \`${keeper}\` about ${name} (${agentId}): ${wrote.detail}`
    )
  }
}
