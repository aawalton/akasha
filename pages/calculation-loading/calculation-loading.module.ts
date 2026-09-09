import type { Module } from "@akasha/code/module"

export const calculationLoading = {
  id: "01a071f0-b9d7-754a-83dc-36f3c40b2d10",
  pageTypeSlug: "module",
  type: "module",
  slug: "calculation-loading",
  definition: "the function a computed property's code file exports, taken from that file's text",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A calculation is the export named `work`.",
    },
    {
      invariantKind: "departure",
      statement: "A code file exporting no `work` is refused by the names that file does export.",
    },
    {
      invariantKind: "departure",
      statement: "A code file importing a value that is no computed-property-module does not load.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import of a computed-property-module's code file is folded into the text before it runs.",
    },
    {
      invariantKind: "departure",
      statement: "That module's text runs in a scope of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Only the names the import asks for leave that scope.",
    },
    {
      invariantKind: "departure",
      statement: "A computed-property-module importing another is folded the same way.",
    },
    {
      invariantKind: "departure",
      statement: "A name the import renames is read under the name the import gives it.",
    },
    {
      invariantKind: "departure",
      statement: "An import reaching no file refuses the load by the path that import reached.",
    },
    {
      invariantKind: "departure",
      statement: "An import naming what that module does not export refuses the load by that name.",
    },
    {
      invariantKind: "departure",
      statement: "A caller hands in the path a code file came from and a reader of a path.",
    },
    {
      invariantKind: "departure",
      statement: "A relative import is resolved against the path the caller handed in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A calculation is read from the text of its code file rather than through an import.",
    },
    {
      invariantKind: "departure",
      statement: "A type an import names is gone before the text is run.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages package reaches a calculation without naming the domain with that calculation.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs the calculation this module answers.",
    },
  ],
} as const satisfies Module
