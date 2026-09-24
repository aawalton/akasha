import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dockerfileServices = {
  id: "01a06865-abff-7001-8a02-c6bde79c5252",
  type: "page-type/module",
  slug: "dockerfile-services",
  definition: "the checkout a Dockerfile is built from and the line every Dockerfile opens with",
  code: "ts",
  test: "ts",
} as const satisfies Module
