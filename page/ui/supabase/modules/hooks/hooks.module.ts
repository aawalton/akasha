import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hooks = {
  id: "01a06205-4f3b-7004-be48-0732dc16b0d9",
  type: "page-type/module",
  slug: "hooks",
  definition:
    "Reading pages from supabase: one by id suffix, all of a type, related ones, and a nav's views.",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The views a nav item holds are asked for by that nav item's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item whose slug went unread narrows the views to none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A related page is asked of the page type its definition names by slug before by id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A related page is read from the store's collection rather than asked of the service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages the relations name are acquired into the store before they are read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Related pages are shown only once their own question has been answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page read by id suffix is shown only once its own question has been answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page or its related pages read again start from what was last read for the same question.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A related page of a page type the reader may not read is never asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation to such a page is drawn as the name its address ends in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page sharing a named page's slug in another scope is no related page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type a relation names a hundred pages of or fewer is read for those alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type a relation names more pages of is read whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The views a page type holds are asked for by that page type's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A view another page type embeds is none of the views the page type it lists holds.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "One page type is read alone by its slug rather than with every page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Page types read by name are ready only once they have been read from the store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Page types read by name again start from the ones last read under those names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type's line is asked for type by type, each after the type extending it.",
    },
  ],
} as const satisfies Module
