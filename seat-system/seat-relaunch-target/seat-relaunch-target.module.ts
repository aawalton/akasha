import type { Module } from "@akasha/code-system/module"

export const seatRelaunchTarget = {
  id: "01a0686d-9d5e-7010-afb5-aba89bff0cd0",
  pageTypeSlug: "module",
  slug: "seat-relaunch-target",
  definition: "the name, account, presence and session a seat is stood back up from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A seat's page is read before its history, the history answering only where no page stands.",
    },
    {
      invariantKind: "departure",
      statement: "A seat remembered only from history is absent and holds no session.",
    },
    {
      invariantKind: "departure",
      statement:
        "Presence is asked by id, one answer serving a seat standing and a seat gone alike.",
    },
    {
      invariantKind: "departure",
      statement: "A value stated as an empty string is read as nothing stated.",
    },
  ],
} as const satisfies Module
