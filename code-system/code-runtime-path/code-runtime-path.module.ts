import type { Module } from "../modules/module.page-type.ts"

export const codeRuntimePath = {
  id: "01a06558-3a63-7eb3-af7c-3a1c913d02c1",
  pageTypeSlug: "module",
  slug: "code-runtime-path",
  definition:
    "a body rewritten so the paths it builds off its own directory follow the files that moved",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path built off the directory a body sits in is repointed as a specifier is.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming neither its own url nor its own directory is left as it is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name bound to a body's own directory represents that directory wherever the name is used.",
    },
    {
      invariantKind: "departure",
      statement:
        "A url built against a body's own url is read as a path off that body's directory.",
    },
    {
      invariantKind: "departure",
      statement: "A join or a resolve taking a body's own directory first is read the same way.",
    },
    {
      invariantKind: "departure",
      statement:
        "Several written segments are rewritten as the one segment those segments come to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path a template builds off a body's own directory is read from the piece after that expression.",
    },
    {
      invariantKind: "departure",
      statement:
        "A leading dot-slash a body wrote is kept where the replacement climbs no directory.",
    },
    {
      invariantKind: "absence",
      statement:
        "A path built from something other than a written literal is named rather than rewritten.",
    },
    {
      invariantKind: "departure",
      statement:
        "A base this cannot read is counted whether or not the move reaches beneath that base.",
    },
    {
      invariantKind: "departure",
      statement:
        "A base this cannot read is named only where the move takes a file out from under that base.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
