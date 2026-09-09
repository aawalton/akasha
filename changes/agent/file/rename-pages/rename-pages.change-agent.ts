import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const renamePages = {
  id: "01a08337-0d7c-7cd3-bad9-c30420f68ccf",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "rename-pages",
  changeMode: "change-mode-rename",
  definition: "many pages renamed and carried to where their slugs say, in one call",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rename is left to the mechanical change renaming many pages.",
    },
    {
      invariantKind: "departure",
      statement: "Each line of the argument names a page and the slug that page becomes.",
    },
    {
      invariantKind: "departure",
      statement: "A line that is not a path and a slug parted by a space is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A line with nothing on it is read over.",
    },
    {
      invariantKind: "departure",
      statement: "The kind of page is read from the path rather than from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is refused here and the refusal names the change renaming one.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
