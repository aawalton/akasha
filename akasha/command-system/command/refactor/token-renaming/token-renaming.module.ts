import type { Module } from "../../../../code-system/module/module.page-type.ts"

export const tokenRenaming = {
  id: "01a0598c-9096-7000-8946-4e4927fad360",
  pageTypeSlug: "module",
  slug: "token-renaming",
  definition: "the name a body carries changed wherever the checker resolves to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is named by the file exporting it rather than by the name on its own.",
    },
    {
      invariantKind: "departure",
      statement: "One name is carried by many files.",
    },
    {
      invariantKind: "departure",
      statement: "A name no file exports is refused rather than answered as nothing to do.",
    },
    {
      invariantKind: "departure",
      statement: "A name the file already exports is refused rather than shadowed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The places a name is spelled are read from the checker rather than matched as text.",
    },
    {
      invariantKind: "departure",
      statement: "A name standing for something else in its own scope is left as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "An answer names every line still spelling the name that was renamed.",
    },
    {
      invariantKind: "absence",
      statement: "A caller hands in the paths and the bodies.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "No file is carried and no path changes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands what it works out.",
    },
  ],
} as const satisfies Module
