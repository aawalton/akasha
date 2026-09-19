import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const calculationLoading = {
  id: "01a071f0-b9d7-754a-83dc-36f3c40b2d10",
  type: "page-type/module",
  slug: "calculation-loading",
  definition: "the function a computed property's code file exports, taken from that file's text",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation is the export named `work`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code file exporting no `work` is refused by the names that file does export.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A code file importing a value that is neither a page nor such a module does not load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An import of a computed-property-module's code file is folded into the text before it runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import of a page is folded the same way, and the page's value is what folds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is told from a code file by the shape of its name rather than the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That module's text runs in a scope of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the names the import asks for leave that scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A computed-property-module importing another is folded the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the import renames is read under the name the import gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import reaching no file refuses the load by the path that import reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import naming what that module does not export refuses the load by that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller hands in the path a code file came from and a reader of a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relative import is resolved against the path the caller handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import naming a file from the root is resolved from the root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A calculation is read from the text of its code file rather than through an import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type an import names is gone before the text is run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages package reaches a calculation without naming the domain with that calculation.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs the calculation this module answers.",
    },
  ],
} as const satisfies Module
