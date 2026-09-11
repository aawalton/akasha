import type { ChangeMechanical } from "../../../change-mechanical.page-type.types.ts"

export const divideFilePageProperty = {
  id: "01a08df0-6686-74e8-9c80-9ef236f19844",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "divide-file-page-property",
  changeMode: "change-mode-divide",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-property",
  definition: "one page property's rows laid out again across as many files as the ceiling takes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The rows are read from every file the property has, in the order those files are numbered.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are laid out again from the first file on.",
    },
    {
      invariantKind: "departure",
      statement: "The ceiling divided at is the ceiling one file beside a page is held to.",
    },
    {
      invariantKind: "departure",
      statement: "A file the new layout does not name is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A file already holding what the layout says is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming no file for the property refuses the change.",
    },
    {
      invariantKind: "absence",
      statement: "No row's text changes and no row changes its place in the order.",
    },
    {
      invariantKind: "absence",
      statement:
        "No guard runs here, where every file written is one the page beside it already claims.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
