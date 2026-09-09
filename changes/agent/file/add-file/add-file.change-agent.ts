import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const addFile = {
  id: "01a07813-6e3b-77c3-9c1e-b0c5778fd31b",
  pageTypeSlug: "change-agent",
  slug: "add-file",
  changeMode: "change-mode-add",
  definition: "one body written at one path, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body is handed in whole rather than as a passage.",
    },
    {
      invariantKind: "departure",
      statement: "Writing the body is left to the partial this change runs.",
    },
    {
      invariantKind: "departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      invariantKind: "departure",
      statement: "The index files a page this change writes.",
    },
    {
      invariantKind: "departure",
      statement: "A later act in the same change names a page this change wrote.",
    },
  ],
  changeKind: "change-authored",
} as const satisfies ChangeAgent
