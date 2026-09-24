import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const removePropertyValue = {
  id: "01a07944-9ee0-7f93-a8d0-b0e845bdd929",
  type: "page-type/change-agent",
  slug: "remove-property-value",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "a value taken out of a page property, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No value taken out is resolved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value naming no page is taken out as any other value is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking the value out is left to the mechanical change of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking a file property's value out takes away the file that value names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That file goes in the same change, through the mechanical change removing a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value whose file holds no body is taken out alone, and the answer names that file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A value taken out of a record's list field takes no file away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page left named by no parent is refused by the checks rather than here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "`where`, `is` and `field` reach a list field of the one record whose `where` field states `is`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`where`, `is` or `field` stated without the other two is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the record property's page does not declare as a list is refused.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
