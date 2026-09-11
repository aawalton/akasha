import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const serveImageObject = {
  id: "01a0655e-d399-749b-a142-858d116c48c5",
  type: "module",
  slug: "serve-image-object",
  definition: "an image out of the object store answered with its caching headers",
  code: "ts",
} as const satisfies Module
