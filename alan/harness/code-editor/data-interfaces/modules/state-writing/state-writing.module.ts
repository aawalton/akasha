import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const stateWriting = {
  id: "01a09ca3-cbe9-7489-b97b-135b73b4be8a",
  type: "module",
  slug: "state-writing",
  definition: "what the editor draws written where the editor reads it",
  code: "ts",
  test: "ts",
  invariants: [
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
      statement: "The pictures a landing writes are the pictures made from committed pages alone.",
    },
    {
      invariantKind: "departure",
      statement: "A landing writes those pictures whatever that landing changed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds a picture between one write and the next.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here watches a file or reads a clock.",
    },
  ],
} as const satisfies Module
