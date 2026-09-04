import type { Module } from "@akasha/code-system/module"

export const ciContainerManifest = {
  id: "01a06861-24c9-7009-b016-b53813aea18b",
  pageTypeSlug: "module",
  slug: "ci-container-manifest",
  definition: "the pod manifest a step's container is created from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step stating no image or no commands builds no container.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step asking for an environment variable that is neither a string nor a secret is refused.",
    },
  ],
} as const satisfies Module
