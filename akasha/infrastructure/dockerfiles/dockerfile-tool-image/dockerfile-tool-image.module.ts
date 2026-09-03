import type { Module } from "@akasha/code-system/module"

export const dockerfileToolImage = {
  id: "01a06865-abff-7008-9b28-d4710d8bebb9",
  pageTypeSlug: "module",
  slug: "dockerfile-tool-image",
  definition: "the Dockerfile a tool image is built from, and where each service's output lands",
  code: "ts",
} as const satisfies Module
