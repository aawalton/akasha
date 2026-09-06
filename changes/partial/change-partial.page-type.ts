import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"

export type ChangePartial = Module

export const changePartial = {
  id: "01a07656-40f5-7e99-b777-dcc9351443fe",
  pageTypeSlug: "page-type",
  slug: "change-partial",
  definition: "a piece of a change that leaves the tree broken on its own",
  pluralSlug: "change-partial",
  partSlugs: ["change-partial/repoint-imports", "change-partial/respell-export"],
  extendsSlug: ["page-type/module"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A partial change runs no change.",
    },
    {
      invariantKind: "departure",
      statement: "A partial change is run by a change rather than reached on its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A partial change is handed the files it works over rather than asking the index for them.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies are answered rather than written, so the change running it lands them as one.",
    },
    {
      invariantKind: "departure",
      statement: "A partial change refuses or answers every body it changes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is reached from the command line.",
    },
  ],
} as const satisfies PageType
