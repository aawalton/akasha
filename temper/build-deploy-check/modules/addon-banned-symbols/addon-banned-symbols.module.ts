import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonBannedSymbols = {
  id: "01a06365-e827-7002-bfdd-914c6a139782",
  type: "module",
  slug: "addon-banned-symbols",
  definition: "the Lua symbols an emitted bundle names that the game's sandbox took away",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A manifest yielding no banned construct refuses to load rather than scanning.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A symbol inside a string literal is masked before the line is scanned.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A matched namespace with no allow-set in the manifest throws.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A member the manifest allows on a partial namespace is no finding.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Every finding names which family of the manifest the symbol was matched by.",
    },
  ],
} as const satisfies Module
