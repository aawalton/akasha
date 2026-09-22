import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dockerfileToolImage = {
  id: "01a06865-abff-7008-9b28-d4710d8bebb9",
  type: "page-type/module",
  slug: "dockerfile-tool-image",
  definition: "a tool image's Dockerfile",
  code: "ts",
} as const satisfies Module
