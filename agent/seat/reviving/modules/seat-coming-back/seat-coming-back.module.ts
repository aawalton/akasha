import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatComingBack = {
  id: "01a0a502-1586-777f-84c7-0d2a1f147ede",
  type: "page-type/module",
  slug: "seat-coming-back",
  definition: "a seat composed again from what its page said before that page was taken away",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat comes back from what the commit that took its page away left there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page is composed again from those values rather than written back as it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is composed where a seat's body is composed rather than laid out here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value written under a name pages have left is read under the name pages have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that comes back keeps the id and the session that seat had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Why a seat's page went is no part of whether that page comes back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name no commit ever took a page away from brings nothing back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose page is there already brings nothing back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is looked for in history at the one path a seat page has now.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A page taken away from any other path brings nothing back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page coming back is asked of the pages service rather than landed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That ask lands as a change, so the index carries that page again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The origin that ask reaches is the origin a message send reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write names its writer as a name and an address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit that ask makes says which commit the page came back from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands a commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a seat said while its page was there is read elsewhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a seat answers to is answered without reading history at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name nothing brings back is refused as the resolver refused that name.",
    },
  ],
} as const satisfies Module
