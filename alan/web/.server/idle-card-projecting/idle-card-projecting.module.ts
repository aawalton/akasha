import type { Module } from "@akasha/code/module"

export const idleCardProjecting = {
  id: "01a0655e-d39a-72dd-abce-5eb2011bcc76",
  pageTypeSlug: "module",
  type: "module",
  slug: "idle-card-projecting",
  definition: "a player's persona cards written into the page store from their save",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "`idle-persona-card` is no page type the pages system holds.",
    },
    {
      invariantKind: "departure",
      statement: "A roster that went unwritten is refused rather than answered as no cards.",
    },
    {
      invariantKind: "departure",
      statement: "A save lands even where the roster projection does not.",
    },
  ],
} as const satisfies Module
