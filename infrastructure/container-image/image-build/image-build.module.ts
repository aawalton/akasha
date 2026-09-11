import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const imageBuild = {
  id: "01a08de8-a521-7517-beff-3c12047e76f9",
  type: "module",
  slug: "image-build",
  definition: "the folder, the recipe and the repository one image is built and pushed by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A built image and a container recipe are both built the same way from here.",
    },
    {
      invariantKind: "departure",
      statement: "A built image's recipe is written from what that image imports.",
    },
    {
      invariantKind: "departure",
      statement: "A container recipe's recipe is the file beside that recipe's page.",
    },
    {
      invariantKind: "departure",
      statement: "A built image is handed the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A container recipe is handed the package that recipe sits in.",
    },
    {
      invariantKind: "absence",
      statement: "An image no repository is named for is built by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A recipe is read only where that one recipe is asked for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A recipe's body is read from the folder handed in and the recipes are read from the checkout.",
    },
  ],
} as const satisfies Module
