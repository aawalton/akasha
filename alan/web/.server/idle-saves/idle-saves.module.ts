import type { Module } from "@akasha/code/module"

export const idleSaves = {
  id: "01a0655e-d39b-7622-a70b-508466de5c7c",
  pageTypeSlug: "module",
  type: "module",
  slug: "idle-saves",
  definition: "a player's idle save read from and written to Supabase",
  code: "ts",
  invariants: [
    { invariantKind: "gap", statement: "`idle-save` is no page type the pages system holds." },
    {
      invariantKind: "departure",
      statement: "A save that went unread is refused rather than answered as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A save that did not land is refused rather than answered as written.",
    },
  ],
} as const satisfies Module
