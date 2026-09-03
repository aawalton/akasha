import { shape } from "@tools/lib/shape"
import type { Shape } from "@tools/lib/shape-core"
import { handlerSeatName } from "../compose-seat-name/compose-seat-name.module.code.ts"
import type {
  CommsRule,
  OnDemandAgentSpec,
  StateAuthorityKind,
} from "../recipient-resolving/seat-wake-rules/seat-wake-rules.module.code.ts"

export const AGENT_SENDER_PREFIX = "agent:"

export const PAGE_CHAT_SOURCE = "page-chat"

export const QUESTION_ANSWER_SOURCE = "question-answer"

export const QUESTION_DISMISS_SOURCE = "question-dismiss"

export const SMS_SOURCE_PREFIX = "sms:"

export function smsWakeSource(handlerSeat: string): string {
  return `${SMS_SOURCE_PREFIX}${handlerSeat}`
}

export const STATE_AUTHORITY_KINDS = [
  "pages-rows",
  "bound-worktree",
  "game-state-rows",
] as const satisfies readonly StateAuthorityKind[]

const KEBAB_HANDLE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const SLASH_SKILL_TOKEN = /^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\s|$)/

export function constrainsOnSomething(rule: CommsRule): boolean {
  return rule.senderMatch.length > 0 || (rule.contentRegex ?? "").length > 0
}

const stringOrUndefined = shape
  .unknown()
  .refine((value) => value === undefined || typeof value === "string", {
    message: "Invalid input",
  }) as unknown as Shape<string | undefined>

export const commsRuleSchema = shape
  .object({
    id: shape.string(),
    senderMatch: shape.string(),
    contentRegex: stringOrUndefined,
    target: shape.string(),
    status: shape.enum(["LIVE", "PROPOSED"]),
  })
  .strict()

const stateAuthoritySchema = shape
  .object({ kind: shape.enum(STATE_AUTHORITY_KINDS), detail: shape.string().min(1) })
  .strict()

const resumePolicySchema = shape.discriminatedUnion("kind", [
  shape.object({ kind: shape.literal("fresh") }).strict(),
  shape
    .object({
      kind: shape.literal("resume-under-budget"),
      tokenThreshold: shape.number().int().positive(),
    })
    .strict(),
])

function atLeastOne<T>(element: Shape<T>): Shape<T[]> {
  return shape.array(element).refine((items) => items.length >= 1, {
    message: "Too small: expected array to have >=1 items",
  })
}

export const onDemandAgentSpecSchema = shape
  .object({
    name: shape.string().regex(KEBAB_HANDLE),
    wakeSources: atLeastOne(commsRuleSchema).refine(
      (rules) => rules.every((rule) => constrainsOnSomething(rule as CommsRule)),
      {
        message:
          "every wakeSource must constrain on a non-empty senderMatch or a non-empty contentRegex; a rule constraining on neither matches every inbound message",
      }
    ),
    stateAuthority: atLeastOne(stateAuthoritySchema),
    resumePolicy: resumePolicySchema,
    owner: shape.string().min(1),
    bootPrompt: shape.string().regex(SLASH_SKILL_TOKEN).optional(),
  })
  .strict()

const STANDING_PERSONA_TOKEN_THRESHOLD = 150_000

export const PERSON_HANDLER_TOKEN_THRESHOLD = 150_000

export const PERSON_HANDLER_IDLE_MS = 15 * 60 * 1000

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
      {
        id: `${name}-question-answer`,
        senderMatch: QUESTION_ANSWER_SOURCE,
        contentRegex: undefined,
        target: name,
        status: "LIVE",
      },
      {
        id: `${name}-question-dismiss`,
        senderMatch: QUESTION_DISMISS_SOURCE,
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

export interface PersonHandlerSpecOptions {
  readonly owner?: string
  readonly stateAuthorityDetail?: string
}

export function personHandlerWakeSources(handlerSeat: string): readonly CommsRule[] {
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
