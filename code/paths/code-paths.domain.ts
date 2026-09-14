import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const codePaths = {
  id: "01a09b2a-d60f-7700-b4b4-7b97bc6ba190",
  type: "domain",
  slug: "code-paths",
  definition: "a path spelled as a string, and where in the tree that spelling lands",
  parts: [
    "module/code-path-between",
    "module/code-runtime-path",
    "module/folder-spelling",
    "module/module-directory",
    "module/path-runs",
    "test-fixture/script-paths",
  ],
} as const satisfies Domain
