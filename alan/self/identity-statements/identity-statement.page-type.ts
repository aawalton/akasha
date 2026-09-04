import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Icon } from "../../../temper/temper-things/properties/icon.text-property.ts"
import type { About } from "./properties/about.select-property.ts"
import type { IdentityStatementLevel } from "./properties/identity-statement-level.number-property.ts"
import type { IdentityStatementRank } from "./properties/identity-statement-rank.select-property.ts"
import type { IdentityStatementStatus } from "./properties/identity-statement-status.select-property.ts"
import type { IdentityStatementTags } from "./properties/identity-statement-tags.text-property.ts"
import type { IdentityStatementValueSlug } from "./properties/identity-statement-value-slug.relation-property.ts"
import type { NotionId } from "./properties/notion-id.text-property.ts"
import type { ParentStatementSlug } from "./properties/parent-statement-slug.relation-property.ts"
import type { ReplacedByStatementSlugs } from "./properties/replaced-by-statement-slugs.relation-property.ts"
import type { ReplacesStatementSlugs } from "./properties/replaces-statement-slugs.relation-property.ts"
import type { SubStatementSlugs } from "./properties/sub-statement-slugs.relation-property.ts"

export type IdentityStatement = Page & {
  title: Title
  about?: About
  identityStatementLevel: IdentityStatementLevel
  notionId: NotionId
  parentStatementSlug?: ParentStatementSlug
  identityStatementRank: IdentityStatementRank
  replacedByStatementSlugs?: readonly ReplacedByStatementSlugs[]
  replacesStatementSlugs?: readonly ReplacesStatementSlugs[]
  identityStatementStatus: IdentityStatementStatus
  subStatementSlugs?: readonly SubStatementSlugs[]
  identityStatementTags?: readonly IdentityStatementTags[]
  identityStatementValueSlug: IdentityStatementValueSlug
  icon: Icon
}

export const identityStatement = {
  id: "01a0658a-739f-7d92-aed5-20be788a960f",
  pageTypeSlug: "page-type",
  slug: "identity-statement",
  definition: "one sentence Alan means to become true of him",
  pluralSlug: "identity-statements",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "number-property/identity-statement-level",
    "relation-property/identity-statement-value-slug",
    "relation-property/parent-statement-slug",
    "relation-property/replaced-by-statement-slugs",
    "relation-property/replaces-statement-slugs",
    "relation-property/sub-statement-slugs",
    "select-property/about",
    "select-property/identity-statement-rank",
    "select-property/identity-statement-status",
    "text-property/identity-statement-tags",
    "text-property/notion-id",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "about", required: false, many: false },
    { pagePropertySlug: "identity-statement-level", required: true, many: false },
    { pagePropertySlug: "notion-id", required: true, many: false },
    { pagePropertySlug: "parent-statement-slug", required: false, many: false },
    { pagePropertySlug: "identity-statement-rank", required: true, many: false },
    { pagePropertySlug: "replaced-by-statement-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "replaces-statement-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "identity-statement-status", required: true, many: false },
    { pagePropertySlug: "sub-statement-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "identity-statement-tags", required: false, many: true, max: null },
    { pagePropertySlug: "identity-statement-value-slug", required: true, many: false },
    { pagePropertySlug: "icon", required: true, many: false },
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
