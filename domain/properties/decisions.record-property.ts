import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const decisions = {
  id: "01a04e14-2276-7559-823a-c7ac8abf852e",
  type: "page-type/record-property",
  slug: "decisions",
  propertySlug: "decisions",
  definition: "what must be true of a page, each with the sort it is",
  properties: [
    { pageProperty: "relation-property/decision-kind", required: true, many: false },
    {
      pageProperty: "standard-agent-english-property/decision-statement",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every decision.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry that is no decision kind is not an decision.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An decision states a truth rather than a reason.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An decision true of every page below a domain belongs to the domain.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Move When It Turns",
      act: "Move an decision to the property that fits, or delete it, as soon as its truth changes.",
      warrant:
        "Nothing re-reads an decision, so one filed where it no longer belongs misleads until tested.",
      aids: [
        "Check the whole claim, not just the case you met.",
        "Move it if still meant, delete it if not.",
      ],
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
