import type { Module } from "@akasha/code-system/module"

export const transpileReachability = {
  id: "01a06758-8ed6-7000-a339-75b552d40fe0",
  pageTypeSlug: "module",
  slug: "transpile-reachability",
  definition: "the set of source files and exported names a bundle entry point reaches",
  code: "ts",
} as const satisfies Module
