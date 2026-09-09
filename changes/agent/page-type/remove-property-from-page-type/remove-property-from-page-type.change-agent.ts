import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const removePropertyFromPageType = {
  id: "01a08287-d90b-7f07-9a9e-bf6209c40126",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "remove-property-from-page-type",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one page property taken off one page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property goes from the page type's data and from its type in one answer.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration taken out is the one naming that property.",
    },
    {
      invariantKind: "departure",
      statement: "The property goes from among the page type's parts in the same answer.",
    },
    {
      invariantKind: "departure",
      statement: "The part taken out is keyed `parts` rather than looked for under a second key.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type that declares a property without parting it loses the declaration alone.",
    },
    {
      invariantKind: "departure",
      statement: "A property no page type declares after this goes in the same landing.",
    },
    {
      invariantKind: "departure",
      statement: "The member taken out is the one keyed by the key the property answers to.",
    },
    {
      invariantKind: "departure",
      statement: "The object type worked is the one the page type's slug names.",
    },
    {
      invariantKind: "departure",
      statement: "The member goes first, then the part, then the declaration.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming no page property is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no page type is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from a change this reaches is the refusal this gives.",
    },
    {
      invariantKind: "departure",
      statement: "Each edit is worked out over the body the edit before it left.",
    },
    {
      invariantKind: "departure",
      statement: "Taking each part out is left to the mechanical changes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spells an import, the mechanical taking that import away.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page of the type the property was declared on.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
