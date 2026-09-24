import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addPropertyValues = {
  id: "01a08881-c01c-75fd-94e8-42afd3afb064",
  type: "page-type/change-agent",
  slug: "add-property-values",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "many values put into the properties their lines name, in one call",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line names a page and a key and the value put into that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value is the rest of the line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A single value is put in by a call of one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "`after`, `where`, `is` and `field` are stated once for a call and hold for every line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Lines needing different values of `after`, `where`, `is` or `field` are put in by separate calls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that is not a path and a key and a value parted by spaces is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line with nothing on it is read over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call handing in no line is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key naming a relation has its value resolved before any body is worked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value naming no page is refused where the key names a relation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bare name is written as the address of the page it reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address or an id is written as it was handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key naming no relation takes its value unresolved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether the property has one value is read from the type the page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is put in against the world the lines before it leave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal at any line refuses the whole call and names that line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call that refuses puts in no value at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Putting each value in is left to the mechanical change of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says where among a property's values a value lands.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`after` stated for a call is handed on for every line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key the page writes nowhere yet is put in where the pages of its type write it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`after` is left out where the pages of that type write the key nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is judged before any page is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page's type declares no property for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That refusal names `where`, `is` and `field` as the way to a list field inside a record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose type cannot be read has no key refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a property holds is read from the type the page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property holding a boolean or a number is handed on as holding it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal over a slug the page's type declares a key for names the key to write instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "`where` and `is` reach the one record under a line's key whose `where` field states the text `is`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`field` names the list field inside that record the value is put into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`where`, `is` or `field` stated without the other two is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the record property's page does not declare as a list is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value put into a record's field is resolved and spelled by that field's own property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`after` stated with a record is refused rather than dropped.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
