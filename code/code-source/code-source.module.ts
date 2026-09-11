import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const codeSource = {
  id: "01a05026-bc17-76c6-8a84-242b988bdd57",
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
      invariantKind: "departure",
      statement: "Whether a node scopes the names declared inside it is answered here.",
    },
    {
      invariantKind: "departure",
      statement: "An import naming nothing at all carries more than types.",
    },
    {
      invariantKind: "departure",
      statement: "An import of an empty list of names reads as types alone and as not erased.",
    },
    {
      invariantKind: "departure",
      statement: "A fault the parse recovered from is answered rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A body the parser had no fault with is answered as having none.",
    },
    {
      invariantKind: "departure",
      statement: "The fault answered is the first one, read as one line of text.",
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
