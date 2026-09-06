import type { Module } from "@akasha/code-system/module"

export const seatForest = {
  id: "01a069bd-bdc5-755e-a5da-244f293078f7",
  pageTypeSlug: "module",
  slug: "seat-forest",
  definition: "every seat akasha holds, with each seat's principal and parent, as rows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row's mode is the mode observed of the supervisor holding that seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat nothing observed a mode of shows the mode it was started in.",
    },
  ],
} as const satisfies Module
