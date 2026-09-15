import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const computedPropertyModule = {
  id: "01a08202-ae3b-7dad-afcb-d0ad4adc1214",
  type: "page-type/page-type",
  slug: "computed-property-module",
  definition: "a module holding the functions calculations share",
  extends: ["page-type/module"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A function more than one calculation runs sits in a computed-property-module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation reaches such a function by importing that module's code file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That import is resolved while a calculation's text is run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This module's own code imports types and other computed-property-modules and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code that is no calculation imports this module as that code imports any module.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
