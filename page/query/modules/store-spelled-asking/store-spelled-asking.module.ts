import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const storeSpelledAsking = {
  id: "01a063ba-dbcd-72dd-9475-fbcddbebcd88",
  type: "module",
  slug: "store-spelled-asking",
  definition: "a composed query asked of the store in the spelling the store has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller asking here spells the key its page type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller asking the plain composed query spells the key the store has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A multi-word key asked the plain way is unmatched rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row narrowed to keys comes back empty where the spelling is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser takes this whole road.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here spells a key itself.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing this road reaches opens a file.",
    },
  ],
} as const satisfies Module
