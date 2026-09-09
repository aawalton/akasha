import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Definition } from "../../domains/properties/definition.standard-agent-english-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Person } from "../../seat-system/seats/properties/person.relation-property.ts"
import type { AlertDomain } from "./properties/alert-domain.text-property.ts"
import type { AlertPersona } from "./properties/alert-persona.relation-property.ts"
import type { AlertRoleSlug } from "./properties/alert-role-slug.text-property.ts"
import type { AlertRunbook } from "./properties/alert-runbook.file-property.ts"
import type { AlertSummary } from "./properties/alert-summary.text-property.ts"

export type Alert = Page & {
  title: Title
  definition: Definition
  domain?: AlertDomain
  summary?: AlertSummary
  person?: Person
  runbook?: AlertRunbook
  persona?: AlertPersona
  roleSlug?: AlertRoleSlug
}

export const alert = {
  id: "01a06755-0778-7804-96f1-949fc3c68e4f",
  pageTypeSlug: "page-type",
  slug: "alert",
  definition: "a condition on the system somebody is told about",
  pluralSlug: "alerts",
  extends: ["page-type/page"],
  parts: [
    "file-property/alert-runbook",
    "relation-property/alert-persona",
    "text-property/alert-domain",
    "text-property/alert-role-slug",
    "text-property/alert-summary",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "standard-agent-english-property/definition", required: true, many: false },
    { pagePropertySlug: "text-property/alert-domain", required: false, many: false },
    { pagePropertySlug: "text-property/alert-summary", required: false, many: false },
    { pagePropertySlug: "relation-property/person", required: false, many: false },
    { pagePropertySlug: "file-property/alert-runbook", required: false, many: false },
    { pagePropertySlug: "relation-property/alert-persona", required: false, many: false },
    { pagePropertySlug: "text-property/alert-role-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An alert says the condition rather than the rule that raised the alert.",
    },
    {
      invariantKind: "departure",
      statement: "A rule the deployment has raises an alert.",
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
        "A composer that cannot reach the words stops rather than composing an alert without those words.",
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
      statement:
        "Every alert reaches the person or area answering for the condition the alert names.",
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
      statement: "An alert event has its condition slug in `reference_id`.",
    },
    {
      invariantKind: "gap",
      statement: "An alert is matched from the event stream by the condition the alert names.",
    },
  ],
} as const satisfies PageType
