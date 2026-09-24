import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imageBuild = {
  id: "01a08de8-a521-7517-beff-3c12047e76f9",
  type: "page-type/module",
  slug: "image-build",
  definition: "the folder, the recipe and the repository building and pushing an image",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A built image and a container recipe are both built the same way from here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A built image's recipe is the Dockerfile committed beside that image's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container recipe's recipe is the file beside that recipe's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A built image is handed the repository root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container recipe is handed the package that recipe sits in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An image no repository is named for is built by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe is read only where that one recipe is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A recipe's body is read from the folder handed in and the recipes are read from the checkout.",
    },
  ],
} as const satisfies Module
