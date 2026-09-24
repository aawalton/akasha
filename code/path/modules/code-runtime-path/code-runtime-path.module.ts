import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeRuntimePath = {
  id: "01a06558-3a63-7eb3-af7c-3a1c913d02c1",
  type: "page-type/module",
  slug: "code-runtime-path",
  definition:
    "a body rewritten so the paths it builds off its own directory follow the files that moved",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path built off the directory a body sits in is repointed as a specifier is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming neither its own url nor its own directory is left as that body is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name bound to a body's own directory represents that directory wherever the name is used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A url built against a body's own url is read as a path off that body's directory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A join or a resolve taking a body's own directory first is read the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Several written segments are rewritten as the one segment those segments come to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path a template builds off a body's own directory is read from the piece after that expression.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A template inside a template expression is read as a template of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path spelled in a comment or inside a string is no path the body builds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A leading dot-slash a body wrote is kept where the replacement climbs no directory.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A path built from something other than a written literal is named rather than rewritten.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A literal holding an escape is named rather than rewritten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A base this module cannot read is counted whether or not the move reaches beneath that base.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A base this module cannot read is named only where the move takes a file out from under that base.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
