import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogSideFileConfig = {
  id: "01a063ba-94e5-762e-b100-0f913bbdb479",
  type: "module",
  slug: "catalog-side-file-config",
  definition: "what the add-on reads out of the global a side file leaves for it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload of the wrong shape is refused whole rather than read in part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version at or below zero asks for nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absent domain list is read as asking for every domain again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain list holding anything but text refuses the whole payload.",
    },
  ],
} as const satisfies Module
