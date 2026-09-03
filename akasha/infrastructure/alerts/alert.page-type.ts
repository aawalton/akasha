import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Definition } from "../../domain-system/domains/properties/definition.text-property.ts"
import type { PersonSlug } from "../../seat-system/seats/properties/person-slug.relation-property.ts"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { AlertDescription } from "./properties/alert-description.file-property.ts"
import type { AlertDomain } from "./properties/alert-domain.text-property.ts"
import type { AlertSummary } from "./properties/alert-summary.text-property.ts"

export type Alert = Page & {
  title: Title
  definition: Definition
  domain?: AlertDomain
  summary?: AlertSummary
  personSlug?: PersonSlug
  description?: AlertDescription
}

export const alert = {
  id: "01a06755-0778-7804-96f1-949fc3c68e4f",
  pageTypeSlug: "page-type",
  slug: "alert",
  definition: "a condition on the system somebody is told about",
  pluralSlug: "alerts",
  extendsSlug: "page-type/page",
  partSlugs: [
    "file-property/alert-description",
    "text-property/alert-domain",
    "text-property/alert-summary",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "definition", required: true, many: false },
    { pagePropertySlug: "alert-domain", required: false, many: false },
    { pagePropertySlug: "alert-summary", required: false, many: false },
    { pagePropertySlug: "person-slug", required: false, many: false },
    { pagePropertySlug: "alert-description", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An alert says what is wrong rather than what raised it.",
    },
    {
      invariantKind: "departure",
      statement: "What raises an alert is a rule the deployment carries.",
    },
    {
      invariantKind: "departure",
      statement: "An alert names the area answering for it or the person answering for it.",
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
      invariantKind: "gap",
      statement: "No rule this repository deploys raises any alert here.",
    },
  ],
} as const satisfies PageType
