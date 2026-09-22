import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeBinding = {
  id: "01a0c4b5-9eb1-7627-9166-8057c88ab5b1",
  type: "page-type/module",
  slug: "code-binding",
  definition: "which name in a body binds an identifier, and which identifier nothing binds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The scope an identifier sits in is the nearest node above it that scopes what is declared inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is looked for scope by scope outward, and the file is the last scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An identifier no scope out to the file declares is answered as bound by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A parameter, a catch, a variable, a function, a class and an imported name each declare a name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A binding taken apart declares every name that binding takes apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name written where a property is named reads as no reference.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name written after `globalThis` is answered as reached on the global object.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name inside an import or export specifier reads as no reference.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type, an interface, an enum and a namespace each declare a name too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name a module augmentation declares is declared by that augmentation rather than the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name a declare global block declares is declared by the file holding that block.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A type parameter declares no name here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk or any body but the one handed in.",
    },
  ],
} as const satisfies Module
