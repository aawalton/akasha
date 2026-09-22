import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakGlobal = {
  id: "01a06115-1ac8-7d12-a18b-e1aa7e8aafeb",
  type: "page-type/module",
  slug: "tweak-global",
  definition: "the global table opening the interface tweaks to other add-ons",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A key on the global table is spelled as the markup that calls the key spells the key.",
    },
  ],
} as const satisfies Module
