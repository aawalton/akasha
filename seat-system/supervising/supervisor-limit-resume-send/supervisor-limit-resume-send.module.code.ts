import { unclaimedTo, writeMessage } from "../../messaging/message-file/message-file.module.code.ts"
import { composedNameOf } from "../../seat-rename/seat-rename.module.code.ts"

const SENDER = "supervisor"

function sentAtMsOf(id: string): number {
  const ms = Number.parseInt(id.replace(/-/g, "").slice(0, 12), 16)
  return Number.isFinite(ms) ? ms : 0
}

export function hasRecentInboundMessage(
  targetAgentId: string,
  content: string,
  sinceMs: number
): Promise<boolean> {
  const seatName = composedNameOf(targetAgentId)
  if (seatName === null) return Promise.resolve(false)
  const floor = Date.now() - sinceMs
  return Promise.resolve(
    unclaimedTo(seatName).some(
      (one) => one.body.trim() === content.trim() && sentAtMsOf(one.id) > floor
    )
  )
}

export async function sendMessage(input: {
  readonly targetAgentId: string
  readonly userId: string
  readonly content: string
  readonly source: string
  readonly warrant: { readonly kind: string }
}): Promise<void> {
  const seatName = composedNameOf(input.targetAgentId)
  if (seatName === null) {
    throw new Error(
      `no seat page holds ${input.targetAgentId}, so there is no name to address this message to — ` +
        "refused rather than written where nobody drains it"
    )
  }
  const wrote = await writeMessage({
    to: seatName,
    from: SENDER,
    warrant: input.warrant.kind === "blocked" ? "blocked" : "announce",
    body: input.content,
  })
  if (wrote.kind === "refused") {
    throw new Error(
      `the message to \`${seatName}\` was not written, so nothing is waiting: ${wrote.detail}`
    )
  }
  return Promise.resolve()
}

export const USER_SOURCE = "user"

export const SYSTEM_SOURCE = "system"

export const ANNOUNCE = { kind: "announce" } as const
