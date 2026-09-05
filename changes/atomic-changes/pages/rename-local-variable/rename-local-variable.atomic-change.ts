import type { AtomicChange } from "../../atomic-change.page-type.ts"

export const renameLocalVariable = {
  id: "01a072e6-184c-78e3-bf0c-622a9595c152",
  pageTypeSlug: "atomic-change",
  slug: "rename-local-variable",
  definition: "the change spelling a local binding and its references anew in one file",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A binding the file itself declares is no local binding.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rename refuses where the new name is already named where the binding is visible.",
    },
    {
      invariantKind: "departure",
      statement: "A shorthand property keeps its key and points its value at the new name.",
    },
    {
      invariantKind: "departure",
      statement: "A `var`, a destructuring and an import are refused rather than renamed.",
    },
    {
      invariantKind: "departure",
      statement: "The binding is named by an offset any one of its occurrences covers.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or reaches a second file.",
    },
  ],
} as const satisfies AtomicChange
