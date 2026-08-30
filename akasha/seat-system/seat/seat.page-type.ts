import type { PersonaSlug } from "../../domain-system/initiative/properties/persona-slug.relation-property.ts"
import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { AssignmentSlug } from "./properties/assignment-slug.text-property.ts"
import type { OnCall } from "./properties/on-call.boolean-property.ts"
import type { PersonSlug } from "./properties/person-slug.relation-property.ts"
import type { RegistrationAccount } from "./properties/registration-account.text-property.ts"
import type { RoleSlug } from "./properties/role-slug.text-property.ts"
import type { StartMode } from "./properties/start-mode.text-property.ts"

export type Seat = Page & {
  personaSlug: PersonaSlug
  assignmentSlug: AssignmentSlug
  roleSlug: RoleSlug
  personSlug: PersonSlug
  startMode: StartMode
  onCall: OnCall
  registrationAccount: RegistrationAccount
}

export const seat = {
  id: "01a05035-2609-7463-ba49-ccaf20f5c337",
  pageTypeSlug: "page-type",
  slug: "seat",
  definition: "a place an agent works from",
  pluralSlug: "seats",
  extendsSlug: "page-type/page",
  mortal: true,
  partSlugs: [
    "boolean-property/live-child",
    "boolean-property/on-call",
    "boolean-property/open-question",
    "boolean-property/owed",
    "boolean-property/running-task",
    "boolean-property/send-in-flight",
    "instant-property/context-replaced-at",
    "instant-property/restart-armed-at",
    "number-property/context-tokens",
    "number-property/proxy-port",
    "process-property/proxy-process",
    "process-property/supervisor-process",
    "record-property/proxy",
    "record-property/request",
    "record-property/turn-pending",
    "relation-property/person-slug",
    "text-property/assignment-slug",
    "text-property/claude-code-session-uuid",
    "text-property/deferred-restart-notice",
    "text-property/interrupt-message",
    "text-property/model",
    "text-property/proxy-version",
    "text-property/registration-account",
    "text-property/requested-action",
    "text-property/rotated-session-uuid",
    "text-property/start-mode",
    "text-property/transcript-path",
  ],
  properties: [
    { pagePropertySlug: "persona-slug", required: true, many: false },
    { pagePropertySlug: "assignment-slug", required: true, many: false },
    { pagePropertySlug: "role-slug", required: true, many: false },
    { pagePropertySlug: "person-slug", required: true, many: false },
    { pagePropertySlug: "start-mode", required: true, many: false },
    { pagePropertySlug: "on-call", required: true, many: false },
    { pagePropertySlug: "registration-account", required: true, many: false },
    {
      pagePropertySlug: "claude-code-session-uuid",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "transcript-path", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "supervisor-process", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "proxy", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "model", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "context-tokens", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "turn-pending", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "request", required: false, many: false, uncommitted: true },
    {
      pagePropertySlug: "context-replaced-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pagePropertySlug: "rotated-session-uuid",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pagePropertySlug: "deferred-restart-notice",
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
      statement:
        "A persona holds more than one seat, so a seat is not reached by naming a persona.",
    },
  ],
} as const satisfies PageType
