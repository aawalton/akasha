import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const idleSaves = {
  id: "01a0655e-d39b-7622-a70b-508466de5c7c",
  type: "module",
  slug: "idle-saves",
  definition: "reading and writing one player's idle save",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/gap",
      statement: "`idle-save` is held as a page type, but reading and writing a save is unbuilt.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A save that went unread is refused rather than answered as absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A save that did not land is refused rather than answered as written.",
    },
  ],
} as const satisfies Module
