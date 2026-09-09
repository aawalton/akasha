import type { Module } from "../modules/module.page-type.ts"

export const codeSource = {
  id: "01a05026-bc17-76c6-8a84-242b988bdd57",
  pageTypeSlug: "module",
  type: "module",
  slug: "code-source",
  definition: "a body read as TypeScript, and where in that reading a thing is",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Whether a node can be asked for its parent is named rather than passed as a bare flag.",
    },
    {
      invariantKind: "departure",
      statement: "A line is answered counting from the first line.",
    },
    {
      invariantKind: "departure",
      statement:
        "A node is answered at where its own text starts past whatever trivia leads the node.",
    },
    {
      invariantKind: "departure",
      statement:
        "The object literal a declaration has is answered past whatever casts wrap the object literal.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a declaration is exported is read from the modifiers that declaration has.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a body or knows why the body is read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "absence",
      statement:
        "A path is a name the parse has so a node says its place rather than a file this module opens.",
    },
  ],
} as const satisfies Module
