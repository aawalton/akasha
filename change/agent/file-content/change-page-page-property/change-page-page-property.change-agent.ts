import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const changePagePageProperty = {
  id: "01a07932-2568-7c41-8097-885a9fc34263",
  type: "page-type/change-agent",
  slug: "change-page-page-property",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition:
    "the whole value of a property of a page stated anew, by the mechanical change fitting it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which mechanical change fits is read from the property the key names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key naming a relation is handed to the mechanical change for a relation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other key is handed to the mechanical change stating one key anew.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key the page's type declares a number or a boolean is handed on told it holds that kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value under the key is stated anew whole rather than a passage of it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key with many values is refused here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key the page's type declares many-valued is refused here whether or not the page states it yet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A place given beside the key states the value at that place rather than the key whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place given for a key holding one value is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place given for a key naming a relation is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place that is no whole number is refused before the page is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The refusal for many values names the changes putting a value in and taking a value out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names stating one of those values at its place as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That refusal spells the line `add-property-values` takes for the page and key refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Its help says `place` counts values from 1 and that the values around one keep their order.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here puts a value in among many or takes one out, so no place shifts.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
