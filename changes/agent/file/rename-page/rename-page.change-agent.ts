import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const renamePage = {
  id: "01a07718-c9b6-7e8c-bc13-5927529ac249",
  pageTypeSlug: "change-agent",
  slug: "rename-page",
  changeMode: "change-mode-rename",
  definition: "a page renamed and carried to where its slug says, in the data and in every name",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rename is left to the mechanical change renaming a page.",
    },
    {
      invariantKind: "departure",
      statement: "The kind of page is read from the path rather than from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is refused here, and the refusal names the change renaming one.",
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
