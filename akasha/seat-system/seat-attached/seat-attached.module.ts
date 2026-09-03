import type { Module } from "@akasha/code-system/module"

export const seatAttached = {
  id: "01a06867-7fc9-7000-b4f5-99ed36960581",
  pageTypeSlug: "module",
  slug: "seat-attached",
  definition: "whether a terminal is attached to a seat, read from the sessions tmux names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A seat is attached when tmux names a client on the session the seat is named for.",
    },
    {
      invariantKind: "departure",
      statement: "A tmux that cannot be reached answers unknown rather than answers absent.",
    },
    {
      invariantKind: "departure",
      statement:
        "Unknown and absent are told apart, because a seat nobody watches is not a seat nothing can be read of.",
    },
    {
      invariantKind: "departure",
      statement: "The sessions are read again only once the held reading is older than its span.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a seat's page.",
    },
  ],
} as const satisfies Module
