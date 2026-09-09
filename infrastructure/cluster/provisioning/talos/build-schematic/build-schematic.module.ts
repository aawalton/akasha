import type { Module } from "@akasha/code/module"

export const buildSchematic = {
  id: "01a06813-7b0f-75a7-b4b8-31b495b4f562",
  pageTypeSlug: "module",
  type: "module",
  slug: "build-schematic",
  definition: "a node's extensions and kernel arguments turned into a schematic and its hash",
  code: "ts",
} as const satisfies Module
