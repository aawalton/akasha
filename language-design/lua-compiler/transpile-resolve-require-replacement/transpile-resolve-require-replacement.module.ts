import type { Module } from "@akasha/code-system/module"

export const transpileResolveRequireReplacement = {
  id: "01a06758-8ed6-7002-83fe-ec50dee7207e",
  pageTypeSlug: "module",
  slug: "transpile-resolve-require-replacement",
  definition: "the rewritten require path spliced into printed Lua code and its source map",
  code: "ts",
} as const satisfies Module
