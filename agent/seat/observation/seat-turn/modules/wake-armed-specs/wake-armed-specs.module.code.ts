import type {
  CommsRule,
  OnDemandAgentSpec,
} from "akasha/agent/message/recipient-resolving/modules/seat-wake-rules/seat-wake-rules.module.code.ts"
import { handlerSeatName } from "akasha/agent/seat/name/modules/compose-seat-name/compose-seat-name.module.code.ts"

export const AGENT_SENDER_PREFIX = "agent:"

const PAGE_CHAT_SOURCE = "page-chat"

const SMS_SOURCE_PREFIX = "sms:"

function smsWakeSource(handlerSeat: string): string {
  return `${SMS_SOURCE_PREFIX}${handlerSeat}`
}

const STANDING_PERSONA_TOKEN_THRESHOLD = 150_000

const PERSON_HANDLER_TOKEN_THRESHOLD = 150_000

export function standingPersonaSpec(
  name: string,
  declaredWakeSources: readonly CommsRule[] = []
): OnDemandAgentSpec {
  return {
    name,
    wakeSources: [
      {
        id: `${name}-agent-ask`,
        senderMatch: AGENT_SENDER_PREFIX,
        contentRegex: undefined,
        target: name,
        status: "LIVE",
      },
      {
        id: `${name}-page-chat`,
        senderMatch: PAGE_CHAT_SOURCE,
        contentRegex: undefined,
        target: name,
        status: "LIVE",
      },
      ...declaredWakeSources,
    ],
    stateAuthority: [
      {
        kind: "pages-rows",
        detail: `${name}'s persona page + her relationship / sphere pages (RLS-owned) — the durable continuity authority, never the transcript`,
      },
    ],
    resumePolicy: { kind: "resume-under-budget", tokenThreshold: STANDING_PERSONA_TOKEN_THRESHOLD },
    owner: "aine",
  }
}

export interface PersonHandlerIdentity {
  readonly persona: string
  readonly slug: string
}

interface PersonHandlerSpecOptions {
  readonly owner?: string
  readonly stateAuthorityDetail?: string
}

function personHandlerWakeSources(handlerSeat: string): readonly CommsRule[] {
  return [
    {
      id: `${handlerSeat}-sms-inbound`,
      senderMatch: smsWakeSource(handlerSeat),
      contentRegex: undefined,
      target: handlerSeat,
      status: "LIVE",
    },
    {
      id: `${handlerSeat}-page-chat`,
      senderMatch: PAGE_CHAT_SOURCE,
      contentRegex: undefined,
      target: handlerSeat,
      status: "LIVE",
    },
  ]
}

export function personHandlerSpec(
  persona: string,
  slug: string,
  root: string,
  options: PersonHandlerSpecOptions = {}
): OnDemandAgentSpec {
  const name = handlerSeatName(slug, root)
  return {
    name,
    wakeSources: personHandlerWakeSources(name),
    stateAuthority: [
      {
        kind: "pages-rows",
        detail:
          options.stateAuthorityDetail ??
          `${slug}'s owned content pages, RLS-owned by their accountUserId`,
      },
    ],
    resumePolicy: { kind: "resume-under-budget", tokenThreshold: PERSON_HANDLER_TOKEN_THRESHOLD },
    owner: options.owner ?? persona,
    bootPrompt: `/handler ${slug}`,
  }
}
