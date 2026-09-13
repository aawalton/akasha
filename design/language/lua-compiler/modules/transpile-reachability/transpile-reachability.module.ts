import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const transpileReachability = {
  id: "01a06758-8ed6-7000-a339-75b552d40fe0",
  type: "module",
  slug: "transpile-reachability",
  definition: "the set of source files and exported names a bundle entry point reaches",
  code: "ts",
} as const satisfies Module
