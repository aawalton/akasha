import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dragHold = {
  id: "01a09093-a35f-7798-8306-75a6528275cb",
  pageTypeSlug: "module",
  type: "module",
  slug: "drag-hold",
  definition: "the row a drag has, written where a render reads it and where a pointer reads it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A drag beginning writes the row's id to the ref and to the state together.",
    },
    {
      invariantKind: "departure",
      statement: "The id a drag names is read off the event as text.",
    },
    {
      invariantKind: "departure",
      statement: "A drag ending clears the ref, the state and the drop target together.",
    },
    {
      invariantKind: "absence",
      statement: "The drop target a caller keeps is handed in rather than named here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the drop target it clears.",
    },
  ],
} as const satisfies Module
