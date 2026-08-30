import type { PersonaSlug } from "../../domain-system/initiative/properties/persona-slug.text-property.ts"
import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { AssignmentSlug } from "./properties/assignment-slug.relation-property.ts"
import type { OnCall } from "./properties/on-call.boolean-property.ts"
import type { PersonSlug } from "./properties/person-slug.text-property.ts"
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
    "boolean-property/send-in-flight",
    "number-property/context-tokens",
    "number-property/cost-usd",
    "number-property/proxy-port",
    "record-property/turn-pending",
    "relation-property/assignment-slug",
    "text-property/claude-code-session-uuid",
    "text-property/model",
    "text-property/person-slug",
    "text-property/proxy-process",
    "text-property/proxy-version",
    "text-property/registration-account",
    "text-property/role-slug",
    "text-property/start-mode",
    "text-property/supervisor-process",
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
    { pagePropertySlug: "model", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "context-tokens", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "cost-usd", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "transcript-path", required: false, many: false, uncommitted: true },
    {
      pagePropertySlug: "claude-code-session-uuid",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "proxy-process", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "proxy-port", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "proxy-version", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "supervisor-process", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "turn-pending", required: false, many: false, uncommitted: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's attributes can be re-stated without making it another seat.",
    },
    {
      invariantKind: "departure",
      statement: "What is observed of a seat is declared here and stands beside the page.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "Four of what a seat states are text because roles, persons, accounts and start modes do not stand as pages.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The ten observed values declared here are the ten anything writes, and seventeen more go unwritten.",
    },
  ],
} as const satisfies PageType
