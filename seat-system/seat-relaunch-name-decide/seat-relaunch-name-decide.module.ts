import type { Module } from "@akasha/code/module"

export const seatRelaunchNameDecide = {
  id: "01a0686d-9d5e-700f-b204-fb26482a5d38",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-relaunch-name-decide",
  definition: "which name a seat being relaunched comes back under",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name already on the seat's row is the name that seat comes back under.",
    },
    {
      invariantKind: "departure",
      statement: "A name stated by the caller binds only where the row has no name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat with a name on neither the row nor the call needs a name before that seat relaunches.",
    },
  ],
} as const satisfies Module
