import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const idleCardProjecting = {
  id: "01a0655e-d39a-72dd-abce-5eb2011bcc76",
  type: "module",
  slug: "idle-card-projecting",
  definition: "a player's persona cards written into the page store from their save",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "`idle-persona-card` is held as a page type, but writing a roster into it is unbuilt.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A roster that went unwritten is refused rather than answered as no cards.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A save lands even where the roster projection does not.",
    },
  ],
} as const satisfies Module
