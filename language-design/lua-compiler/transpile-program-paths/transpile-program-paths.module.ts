import type { Module } from "@akasha/code/module"

export const transpileProgramPaths = {
  id: "01a06758-8ed4-7001-a9dc-fc2fee2f4690",
  pageTypeSlug: "module",
  type: "module",
  slug: "transpile-program-paths",
  definition: "the output path a source file is emitted to, derived from outDir and rootDir",
  code: "ts",
} as const satisfies Module
