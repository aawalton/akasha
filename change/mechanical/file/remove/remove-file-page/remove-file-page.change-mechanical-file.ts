import type { ChangeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.types.ts"

export const removeFilePage = {
  id: "01a079a5-8d4a-70e6-a33b-73d49d514b05",
  type: "change-mechanical-file",
  slug: "remove-file-page",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "one page taken away with every file that page keeps beside the page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the index files no page at is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page and every file that page keeps beside the page go together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file beside the page goes whether or not git tracks that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which files sit beside a page is read from the index rather than from the folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the page claims and the tree has no body at is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page's entry in the parent's `parts` is dropped before any file goes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file importing a second file going in the same act goes before that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files beside the page go before the page's own file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file beside the page under a TypeScript name goes by `remove-code-file`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other file beside the page goes by `remove-file`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page's own file goes by `remove-code-file`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal from any change reached here refuses the whole removal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every index question here is asked of the world the caller hands in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Containment is a relation named in the parent's `parts`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The module taking a value away is called for the parent's `parts` rather than reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A parent naming the page bare rather than qualified is dropped just the same.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFile
