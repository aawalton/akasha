import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const allAboutAlanExperiment = {
  id: "01a0657f-a729-7906-84f8-825c8af36228",
  type: "page-type/page-type",
  slug: "all-about-alan-experiment",
  definition: "a measured trial about Alan",
  extends: ["page-type/page"],
  parts: ["file-property/line-set"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
    { pageProperty: "file-property/line-set", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An experiment has the material the experiment is run with rather than any topic or finding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An experiment finds a topic or a finding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An experiment is kept whether or not the experiment has been run yet.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
