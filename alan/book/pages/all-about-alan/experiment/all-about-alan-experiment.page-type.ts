import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const allAboutAlanExperiment = {
  id: "01a0657f-a729-7906-84f8-825c8af36228",
  type: "page-type/page-type",
  slug: "all-about-alan-experiment",
  definition: "an experiment that measures something about Alan",
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
  createdAt: "2026-09-03T04:20:59.817Z",
  updatedAt: "2026-10-30T14:56:16.386Z",
} as const satisfies PageType
