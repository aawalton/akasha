import type { Module } from "@akasha/code-system/module"

export const moveRepointing = {
  id: "01a04efb-db14-7000-a96d-4bace8327509",
  pageTypeSlug: "module",
  slug: "move-repointing",
  definition: "a body rewritten so the paths it names follow the files that moved",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body is rewritten in one run with each name replaced where the name sits rather than found again.",
    },
    {
      invariantKind: "departure",
      statement: "A name is written back quoted matching the way the body spells it.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching nothing that moved is left as the name stands.",
    },
    {
      invariantKind: "departure",
      statement: "What a package's name reaches moves without that name changing.",
    },
    {
      invariantKind: "absence",
      statement: "No naming is handed in here.",
    },
  ],
} as const satisfies Module
