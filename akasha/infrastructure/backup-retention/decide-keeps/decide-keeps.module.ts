import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const decideKeeps = {
  id: "01a06863-74e3-7737-8f36-29465597211c",
  pageTypeSlug: "module",
  slug: "decide-keeps",
  definition: "what each backup's keep marking is to become",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A period's anchor is the earliest completed backup that period holds.",
    },
    {
      invariantKind: "departure",
      statement: "The period a run falls in has no anchor until that period is over.",
    },
    {
      invariantKind: "departure",
      statement: "A backup outside every keep window has its marking released.",
    },
    {
      invariantKind: "departure",
      statement: "A finished period holding no backup is reported rather than skipped.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here touches the backup store.",
    },
  ],
} as const satisfies Module
