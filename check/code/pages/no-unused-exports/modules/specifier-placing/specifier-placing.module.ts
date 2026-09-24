import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const specifierPlacing = {
  id: "01a09163-1a4e-7000-9e11-f25866bf23e0",
  type: "page-type/module",
  slug: "specifier-placing",
  definition: "which literals of a body load a module rather than import it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An `import()` names a module by its argument.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name handed to `import()` carries a specifier, as one handed to a require does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A literal handed to `require` or to `require.resolve` names a module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A literal handed to a name taken from `createRequire`, or to `resolve` on it, names a module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name handed there carries a specifier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A literal a name carrying a specifier is written from names a module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A parameter handed there makes the argument at that place a specifier at every call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function is followed by the name that function is declared or written under.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A `resolve` on anything else names no module.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "A specifier built from anything but one plain literal is not seen.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk or the index.",
    },
  ],
} as const satisfies Module
