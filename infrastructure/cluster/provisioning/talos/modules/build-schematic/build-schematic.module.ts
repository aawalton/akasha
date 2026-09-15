import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildSchematic = {
  id: "01a06813-7b0f-75a7-b4b8-31b495b4f562",
  type: "page-type/module",
  slug: "build-schematic",
  definition: "a node's extensions and kernel arguments turned into an Image Factory schematic",
  code: "ts",
} as const satisfies Module
