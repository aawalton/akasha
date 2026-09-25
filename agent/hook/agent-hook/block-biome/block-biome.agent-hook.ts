import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockBiome = {
  id: "01a04edf-d739-7000-8634-f401edc3f875",
  type: "page-type/agent-hook",
  slug: "block-biome",
  definition:
    "a refusal of the biome and prettier calls an agent makes outside the akasha commands",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every biome call the line holds is refused whether that call reads or writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`prettier` reaching akasha content is refused as `biome` reaching it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script node runs is read as the program its name says, less its extension.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the apply rather than the draft as where the linter runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Biome reached by a path is the same call and is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Biome reached through a runner is the same call and is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide a biome call from this hook.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A package script reaching biome is not read here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No package script now reaches akasha.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A biome write reaches akasha content with no gate.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A biome write reaches akasha content with no index.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A biome write reaches akasha content with no commit.",
    },
  ],
} as const satisfies AgentHook
