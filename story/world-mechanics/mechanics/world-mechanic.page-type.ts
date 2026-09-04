import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/pages/properties/title.text-property.ts"
import type { WorldSlug } from "../../stories-played/properties/world-slug.relation-property.ts"
import type { Aliases } from "./properties/aliases.text-property.ts"
import type { EvolvesFromSlugs } from "./properties/evolves-from-slugs.text-property.ts"
import type { EvolvesToSlugs } from "./properties/evolves-to-slugs.text-property.ts"
import type { References } from "./properties/references.page-property-entry.ts"

export type WorldMechanic = Page & {
  title: Title
  worldSlug: WorldSlug
  aliases?: Aliases
  evolvesFromSlugs?: EvolvesFromSlugs
  evolvesToSlugs?: EvolvesToSlugs
  references?: References
}

export const worldMechanic = {
  id: "01a06558-a991-7f75-b03b-962c2df9e390",
  pageTypeSlug: "page-type",
  slug: "world-mechanic",
  definition: "one thing a world does the same way every time",
  pluralSlug: "world-mechanics",
  extendsSlug: "page-type/page",
  runsTabooCheck: false,
  partSlugs: [
    "boolean-property/claimed",
    "boolean-property/effect-claimed",
    "number-property/paragraph",
    "number-property/reference-level",
    "page-property-entry/references",
    "text-property/aliases",
    "text-property/chapter-slug",
    "text-property/claimed-by-slug",
    "text-property/effect-quote",
    "text-property/evolves-from-slugs",
    "text-property/evolves-to-slugs",
    "text-property/from-slug",
    "text-property/holder-quote",
    "text-property/holder-slug",
    "text-property/reference-event",
    "text-property/reference-kind",
    "text-property/to-slug",
    "text-property/wording",
    "domain/ability",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "world-slug", required: true, many: false },
    { pagePropertySlug: "aliases", required: false, many: true, max: null },
    { pagePropertySlug: "evolves-from-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "evolves-to-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "references", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A mechanic belongs to one world.",
    },
    {
      invariantKind: "departure",
      statement: "Which kind of mechanic a thing is settles which page type it is.",
    },
    {
      invariantKind: "departure",
      statement: "A name two kinds carry is two mechanics rather than a single mechanic.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanic is what the story says it is rather than what a rulebook says.",
    },
    {
      invariantKind: "departure",
      statement: "A slug that cannot become an export name carries its kind on the front.",
    },
    {
      invariantKind: "departure",
      statement: "An evolution is a fact about the mechanic rather than one place in the text.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where the text shows an evolution the reference beside the evolution carries that place.",
    },
    {
      invariantKind: "departure",
      statement: "The words a mechanic carries are the story's rather than akasha's own.",
    },
  ],
} as const satisfies PageType
