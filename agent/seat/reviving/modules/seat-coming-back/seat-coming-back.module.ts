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
      statement: "A seat whose page is there already brings nothing back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat is found in history by the file its page is rather than by that file's folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page comes back to where seat pages sit now rather than to where it sat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page coming back lands as a change, so the index carries that page again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a seat said while its page was there is read elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name a seat answers to is answered without reading history at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name nothing brings back is refused as the resolver refused that name.",
    },
  ],
} as const satisfies Module
