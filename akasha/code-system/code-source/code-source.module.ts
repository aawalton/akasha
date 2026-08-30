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
      statement:
        "One parse stands for every body read as TypeScript here, so a body reads the same wherever it is read and no caller carries settings of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a node can be asked what holds it is named, not passed as a bare flag, because a caller reading that flag wrong reads a whole file wrong.",
    },
    {
      invariantKind: "departure",
      statement:
        "A line is answered counting from one, because every caller answering a person counts from one and each adding it back is a place to forget.",
    },
    {
      invariantKind: "departure",
      statement:
        "A node is answered at where its own text starts, past whatever trivia leads it, so a line names what a reader sees rather than the blank above it.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here judges a body or knows why it is read. A check, a rule and a move all parse the same way and differ only in what they then walk.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reads the disk. A path is a name the parse carries so a node can say where it stands, never a file this opens.",
    },
  ],
} as const satisfies Module
