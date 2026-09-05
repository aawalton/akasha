import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const dataWatching = {
  id: "01a07266-d474-7296-bd8e-10c7667fe6b6",
  pageTypeSlug: "module",
  slug: "data-watching",
  definition: "the loop holding what the editor draws and writing it where the editor reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every picture is worked out once as the service starts.",
    },
    {
      invariantKind: "departure",
      statement: "A picture is worked out again only when a file it is made from changes.",
    },
    {
      invariantKind: "departure",
      statement: "A picture is held in memory between one change and the next.",
    },
    {
      invariantKind: "departure",
      statement: "A file is written under the cooldown its own page states.",
    },
    {
      invariantKind: "departure",
      statement: "A file is replaced by writing it elsewhere and renaming it over.",
    },
    {
      invariantKind: "departure",
      statement: "The file written first is outside the folder the editor watches.",
    },
    {
      invariantKind: "departure",
      statement: "The folders every picture reads are watched once rather than once per picture.",
    },
    {
      invariantKind: "departure",
      statement: "A picture states the folders it reads and which files in them it is made from.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that appears while the service runs is read from then on.",
    },
    {
      invariantKind: "departure",
      statement: "A picture no file change can announce is taken again on a beat of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A picture taken on a beat is not taken a second time as the service starts.",
    },
    {
      invariantKind: "departure",
      statement: "A beat stops when the watching stops.",
    },
    {
      invariantKind: "departure",
      statement: "A throw ends the service rather than being caught and logged.",
    },
  ],
} as const satisfies Module
