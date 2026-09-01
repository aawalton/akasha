import type { Module } from "@akasha/code-system/module"

export const serviceReaching = {
  id: "01a05a5e-4f46-7ee6-a76e-5244d5852c62",
  pageTypeSlug: "module",
  slug: "service-reaching",
  definition: "the files a TypeScript entry reaches by import inside this repository",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An import resolving into a vendor folder is reached by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A file is reached at the path it really stands at rather than the one naming it.",
    },
    {
      invariantKind: "departure",
      statement: "A file that will not scan stops what stands behind the file and not the rest.",
    },
    {
      invariantKind: "departure",
      statement: "An import naming no file is reported rather than refusing the whole reach.",
    },
    {
      invariantKind: "departure",
      statement: "A file already reached is not reached again.",
    },
    {
      invariantKind: "departure",
      statement: "The reach stops at a thousand files and says that the reach stopped.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here watches a file.",
    },
  ],
} as const satisfies Module
