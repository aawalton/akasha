import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockWorldBuilderLore = {
  id: "01a0d48d-4190-7704-af85-12a49bf3e2d4",
  type: "page-type/agent-hook",
  slug: "block-world-builder-lore",
  definition: "a refusal of a game master's call reaching lore the world builder holds",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Read", "Grep", "Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call is judged only where the caller's seat is a game master's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other caller is let through before any path is looked at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Read is refused where its path lands on a withheld page or a copy of one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Grep is refused where its path, or the folder it runs in, holds a withheld page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Bash call is refused where its line reaches a withheld page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal says to ask the world builder, and names nothing from the page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A Glob is not judged here, since a listing shows names and no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A game master's shell reaches no withheld page, since `withheld-hiding` hides each from it.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A game master's Read or Grep reaches no copy of a withheld page, as in a transcript.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "No local server answers a game master's browser with a withheld page.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "No akasha command a game master runs outside the shell's confinement prints lore.",
    },
  ],
} as const satisfies AgentHook
