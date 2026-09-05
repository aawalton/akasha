import type { Module } from "@akasha/code-system/module"

export const documentStanding = {
  id: "01a0680a-fa30-7f0d-89f4-80ea9c4f2e25",
  pageTypeSlug: "module",
  slug: "document-standing",
  definition: "whether a persona's or a person's document stands, asked in shell by its slug",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where a document sits is read off the pages standing rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A shape is one standing page's own path with its slug blanked out.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only the last two parts of a path carry the slug, so only those parts are blanked.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every shape the standing pages take is asked, so a tree half moved still answers.",
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
      statement: "A persona whose document has not moved in has none yet.",
    },
    {
      invariantKind: "departure",
      statement: "Either way there is no identity to seat and a fresh session cannot reseed one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which document a seat needs.",
    },
  ],
} as const satisfies Module
