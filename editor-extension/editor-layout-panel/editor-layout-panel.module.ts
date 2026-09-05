import type { Module } from "../../code-system/modules/module.page-type.ts"

export const editorLayoutPanel = {
  id: "01a06816-69fa-7002-9dd6-1f0b942d72c6",
  pageTypeSlug: "module",
  slug: "editor-layout-panel",
  definition: "the groups, tabs and seats this window holds, read after each change settles",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change to the tabs, the groups or the terminals is read after a pause.",
    },
    {
      invariantKind: "departure",
      statement: "A pause restarted by a second change replaces the first.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal tab names the seat standing in it and the process running in it.",
    },
    {
      invariantKind: "departure",
      statement: "A tab that is no terminal is named by its kind and its uri.",
    },
    {
      invariantKind: "departure",
      statement: "A tab kind that is none of the known ones is named as other.",
    },
    {
      invariantKind: "departure",
      statement: "The active group and the active tab are named.",
    },
    {
      invariantKind: "departure",
      statement: "A read of the terminals is recorded as a sweep.",
    },
    {
      invariantKind: "departure",
      statement: "A window whose ps snapshot is empty is read with no seat named.",
    },
    {
      invariantKind: "departure",
      statement: "What is read goes to the observation store rather than to a page or a file.",
    },
  ],
} as const satisfies Module
