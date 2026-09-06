import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const strengthPoints = {
  id: "01a06972-bccd-7000-a564-0a5d7cba4fc4",
  pageTypeSlug: "module",
  slug: "strength-points",
  definition: "one day's strength volume, counted from its sessions and landed on the day",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run of this file counts the four days ending today.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying no session is counted as nought.",
    },
    {
      invariantKind: "departure",
      statement: "A day that cannot be counted leaves the other days to land.",
    },
    {
      invariantKind: "departure",
      statement: "A day that cannot be counted is named on the error stream with its reason.",
    },
    {
      invariantKind: "departure",
      statement: "A run that landed no day exits 2.",
    },
    {
      invariantKind: "departure",
      statement: "A volume matching the volume the day carries lands no commit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a count is due.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file counts nothing.",
    },
  ],
} as const satisfies Module
