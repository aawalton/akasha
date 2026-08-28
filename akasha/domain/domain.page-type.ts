import type { PageType } from "../page/page-type.page-type.ts"
import type { Page } from "../page/page.page-type.ts"
import type { Condition } from "./condition.page-property-type.ts"
import type { Definition } from "./definition.page-property-type.ts"
import type { Design } from "./design.page-property-type.ts"
import type { Intent } from "./intent.page-property-type.ts"
import type { PartSlugs } from "./part-slugs.page-property-type.ts"
import type { Principle } from "./principle.page-property-type.ts"
import type { RequiredReadingSlugs } from "./required-reading-slugs.page-property-type.ts"
import type { Rule } from "./rule.page-property-type.ts"

export type Domain = Page & {
  definition: Definition
  partSlugs?: PartSlugs
  requiredReadingSlugs?: RequiredReadingSlugs
  design?: Design
  condition?: Condition
  intent?: Intent
  principle?: Principle
  rule?: Rule
}

export const domain = {
  id: "01a049c8-3ead-7c52-9ab6-88767954ed5f",
  slug: "domain",
  definition: "a bounded area of concern",
  extendsSlug: "page",
} as const satisfies PageType
