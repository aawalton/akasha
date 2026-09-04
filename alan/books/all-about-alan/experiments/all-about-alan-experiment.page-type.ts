import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Definition } from "../../../../domains/properties/definition.text-property.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { LineSet } from "./properties/line-set.file-property.ts"

export type AllAboutAlanExperiment = Page & {
  title: Title
  definition: Definition
  lineSet?: LineSet
}

export const allAboutAlanExperiment = {
  id: "01a0657f-a729-7906-84f8-825c8af36228",
  pageTypeSlug: "page-type",
  slug: "all-about-alan-experiment",
  definition: "one measured trial about Alan",
  pluralSlug: "all-about-alan-experiments",
  extendsSlug: ["page-type/page"],
  partSlugs: ["file-property/line-set"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "definition", required: true, many: false },
    { pagePropertySlug: "line-set", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An experiment carries the material the experiment is run with rather than what the experiment found.",
    },
    {
      invariantKind: "departure",
      statement: "What an experiment found is a topic or a finding.",
    },
    {
      invariantKind: "departure",
      statement: "An experiment is kept whether or not the experiment has been run yet.",
    },
  ],
} as const satisfies PageType
