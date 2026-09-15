import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shapeLoading = {
  id: "01a06328-b8b6-750e-9c26-741059f3c69f",
  type: "module",
  slug: "shape-loading",
  definition: "the folder shapes the index names, each loaded from the code beside its page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A shape whose subject is a folder of one name publishes the names that shape takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape takes more than one name where one shape is what those folders have.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder of another name is declined here rather than handed to that shape.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The decline says every name that shape takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape publishing a name that is no list of names publishes no name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A decline carries a reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder matches that shape nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape publishing no name is handed every folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The names the enabled shapes publish are the names a folder may be a part under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The shapes are found in the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape judging no folder is never loaded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A shape's code is loaded from the body on disk rather than from where the change leaves the code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A change writing a shape's code anew is refused rather than judged by the body before the change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The shapes are handed over ordered by slug.",
    },
  ],
} as const satisfies Module
