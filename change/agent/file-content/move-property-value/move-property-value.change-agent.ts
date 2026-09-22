import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const movePropertyValue = {
  id: "01a09523-3d2f-7e8b-885b-e4fc2e8a3222",
  type: "page-type/change-agent",
  slug: "move-property-value",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition:
    "a value carried into place in the list a page property holds, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value carried is named by its place or by a field that value states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The place it goes to is named by a place or by the value already holding it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming the value both ways is refused rather than read one way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming the place it goes to neither way is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`onto` is read under the field `where` names, so a call saying it says both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place that is no whole number is refused before the page is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Carrying the value is left to the mechanical change of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No value carried is resolved.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
