import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"

export type RefactorChange = Module

export const refactorChange = {
  id: "01a07313-92e7-7f50-b481-cb1f53b11ceb",
  pageTypeSlug: "page-type",
  slug: "refactor-change",
  definition: "a change built from atomic changes and other refactor changes",
  pluralSlug: "refactor-changes",
  extendsSlug: ["page-type/module"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A refactor change runs atomic changes and other refactor changes and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A refactor change lands everything it runs or none of it.",
    },
    {
      invariantKind: "departure",
      statement: "A refactor change refuses where any change it runs refuses.",
    },
    {
      invariantKind: "departure",
      statement: "The order the changes it runs are run in is the refactor change's own.",
    },
    {
      invariantKind: "departure",
      statement: "A refactor change no command runs is a refactor change all the same.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is reached from the command line.",
    },
  ],
} as const satisfies PageType
