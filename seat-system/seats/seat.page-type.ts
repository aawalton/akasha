import type { PageType } from "@akasha/pages-system/page-type"
import type { Agent } from "../../agents/agent.page-type.ts"
import type { ClaudeCodeSessionUuid } from "./properties/claude-code-session-uuid.text-property.ts"
import type { ContextReplaced } from "./properties/context-replaced.record-property.ts"
import type { ContextTokens } from "./properties/context-tokens.number-property.ts"
import type { Model } from "./properties/model.text-property.ts"
import type { OnCall } from "./properties/on-call.boolean-property.ts"
import type { PersonSlug } from "./properties/person-slug.relation-property.ts"
import type { Proxy as SeatProxy } from "./properties/proxy.record-property.ts"
import type { ReExecAsk } from "./properties/re-exec-ask.text-property.ts"
import type { RegistrationAccount } from "./properties/registration-account.text-property.ts"
import type { Request } from "./properties/request.record-property.ts"
import type { RoleSlug } from "./properties/role-slug.relation-property.ts"
import type { RotatedSessionUuid } from "./properties/rotated-session-uuid.text-property.ts"
import type { SeatPersonaSlug } from "./properties/seat-persona-slug.relation-property.ts"
import type { StartMode } from "./properties/start-mode.text-property.ts"
import type { SupervisorProcess } from "./properties/supervisor-process.process-property.ts"
import type { TranscriptPath } from "./properties/transcript-path.text-property.ts"
import type { TurnPending } from "./properties/turn-pending.record-property.ts"
import type { TurnWorking } from "./properties/turn-working.record-property.ts"

export type Seat = Agent & {
  personaSlug: SeatPersonaSlug
  roleSlug: RoleSlug
  personSlug?: PersonSlug
  startMode: StartMode
  onCall: OnCall
  registrationAccount: RegistrationAccount
  claudeCodeSessionUuid?: ClaudeCodeSessionUuid
  turnWorking?: TurnWorking
  transcriptPath?: TranscriptPath
  supervisorProcess?: SupervisorProcess
  proxy?: SeatProxy
  model?: Model
  contextTokens?: ContextTokens
  turnPending?: TurnPending
  request?: Request
  contextReplaced?: ContextReplaced
  reExecAsk?: ReExecAsk
  rotatedSessionUuid?: RotatedSessionUuid
}

export const seat = {
  id: "01a05035-2609-7463-ba49-ccaf20f5c337",
  pageTypeSlug: "page-type",
  slug: "seat",
  definition: "a place an agent works from",
  pluralSlug: "seats",
  extendsSlug: ["page-type/agent"],
  mortal: true,
  partSlugs: [
    "boolean-property/active-turn",
    "boolean-property/compacting",
    "boolean-property/live-shell",
    "boolean-property/live-subagent",
    "boolean-property/on-call",
    "boolean-property/send-in-flight",
    "instant-property/context-replaced-at",
    "instant-property/restart-armed-at",
    "number-property/context-tokens",
    "number-property/proxy-port",
    "number-property/scanned-to",
    "process-property/proxy-process",
    "process-property/supervisor-process",
    "record-property/context-replaced",
    "record-property/proxy",
    "record-property/request",
    "record-property/turn-pending",
    "record-property/turn-working",
    "relation-property/person-slug",
    "relation-property/requested-action",
    "relation-property/role-slug",
    "relation-property/seat-persona-slug",
    "text-property/claude-code-session-uuid",
    "text-property/context-replaced-source",
    "text-property/interrupt-message",
    "text-property/model",
    "text-property/proxy-version",
    "text-property/re-exec-ask",
    "text-property/registration-account",
    "text-property/rotated-session-uuid",
    "text-property/start-mode",
    "text-property/transcript-path",
  ],
  properties: [
    { pagePropertySlug: "seat-persona-slug", required: true, many: false, default: "claude" },
    { pagePropertySlug: "role-slug", required: true, many: false, default: "worker" },
    { pagePropertySlug: "person-slug", required: false, many: false },
    { pagePropertySlug: "start-mode", required: true, many: false },
    { pagePropertySlug: "on-call", required: true, many: false },
    { pagePropertySlug: "registration-account", required: true, many: false },
    { pagePropertySlug: "transcript-path", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "claude-code-session-uuid", required: false, many: false },
    { pagePropertySlug: "supervisor-process", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "proxy", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "model", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "context-tokens", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "turn-pending", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "turn-working", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "request", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "context-replaced", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "re-exec-ask", required: false, many: false, uncommitted: true },
    {
      pagePropertySlug: "rotated-session-uuid",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's attributes can be re-stated without making it another seat.",
    },
    {
      invariantKind: "departure",
      statement: "A persona holds more than one seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat states the person who opened it or the seat that spawned it rather than both.",
    },
  ],
} as const satisfies PageType
