import type { Module } from "@akasha/code-system/module"

export const readEnd = {
  id: "01a05c3d-a2e6-7b43-94ff-20aeae3fbcad",
  pageTypeSlug: "module",
  slug: "read-end",
  definition: "Reports whether the end-of-read sentinel should fire once on intersection.",
  code: "ts",
} as const satisfies Module
