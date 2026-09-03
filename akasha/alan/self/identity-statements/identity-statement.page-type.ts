import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { About } from "./properties/about.select-property.ts"
import type { IdentityStatementLevel } from "./properties/identity-statement-level.number-property.ts"
import type { IdentityStatementRank } from "./properties/identity-statement-rank.select-property.ts"
import type { IdentityStatementStatus } from "./properties/identity-statement-status.select-property.ts"
import type { IdentityStatementTags } from "./properties/identity-statement-tags.text-property.ts"
import type { IdentityStatementValueSlug } from "./properties/identity-statement-value-slug.relation-property.ts"
import type { NotionId } from "./properties/notion-id.text-property.ts"
import type { ParentItemId } from "./properties/parent-item-id.text-property.ts"
import type { ReplacedByIds } from "./properties/replaced-by-ids.text-property.ts"
import type { ReplacesIds } from "./properties/replaces-ids.text-property.ts"
import type { SubItemIds } from "./properties/sub-item-ids.text-property.ts"

export type IdentityStatement = Page & {
  title: Title
  about?: About
  identityStatementLevel: IdentityStatementLevel
  notionId: NotionId
  parentItemId?: ParentItemId
  identityStatementRank: IdentityStatementRank
  replacedByIds?: readonly ReplacedByIds[]
  replacesIds?: readonly ReplacesIds[]
  identityStatementStatus: IdentityStatementStatus
  subItemIds?: readonly SubItemIds[]
  identityStatementTags?: readonly IdentityStatementTags[]
  identityStatementValueSlug: IdentityStatementValueSlug
}

export const identityStatement = {
  id: "01a06575-c2b8-7824-af2c-9f0ad80da8e9",
  pageTypeSlug: "page-type",
  slug: "identity-statement",
  definition: "one sentence Alan means to become true of him",
  pluralSlug: "identity-statements",
  extendsSlug: "page-type/page",
  partSlugs: [
    "number-property/identity-statement-level",
    "relation-property/identity-statement-value-slug",
    "select-property/about",
    "select-property/identity-statement-rank",
    "select-property/identity-statement-status",
    "text-property/identity-statement-tags",
    "text-property/notion-id",
    "text-property/parent-item-id",
    "text-property/replaced-by-ids",
    "text-property/replaces-ids",
    "text-property/sub-item-ids",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "about", required: false, many: false },
    { pagePropertySlug: "identity-statement-level", required: true, many: false },
    { pagePropertySlug: "notion-id", required: true, many: false },
    { pagePropertySlug: "parent-item-id", required: false, many: false },
    { pagePropertySlug: "identity-statement-rank", required: true, many: false },
    { pagePropertySlug: "replaced-by-ids", required: false, many: true, max: null },
    { pagePropertySlug: "replaces-ids", required: false, many: true, max: null },
    { pagePropertySlug: "identity-statement-status", required: true, many: false },
    { pagePropertySlug: "sub-item-ids", required: false, many: true, max: null },
    { pagePropertySlug: "identity-statement-tags", required: false, many: true, max: null },
    { pagePropertySlug: "identity-statement-value-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A statement stands at a rank saying how hard it is to hold and a level saying how far along it is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A statement that supersedes another names it, and the superseded one names it back.",
    },
  ],
} as const satisfies PageType
