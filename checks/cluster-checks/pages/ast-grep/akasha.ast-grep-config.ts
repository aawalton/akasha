import type { AstGrepConfig } from "../../../ast-grep-configs/ast-grep-config.page-type.ts"

export const akasha = {
  id: "01a0818e-6dc4-7df8-8774-5bfe318a3ce8",
  pageTypeSlug: "ast-grep-config",
  slug: "akasha",
  definition: "the ast-grep rules run over every source file this repository tracks",
  partSlugs: ["ast-grep-rule/mock-module-outside-test-file"],
  sgconfig: "yml",
} as const satisfies AstGrepConfig
