import type { FolderShape } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.types.ts"

export const aClaimedFolder = {
  id: "01a095cd-e1f6-7ab8-8f0e-c2747098063c",
  type: "page-type/folder-shape",
  slug: "a-claimed-folder",
  definition: "the shape of a folder a page above claims, holding no page and no page's file",
  code: "ts",
  test: "ts",
  enabled: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page above claims this folder by a folder property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder under a claimed folder is claimed too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder no page above claims is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding a page is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding a file some page names is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding neither a file nor a folder is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "What the files here hold is not read.",
    },
  ],
} as const satisfies FolderShape
