import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Definition } from "./properties/definition.page-property-type.ts"
import type { Directives } from "./properties/directives.page-property-type.ts"
import type { Invariants } from "./properties/invariants.page-property-type.ts"
import type { PartSlugs } from "./properties/part-slugs.page-property-type.ts"

export type Domain = Page & {
  definition: Definition
  partSlugs?: PartSlugs
  invariants?: Invariants
  directives?: Directives
}

export const domain = {
  id: "01a049c8-3ead-7c52-9ab6-88767954ed5f",
  pageTypeSlug: "page-type",
  slug: "domain",
  definition: "a bounded area of concern",
  extendsSlug: "page-type/page",
  properties: [
    { propertySlug: "page-property-type/definition", required: true, many: false },
    { propertySlug: "page-property-type/part-slugs", required: false, many: true },
    { propertySlug: "page-property-type/invariants", required: false, many: true },
    { propertySlug: "page-property-type/directives", required: false, many: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What makes a page a domain is its page type, never the folder it sits in.",
    },
    {
      invariantKind: "departure",
      statement: "Everything a domain carries could matter to every domain beneath it.",
    },
    {
      invariantKind: "departure",
      statement: "A domain is never weighed against how many domains there are.",
    },
    {
      invariantKind: "departure",
      statement: "A slug and a definition is a whole domain, not a stub waiting to be filled in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A domain stays even when nothing needs it any more. It goes only when it no longer fits the structure.",
    },
    {
      invariantKind: "gap",
      statement: "An agent writes a domain's lines as well as Alan would.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Every Changed Line",
      act: "Show Alan each line you change in a domain's definition, invariants, or directives.",
      warrant: "The first words are almost never the right words. Fresh eyes see new options.",
      aids: [
        "For a mechanical change, show the mechanism.",
        "You can request a release for wide changes.",
      ],
    },
  ],
} as const satisfies PageType
