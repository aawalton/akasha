import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuState = {
  id: "01a06275-c449-7718-96d3-f0cd0abfd3ab",
  type: "page-type/module",
  slug: "scrollable-menu-state",
  definition: "the library callback object and the one mutable reference to the context menu",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The library object is a ZO_CallbackObject created at module load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The context menu reference is reached through a getter and a setter.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The reference is undefined until the addon-loaded event fires.",
    },
  ],
} as const satisfies Module
