import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const filePropertyDefs = {
  id: "01a05bd6-c530-72bb-9046-ba72f58fad9b",
  type: "page-type/module",
  slug: "file-property-defs",
  definition: "the property definitions a file-backed page type declares",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The property definitions a page type declares are asked of `@akasha/page-service`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An empty list is never answered for a page type that is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type nothing has is answered as null rather than as an empty list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape answered once is held until a change to its page type is pushed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every shape held is dropped when a lost stream is taken up again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape is held while no stream follows it, so a lost stream adds no load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a server follows the page types whose shapes it holds.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A browser drops a shape it holds when a change to that page type is pushed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape refused is asked for again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape has the property naming the account a page belongs to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A definition's type is how a value is rendered rather than the page type declaring that property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every property page type is named here beside the type a screen draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property page type named nowhere here is rendered as text.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No type a screen has no drawing for leaves here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An option stating no label of its own is labelled by titling its value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An option carries the color the property's page states for that option's value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation's definition names the page type it reaches by that page type's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition has a definition of its own for each field its property declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape read here is the service's own type rather than a copy of that type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action button's definition names the verb its property's page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A computed property naming a page type to reach is drawn as a relation is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition says it colors the titles only where its page type names it to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition has the icon of the page type its property is, however it is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A definition says it is answered only when asked by name where its property says so.",
    },
  ],
} as const satisfies Module
