import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertySignatureRenaming = {
  id: "01a09c41-1b28-7033-a7fb-706359938013",
  type: "page-type/module",
  slug: "property-signature-renaming",
  definition: "a property a type declares spelled anew wherever the checker resolves to it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The property respelled is named as the type it sits on and then the property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property name with no type is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star in place of the type names every type the file declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star is asked for rather than fallen into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type that is a union or an intersection states every property its parts state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file declaring no type at all is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file whose types state that property nowhere is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type already stating the name asked for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property declared outside the file as well is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bodies read are the bodies the world answers rather than the bodies on disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a change.",
    },
  ],
} as const satisfies Module
