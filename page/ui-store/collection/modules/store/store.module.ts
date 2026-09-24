import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const store = {
  id: "01a05b69-4546-733d-acfc-e02dbd8417b3",
  type: "page-type/module",
  slug: "store",
  definition: "the store reading and writing the page rows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape attaches for a signed-in reader rather than for a token the store holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A store told its owner needs no token, and a store told none reads one off a jwt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A store with no token arms no refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A site names the beside-the-page keys it wants carried, page type by page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type no site named that way is read without any of those keys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape naming pages by id or by slug reads those pages alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape naming pages is a shape apart from the whole page type's.",
    },
  ],
} as const satisfies Module
