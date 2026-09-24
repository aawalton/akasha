import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addPropertyValue = {
  id: "01a07944-9edf-70c7-8101-db279ee5ea45",
  type: "page-type/change-agent",
  slug: "add-property-value",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "a value put into a page property, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  decisions: [
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
      statement: "Putting the value in is left to the mechanical change of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`after` is handed on where the caller states `after`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where the caller states no `after`, the key the page's own type puts this one after is handed on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether the property has one value is read from the type the page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page's type declares no property for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal over a slug the page's type declares a key for names the key to write instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is judged before any page is reached.",
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
      statement: "`after` is left out where the pages of this page's type write the key nowhere.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
