import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatComingBack = {
  id: "01a0a502-1586-777f-84c7-0d2a1f147ede",
  type: "module",
  slug: "seat-coming-back",
  definition: "a seat's page put back as the commit that took that page away left it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat comes back as the commit that took its page away left that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat that comes back keeps the id and the session that seat had.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Why a seat's page went is no part of whether that page comes back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name no commit ever took a page away from brings nothing back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page coming back lands as a change, so the index carries that page again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a seat said while its page was there is read elsewhere.",
    },
  ],
} as const satisfies Module
