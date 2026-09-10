import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dockerfileServices = {
  id: "01a06865-abff-7001-8a02-c6bde79c5252",
  pageTypeSlug: "module",
  type: "module",
  slug: "dockerfile-services",
  definition: "which services get a Dockerfile, where each one lives and what type it builds as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An image's extensions file is named from the root rather than from its folder.",
    },
    {
      invariantKind: "departure",
      statement: "An image stating no extensions takes the file its own deploy folder holds.",
    },
  ],
} as const satisfies Module
