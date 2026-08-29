import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Condition } from "./properties/condition.page-property-type.ts"
import type { ConditionalReadingSlugs } from "./properties/conditional-reading-slugs.page-property-type.ts"
import type { Definition } from "./properties/definition.page-property-type.ts"
import type { Design } from "./properties/design.page-property-type.ts"
import type { Intent } from "./properties/intent.page-property-type.ts"
import type { PartSlugs } from "./properties/part-slugs.page-property-type.ts"
import type { Principle } from "./properties/principle.page-property-type.ts"
import type { RequiredReadingSlugs } from "./properties/required-reading-slugs.page-property-type.ts"
import type { Rule } from "./properties/rule.page-property-type.ts"

export type Domain = Page & {
  definition: Definition
  partSlugs?: PartSlugs
  requiredReadingSlugs?: RequiredReadingSlugs
  conditionalReadingSlugs?: ConditionalReadingSlugs
  design?: Design
  condition?: Condition
  intent?: Intent
  principle?: Principle
  rule?: Rule
}

export const domain = {
  id: "01a049c8-3ead-7c52-9ab6-88767954ed5f",
  pageTypeSlug: "page-type",
  slug: "domain",
  definition: "a bounded area of concern",
  extendsSlug: "page",
  design: [
    "What makes a page a domain is its page type, never the folder it sits in.",
    "Everything a domain carries could matter to every domain beneath it.",
    "A domain is never weighed against how many domains there are.",
    "A slug and a definition is a whole domain, not a stub waiting to be filled in.",
    "A domain stays even when nothing needs it any more. It goes only when it no longer fits the structure.",
  ],
  intent: ["An agent writes a domain's lines as well as Alan would."],
  rule: [
    {
      name: "Every Line Before It Lands",
      act: "Show Ryn a definition, invariant or directive before you land it.",
      warrant: "The writer is the last to see that the first words are wrong.",
      aids: ["You still decide; Ryn only asks.", "A line already landed is late, not excused."],
    },
    {
      name: "Second Draft",
      act: "Write every definition and invariant again, simpler, plainer, clearer, shorter.",
      warrant: "Agents work better when given fewer, plainer words in simpler grammar.",
      aids: [
        "A different claim is not a plainer line.",
        "Shorter is only better when it is not less clear.",
      ],
    },
  ],
} as const satisfies PageType
