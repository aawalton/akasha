import type { Module } from "../module/module.page-type.ts"

export const codeSource = {
  id: "01a05026-bc17-76c6-8a84-242b988bdd57",
  pageTypeSlug: "module",
  slug: "code-source",
  definition: "a body read as TypeScript, and where in that reading a thing stands",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One parse stands for every body read as TypeScript here.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a node can be asked what holds it is named rather than passed as a bare flag.",
    },
    {
      invariantKind: "departure",
      statement: "A line is answered counting from one.",
    },
    {
      invariantKind: "departure",
      statement: "A node is answered at where its own text starts past whatever trivia leads it.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here judges a body or knows why it is read. A check and a rule and a move all parse the same way and differ only in what they then walk.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reads the disk. A path is a name the parse carries so a node can say where it stands rather than a file this opens.",
    },
  ],
} as const satisfies Module
