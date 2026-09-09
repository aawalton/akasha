import type { Module } from "@akasha/code/module"

export const dockerfileServices = {
  id: "01a06865-abff-7001-8a02-c6bde79c5252",
  pageTypeSlug: "module",
  type: "module",
  slug: "dockerfile-services",
  definition: "which services get a Dockerfile, where each one lives and what type it builds as",
  code: "ts",
  test: "ts",
} as const satisfies Module
