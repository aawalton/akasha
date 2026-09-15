import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dockerfileServices = {
  id: "01a06865-abff-7001-8a02-c6bde79c5252",
  type: "module",
  slug: "dockerfile-services",
  definition: "which services get a Dockerfile, where each one lives and what type it builds as",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An image's extensions file is named from the root rather than from its folder.",
    },
  ],
} as const satisfies Module
