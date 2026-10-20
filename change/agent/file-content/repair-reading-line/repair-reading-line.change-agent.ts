import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const repairReadingLine = {
  id: "01a156a2-5661-7e36-9ff7-e1668a5eabb1",
  type: "page-type/change-agent",
  slug: "repair-reading-line",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "one line of a character's readings, paired with another line's build or taken out",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The character is handed in by its page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is picked by the start of its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pick matching no line, or more than one, is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line handed no source line is taken out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line handed a source line takes that line's build hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A line given another build hash takes the result that build and its reading name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source line reading the other bar is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new result some line holds already is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other line, and every key of the line changed, keeps its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A line taken out has its id, bar and capture instant put in the removed readings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character's page names its removed readings the first time one is put there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture whose line is gone already is recorded by its bar and capture instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture some line still holds is refused for that record.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change reaches no mechanical change.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
  createdAt: "2026-10-20T00:07:21.952Z",
  updatedAt: "2026-10-20T11:34:12.861Z",
} as const satisfies ChangeAgent
