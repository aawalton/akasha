import type { Module } from "@akasha/code/module"

export const documentPresent = {
  id: "01a0680a-fa30-7f0d-89f4-80ea9c4f2e25",
  pageTypeSlug: "module",
  slug: "document-present",
  definition: "whether a persona's or a person's document is there, asked in shell by its slug",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where a document sits is read off the pages there rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A shape is the path of a page that is there with its slug blanked out.",
    },
    {
      invariantKind: "departure",
      statement: "Only the last two parts of a path have the slug.",
    },
    {
      invariantKind: "departure",
      statement: "Only the last two parts of a path are blanked.",
    },
    {
      invariantKind: "departure",
      statement: "Every shape the pages there take is asked.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that will not answer falls back to the shape the pages took last.",
    },
    {
      invariantKind: "departure",
      statement: "A slug is asked as a shell word the terminal expands rather than as a slug now.",
    },
    {
      invariantKind: "departure",
      statement: "A seat bound to a project has no persona document by design.",
    },
    {
      invariantKind: "departure",
      statement: "A persona whose document has not moved in has no document yet.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no persona document takes on no persona.",
    },
    {
      invariantKind: "departure",
      statement: "A fresh session reseeds no persona document.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which document a seat needs.",
    },
  ],
} as const satisfies Module
