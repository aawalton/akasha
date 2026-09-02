import type { Module } from "@akasha/code-system/module"

export const scrollableMenuLibState = {
  id: "01a06275-c449-7718-96d3-f0cd0abfd3ab",
  pageTypeSlug: "module",
  slug: "scrollable-menu-lib-state",
  definition: "the library callback object and the one mutable reference to the context menu",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The library object is a ZO_CallbackObject created at module load.",
    },
    {
      invariantKind: "departure",
      statement: "The context menu reference is reached through a getter and a setter.",
    },
    {
      invariantKind: "constraint",
      statement: "The reference is undefined until the addon-loaded event fires.",
    },
  ],
} as const satisfies Module
