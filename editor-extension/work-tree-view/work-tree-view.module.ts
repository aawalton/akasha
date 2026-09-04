import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workTreeView = {
  id: "01a06867-dbcb-79d0-8994-08ee6fe57d12",
  pageTypeSlug: "module",
  slug: "work-tree-view",
  definition: "the rows the editor asks for of the work tree and the color each row is drawn in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tree the editor draws is replaced whole rather than patched row by row.",
    },
    {
      invariantKind: "departure",
      statement: "A filter that reads the same as the one held redraws nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A row is matched against its label, its detail and its note.",
    },
    {
      invariantKind: "departure",
      statement: "A row holding a match is drawn open while a filter stands.",
    },
    {
      invariantKind: "departure",
      statement: "A row is identified apart while a filter stands, so the editor redraws it.",
    },
    {
      invariantKind: "departure",
      statement: "A row is identified by the key its initiative is keyed by.",
    },
    {
      invariantKind: "departure",
      statement: "A row carrying a color stands under a scheme of this panel's own.",
    },
    {
      invariantKind: "departure",
      statement: "A color is drawn by a decoration answering that scheme rather than on the row.",
    },
    {
      invariantKind: "departure",
      statement: "A decoration answers nothing for a name under any other scheme.",
    },
    {
      invariantKind: "departure",
      statement: "Every row carries a blank icon, so a colored row and an uncolored one line up.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row opening no document says in its tooltip that it stands for nothing declared.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the harness.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a color.",
    },
  ],
} as const satisfies Module
