import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Icon } from "../../../temper/things/properties/icon.text-property.ts"
import type { About } from "./properties/about.select-property.ts"
import type { IdentityStatementLevel } from "./properties/identity-statement-level.number-property.ts"
import type { IdentityStatementRank } from "./properties/identity-statement-rank.select-property.ts"
import type { IdentityStatementStatus } from "./properties/identity-statement-status.select-property.ts"
import type { IdentityStatementTags } from "./properties/identity-statement-tags.text-property.ts"
import type { IdentityStatementValue } from "./properties/identity-statement-value.relation-property.ts"
import type { NotionId } from "./properties/notion-id.text-property.ts"
import type { ParentStatement } from "./properties/parent-statement.relation-property.ts"
import type { ReplacedByStatements } from "./properties/replaced-by-statements.relation-property.ts"
import type { ReplacesStatements } from "./properties/replaces-statements.relation-property.ts"
import type { SubStatements } from "./properties/sub-statements.relation-property.ts"

export type IdentityStatement = Page & {
  title: Title
  about?: About
  identityStatementLevel: IdentityStatementLevel
  notionId: NotionId
  parentStatement?: ParentStatement
  identityStatementRank: IdentityStatementRank
  replacedByStatements?: readonly ReplacedByStatements[]
  replacesStatements?: readonly ReplacesStatements[]
  identityStatementStatus: IdentityStatementStatus
  subStatements?: readonly SubStatements[]
  identityStatementTags?: readonly IdentityStatementTags[]
  identityStatementValue: IdentityStatementValue
  icon: Icon
}

export const identityStatement = {
  id: "01a0658a-739f-7d92-aed5-20be788a960f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "identity-statement",
  definition: "one sentence Alan means to become true of him",
  pluralSlug: "identity-statements",
  extends: ["page-type/page"],
  parts: [
    "number-property/identity-statement-level",
    "relation-property/identity-statement-value",
    "relation-property/parent-statement",
    "relation-property/replaced-by-statements",
    "relation-property/replaces-statements",
    "relation-property/sub-statements",
    "select-property/about",
    "select-property/identity-statement-rank",
    "select-property/identity-statement-status",
    "text-property/identity-statement-tags",
    "text-property/notion-id",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/about", required: false, many: false },
    { pageProperty: "number-property/identity-statement-level", required: true, many: false },
    { pageProperty: "text-property/notion-id", required: true, many: false },
    { pageProperty: "relation-property/parent-statement", required: false, many: false },
    { pageProperty: "select-property/identity-statement-rank", required: true, many: false },
    {
      pageProperty: "relation-property/replaced-by-statements",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "relation-property/replaces-statements",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "select-property/identity-statement-status", required: true, many: false },
    {
      pageProperty: "relation-property/sub-statements",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "text-property/identity-statement-tags",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "relation-property/identity-statement-value",
      required: true,
      many: false,
    },
    { pageProperty: "text-property/icon", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A statement sits at a rank saying how hard the statement is to hold and a level saying the progress.",
    },
    {
      invariantKind: "departure",
      statement:
        "A supersession is stated on the superseding statement and on the superseded statement.",
    },
  ],
} as const satisfies PageType
