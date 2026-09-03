import type { Module } from "@akasha/code-system/module"

export const esoDeclarationText = {
  id: "01a0673e-3ddf-7003-bbda-94a1b1824f32",
  pageTypeSlug: "module",
  slug: "eso-declaration-text",
  definition: "the TypeScript declaration text a set of selected game tokens is written as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each file opens with a header saying the file was generated.",
    },
    {
      invariantKind: "departure",
      statement: "A function takes a void `this` before every other parameter.",
    },
    {
      invariantKind: "departure",
      statement: "Every parameter is declared optional.",
    },
    {
      invariantKind: "departure",
      statement: "One return is written as the return type and several as a tuple.",
    },
    {
      invariantKind: "departure",
      statement: "A call with variable returns ends its tuple in a rest of the last type.",
    },
    {
      invariantKind: "departure",
      statement: "An enum is a number type and an enum value a declared number.",
    },
    {
      invariantKind: "departure",
      statement:
        "An object with no methods and no parent is an empty type rather than an interface.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
