import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const dataWatching = {
  id: "01a07266-d474-7296-bd8e-10c7667fe6b6",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "A picture is worked out again only when a file the picture is made from changes.",
    },
    {
      invariantKind: "departure",
      statement: "A picture is in memory between one change and the next.",
    },
    {
      invariantKind: "departure",
      statement: "A file is written under the cooldown its own page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file is replaced by writing a second file elsewhere and renaming that second file over.",
    },
    {
      invariantKind: "departure",
      statement: "The file written first is outside the folder the editor watches.",
    },
    {
      invariantKind: "departure",
      statement: "The file written first is named for the process writing that file.",
    },
    {
      invariantKind: "departure",
      statement: "A file below a folder a picture reads is no file that picture is made from.",
    },
    {
      invariantKind: "departure",
      statement: "The folders every picture reads are watched once rather than once per picture.",
    },
    {
      invariantKind: "departure",
      statement:
        "A picture states the folders that picture reads and the files there the picture is made from.",
    },
    {
      invariantKind: "departure",
      statement: "A picture built out of the index says so rather than naming a file in the index.",
    },
    {
      invariantKind: "departure",
      statement: "Such a picture is taken again on any event under the index.",
    },
    {
      invariantKind: "departure",
      statement: "The index is followed for those events rather than read at each event.",
    },
    {
      invariantKind: "gap",
      statement: "A seat that appears while the service runs is read from then on.",
    },
    {
      invariantKind: "departure",
      statement: "The folders a picture reads are worked out as the service starts.",
    },
    {
      invariantKind: "departure",
      statement: "A picture that could not be taken answers no line rather than an empty line.",
    },
    {
      invariantKind: "departure",
      statement: "No file is written for a picture answering no line.",
    },
    {
      invariantKind: "departure",
      statement: "The line left on disk from before the service started is the line kept.",
    },
    {
      invariantKind: "departure",
      statement: "A throw ends the service rather than being caught and logged.",
    },
    {
      invariantKind: "absence",
      statement: "No picture here is taken on a beat.",
    },
  ],
} as const satisfies Module
