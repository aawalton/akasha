import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { PersonaSlug } from "../../../domain-system/initiatives/properties/persona-slug.relation-property.ts"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"

export type AppearanceExperiment = Page & {
  title: Title
  personaSlug: PersonaSlug
}

export const appearanceExperiment = {
  id: "01a06826-794a-7da2-8027-9f143d989e3d",
  pageTypeSlug: "page-type",
  slug: "appearance-experiment",
  definition: "one thing Alan tried wearing and how it read",
  pluralSlug: "appearance-experiments",
  extendsSlug: "page-type/page",
  partSlugs: ["relation-property/persona-slug", "text-property/title"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "persona-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An experiment is one thing put on rather than a whole day's dress.",
    },
    {
      invariantKind: "departure",
      statement: "An experiment names the persona who read it, not Alan, whose experiment it is.",
    },
    {
      invariantKind: "departure",
      statement:
        "How a try read to her and how it landed on him are kept as two separate readings.",
    },
    {
      invariantKind: "departure",
      statement: "An experiment ends in a verdict of keeping it, tweaking it, or dropping it.",
    },
    {
      invariantKind: "departure",
      statement: "Shaestrel's persona points are counted from these experiments.",
    },
    {
      invariantKind: "gap",
      statement:
        "The day, the verdict, what was tried, the eye read and the felt read are properties this type does not yet declare.",
    },
    {
      invariantKind: "gap",
      statement: "Every experiment Alan has recorded still stands outside akasha.",
    },
  ],
} as const satisfies PageType
