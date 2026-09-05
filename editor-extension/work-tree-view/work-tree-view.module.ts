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
      statement: "A filter that reads the same as the one held redraws nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A row is matched against its label, its detail and its note.",
    },

    {
      invariantKind: "departure",
      statement:
        "A row is identified apart while a filter is there, so the editor redraws that row.",
    },
    {
      invariantKind: "departure",
      statement: "A row is identified by the key its initiative is keyed by.",
    },
    {
      invariantKind: "departure",
      statement: "A row carrying a color sits under a scheme of this panel's own.",
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
        "A row opening no document says in its tooltip that the row represents nothing declared.",
    },
    {
      invariantKind: "departure",
      statement: "A row opens the whole path that row carries rather than one composed here.",
    },
    {
      invariantKind: "departure",
      statement: "A tooltip says a row's path against the checkout rather than whole.",
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
