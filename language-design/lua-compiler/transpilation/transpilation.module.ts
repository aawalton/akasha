import type { Module } from "@akasha/code/module"

export const transpilation = {
  id: "01a06758-8ed2-7000-93e1-ce27921513fb",
  pageTypeSlug: "module",
  type: "module",
  slug: "transpilation",
  definition:
    "the entry points for transpiling a file list, a tsconfig project, or a source string",
  code: "ts",
} as const satisfies Module
