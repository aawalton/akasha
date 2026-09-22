import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsCoreLoadSets = {
  id: "01a061fc-ceec-7554-91c4-46ddf7db919c",
  type: "page-type/module",
  slug: "lib-sets-core-load-sets",
  definition: "building every lookup table the library answers from, in one sweep of the set data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A load is refused while another load is already running.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every lookup table built here is emptied and rebuilt from scratch on each load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The type tables are named by strings carried in the set type data.",
    },
  ],
} as const satisfies Module
