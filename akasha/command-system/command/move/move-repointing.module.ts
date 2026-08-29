import type { Module } from "../../../code-system/module/module.page-type.ts"

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
        "A body is rewritten in one pass, each name replaced where it stands rather than searched for again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name is written back quoted, so what stands in the body is spelled the way the body spells it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name reaching nothing that moved is left as it stands, so a body naming none of them comes back unchanged.",
    },
  ],
} as const satisfies Module
