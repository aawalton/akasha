import type { Module } from "@akasha/code-system/module"

export const markdownGlob = {
  id: "01a06895-1cdb-7000-9fa3-5c858f76d897",
  pageTypeSlug: "module",
  slug: "markdown-glob",
  definition: "matching and scanning paths against a glob",
  code: "ts",
  invariants: [
    { invariantKind: "departure", statement: "`node_modules` and `.git` are never walked." },
    { invariantKind: "departure", statement: "A symlink is neither descended nor matched." },
  ],
} as const satisfies Module
