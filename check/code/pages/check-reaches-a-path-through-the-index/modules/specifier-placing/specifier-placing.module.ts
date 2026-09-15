import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const specifierPlacing = {
  id: "01a09163-1a4e-7000-9e11-f25866bf23e0",
  type: "module",
  slug: "specifier-placing",
  definition: "which literals of a body name a module rather than a path",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import, an export and an `import()` each name a module by a specifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import type names a module by the literal in its type argument.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A name handed to `import()` carries a specifier, as one handed to a require does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A literal handed to `require` or to `require.resolve` names a module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first literal a test hands `mock.module` names a module.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name handed to `mock.module` rather than a literal is not followed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A literal handed to a name taken from `createRequire`, or to `resolve` on it, names a module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name handed there carries a specifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A literal a name carrying a specifier is written from names a module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A parameter handed there makes the argument at that place a specifier at every call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A function is followed by the name that function is declared or written under.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A `resolve` on anything else names no module.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "A specifier built from anything but one plain literal is not seen.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk or the index.",
    },
  ],
} as const satisfies Module
