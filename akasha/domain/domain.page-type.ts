import type { PageType } from "../page/page-type.page-type.ts"
import type { Page } from "../page/page.page-type.ts"
import type { Condition } from "./condition.page-property-type.ts"
import type { Design } from "./design.page-property-type.ts"
import type { DomainParentSlug } from "./domain-parent-slug.page-property-type.ts"
import type { Intent } from "./intent.page-property-type.ts"
import type { Principles } from "./principles.page-property-type.ts"
import type { RequiredReadingSlugs } from "./required-reading-slugs.page-property-type.ts"
import type { Rules } from "./rules.page-property-type.ts"
import type { SequenceSlugs } from "./sequence-slugs.page-property-type.ts"
import type { Settled } from "./settled.page-property-type.ts"

export type Domain = Page & {
  domainParentSlug: DomainParentSlug
  sequenceSlugs: SequenceSlugs
  requiredReadingSlugs: RequiredReadingSlugs
  settled: Settled
  design: Design
  condition: Condition
  intent: Intent
  principles: Principles
  rules: Rules
}

export const domain = {
  id: "01a049c8-3ead-7c52-9ab6-88767954ed5f",
  slug: "domain",
  definition: "a bounded area of concern",
  extendsSlug: "page",
} as const satisfies PageType
