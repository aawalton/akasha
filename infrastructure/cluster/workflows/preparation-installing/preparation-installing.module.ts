import type { Module } from "@akasha/code/module"

export const preparationInstalling = {
  id: "01a0815e-43d4-730d-aa2a-40bbf938a735",
  pageTypeSlug: "module",
  slug: "preparation-installing",
  definition: "a commit's dependencies installed once and reached from each checkout",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Dependencies are installed once for a commit and read again by every later run.",
    },
    {
      invariantKind: "departure",
      statement: "A commit already installed is known by the mark left when that install finished.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout reaches those dependencies by a link rather than a copy.",
    },
    {
      invariantKind: "departure",
      statement:
        "A link pointing outside the install is pointed back at the checkout it belongs to.",
    },
  ],
} as const satisfies Module
