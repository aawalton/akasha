import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const calculationLoading = {
  id: "01a071f0-b9d7-754a-83dc-36f3c40b2d10",
  type: "module",
  slug: "calculation-loading",
  definition: "the function a computed property's code file exports, taken from that file's text",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A calculation is the export named `work`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A code file exporting no `work` is refused by the names that file does export.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A code file importing a value that is no computed-property-module does not load.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An import of a computed-property-module's code file is folded into the text before it runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That module's text runs in a scope of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the names the import asks for leave that scope.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A computed-property-module importing another is folded the same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name the import renames is read under the name the import gives it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import reaching no file refuses the load by the path that import reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import naming what that module does not export refuses the load by that name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller hands in the path a code file came from and a reader of a path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relative import is resolved against the path the caller handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import naming a file from the root is resolved from the root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A calculation is read from the text of its code file rather than through an import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type an import names is gone before the text is run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages package reaches a calculation without naming the domain with that calculation.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs the calculation this module answers.",
    },
  ],
} as const satisfies Module
