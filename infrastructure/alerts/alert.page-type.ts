import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Definition } from "../../domains/properties/definition.text-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { PersonSlug } from "../../seat-system/seats/properties/person-slug.relation-property.ts"
import type { AlertDescription } from "./properties/alert-description.file-property.ts"
import type { AlertDomain } from "./properties/alert-domain.text-property.ts"
import type { AlertPersonaSlug } from "./properties/alert-persona-slug.relation-property.ts"
import type { AlertRoleSlug } from "./properties/alert-role-slug.text-property.ts"
import type { AlertSummary } from "./properties/alert-summary.text-property.ts"

export type Alert = Page & {
  title: Title
  definition: Definition
  domain?: AlertDomain
  summary?: AlertSummary
  personSlug?: PersonSlug
  description?: AlertDescription
  personaSlug?: AlertPersonaSlug
  roleSlug?: AlertRoleSlug
}

export const alert = {
  id: "01a06755-0778-7804-96f1-949fc3c68e4f",
  pageTypeSlug: "page-type",
  slug: "alert",
  definition: "a condition on the system somebody is told about",
  pluralSlug: "alerts",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "file-property/alert-description",
    "relation-property/alert-persona-slug",
    "text-property/alert-domain",
    "text-property/alert-role-slug",
    "text-property/alert-summary",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "definition", required: true, many: false },
    { pagePropertySlug: "alert-domain", required: false, many: false },
    { pagePropertySlug: "alert-summary", required: false, many: false },
    { pagePropertySlug: "person-slug", required: false, many: false },
    { pagePropertySlug: "alert-description", required: false, many: false },
    { pagePropertySlug: "alert-persona-slug", required: false, many: false },
    { pagePropertySlug: "alert-role-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An alert says what is wrong rather than what raised the alert.",
    },
    {
      invariantKind: "departure",
      statement: "What raises an alert is a rule the deployment carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "An alert names the area answering for the alert or the person answering for the alert.",
    },
    {
      invariantKind: "departure",
      statement: "An alert's runbook is a page property held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A summary is written as the annotation a firing rule carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "An alert's recipient is resolved on the workstation rather than where the alert fires.",
    },
    {
      invariantKind: "departure",
      statement:
        "Alert words reach the code composing the rules through a page query rather than a file read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A composer that cannot reach the words stops rather than composing an alert without them.",
    },
    {
      invariantKind: "departure",
      statement: "A recovery arrives as its own alert.",
    },
    {
      invariantKind: "absence",
      statement: "A firing site sends no message.",
    },
    {
      invariantKind: "upkeep",
      statement: "An alert that fires is acted on or repaired.",
    },
    {
      invariantKind: "gap",
      statement: "No rule this repository deploys raises any alert here.",
    },
    {
      invariantKind: "gap",
      statement: "Every alert reaches whoever answers for the condition the alert names.",
    },
    {
      invariantKind: "gap",
      statement: "A firing site names its condition and nothing about who is told.",
    },
    {
      invariantKind: "gap",
      statement: "A firing site records `alert.condition.fired` or `alert.condition.cleared`.",
    },
    {
      invariantKind: "gap",
      statement: "An alert event carries its condition slug in `reference_id`.",
    },
    {
      invariantKind: "gap",
      statement: "An alert is matched from the event stream by the condition the alert names.",
    },
  ],
} as const satisfies PageType
