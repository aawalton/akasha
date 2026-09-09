import type { PageType } from "@akasha/pages/page-type"

export const allAboutAlanExperiment = {
  id: "01a0657f-a729-7906-84f8-825c8af36228",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "all-about-alan-experiment",
  definition: "one measured trial about Alan",
  pluralSlug: "all-about-alan-experiments",
  extends: ["page-type/page"],
  parts: ["file-property/line-set"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
    { pageProperty: "file-property/line-set", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An experiment has the material the experiment is run with rather than any topic or finding.",
    },
    {
      invariantKind: "departure",
      statement: "An experiment finds a topic or a finding.",
    },
    {
      invariantKind: "departure",
      statement: "An experiment is kept whether or not the experiment has been run yet.",
    },
  ],
  types: "ts",
} as const satisfies PageType
