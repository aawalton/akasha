import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bundleMetaGlob = {
  id: "01a15583-f5c2-79d1-b63b-b284732eb9b9",
  type: "page-type/module",
  slug: "bundle-meta-glob",
  definition: "the bundler's eager glob written out as an import of each file it finds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Bun's bundler leaves the bundler's glob in the bundle as a call nothing answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A glob is read against the folder of the file calling it, as bun's preload reads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file found is keyed by its path from that folder, as bun's preload keys it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glob taken other than eagerly is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file calling a glob is never among the files it finds.",
    },
  ],
  createdAt: "2026-10-19T18:54:33.922Z",
  updatedAt: "2026-10-19T18:54:33.922Z",
} as const satisfies Module
