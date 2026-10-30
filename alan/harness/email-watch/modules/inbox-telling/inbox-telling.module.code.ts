import { recordToAgent } from "akasha/agent/message/modules/record/agent-message-record.module.code.ts"
import {
  markTold,
  untoldClaims,
} from "akasha/alan/harness/email-watch/modules/inbox-run/inbox-run.module.code.ts"

type Untold = ReturnType<typeof untoldClaims>[number]

export type Telling = {
  readonly handler: string
  readonly sender: string
  readonly log: (line: string) => undefined
}

function listed(claims: readonly Untold[]): readonly string[] {
  return claims.map(
    (one) => `- ${one.from ?? "(no sender)"} — ${one.subject ?? "(no subject)"} [${one.rule}]`
  )
}

function bodyOf(claims: readonly Untold[]): string {
  const judgments = claims.filter((one) => one.why !== "notify")
  const told = claims.filter((one) => one.why === "notify")
  return [
    `${claims.length} piece(s) of Alan's mail are waiting on you.`,
    ...(judgments.length === 0
      ? []
      : ["", "Claimed by an agent rule, so the acting is yours to judge:", ...listed(judgments)]),
    ...(told.length === 0
      ? []
      : ["", "A rule asked for him to be told about these:", ...listed(told)]),
    "",
    "Each rule's own `# Rule` section says what it asks; the mail is still in the inbox.",
  ].join("\n")
}

function byHandle(
  untold: readonly Untold[],
  handler: string
): ReadonlyMap<string, readonly Untold[]> {
  const grouped = new Map<string, Untold[]>()
  for (const one of untold) {
    const handle = one.handle ?? handler
    const held = grouped.get(handle)
    if (held === undefined) grouped.set(handle, [one])
    else held.push(one)
  }
  return grouped
}

export async function announce(telling: Telling): Promise<void> {
  const { handler, sender, log } = telling
  for (const [handle, claims] of byHandle(untoldClaims(), handler)) {
    let messageId: string
    try {
      messageId = await recordToAgent(handle, bodyOf(claims), log)
    } catch (error) {
      log(`telling ${handle} failed, will try again next pass: ${String(error).slice(0, 200)}`)
      continue
    }
    markTold(claims.map((one) => one.messageId))
    log(`told ${handle} about ${claims.length} piece(s) waiting, from ${sender}, as ${messageId}`)
  }
}
