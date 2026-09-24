import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionAddress = {
  id: "01a0d47b-69f6-7148-8788-0b66c90ea8b7",
  type: "page-type/module",
  slug: "companion-address",
  definition: "how a page names the companion it is about",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A temper page names its companion by the address of that companion's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The companion id an address names is the slug of the page at that address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bare companion id reads back as that same id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An address naming no companion the catalogue knows reads back as no companion id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page about one companion takes the companion's id as its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page about one companion takes the companion's name as its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion the catalogue does not know takes its id as its title.",
    },
  ],
} as const satisfies Module
