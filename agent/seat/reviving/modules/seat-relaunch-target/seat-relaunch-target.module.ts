import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatRelaunchTarget = {
  id: "01a0686d-9d5e-7010-afb5-aba89bff0cd0",
  type: "module",
  slug: "seat-relaunch-target",
  definition: "the name, account, start mode, presence and session a seat is put back up from",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's page is read before its history.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The history answers only where no page stands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat remembered only from history is absent and has no session.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Presence is asked by id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One answer serves a seat standing and a seat gone alike.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value stated as an empty string is read as nothing stated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The mode a seat states it starts in is answered beside that seat's name.",
    },
  ],
} as const satisfies Module
