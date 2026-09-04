import type { Module } from "@akasha/code-system/module"

export const transformUsingTransformer = {
  id: "01a06758-8e73-7000-8e80-8c4d77de6b9c",
  pageTypeSlug: "module",
  slug: "transform-using-transformer",
  definition:
    "the callback call a `using` declaration and the statements after it are rewritten as",
  code: "ts",
} as const satisfies Module
