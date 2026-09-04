import type { Module } from "@akasha/code-system/module"

export const buildPageResolver = {
  id: "01a06158-0a79-7000-a2b2-4fa802b18c2d",
  pageTypeSlug: "module",
  slug: "build-page-resolver",
  definition: "Builds a resolver taking a page id to its title, color and sort order.",
  code: "ts",
} as const satisfies Module
