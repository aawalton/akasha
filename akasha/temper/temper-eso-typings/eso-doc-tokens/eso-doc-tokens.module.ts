import type { Module } from "@akasha/code-system/module"

export const esoDocTokens = {
  id: "01a0673e-3ddf-7001-acad-9b0751ef4567",
  pageTypeSlug: "module",
  slug: "eso-doc-tokens",
  definition: "the functions, objects, events and enums a game documentation dump describes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The dump is divided into sections by its own headings.",
    },
    {
      invariantKind: "departure",
      statement: "A section heading the dump does not carry leaves that section empty.",
    },
    {
      invariantKind: "departure",
      statement: "A documented type is answered as the matching TypeScript type.",
    },
    {
      invariantKind: "departure",
      statement: "A type the map does not name is answered unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "An enum with no values is no enum.",
    },
    {
      invariantKind: "departure",
      statement: "An object states the object above rather than the objects below.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
