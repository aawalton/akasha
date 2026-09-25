import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonPrograms = {
  id: "01a0d8bf-6d99-7c82-8985-693487ba77e6",
  type: "page-type/module",
  slug: "addon-programs",
  definition: "the addons a change reaches and the files each addon's program holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which addons there are is read from the index the change leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon's settings are worked out by `addon-compiler-config` from the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon's program is the files its settings include and every file they import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a file imports is read from the body the change leaves.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No file in a packages folder is in an addon's program here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a compiler.",
    },
  ],
} as const satisfies Module
