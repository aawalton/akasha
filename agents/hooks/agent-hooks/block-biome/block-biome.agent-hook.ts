import type { AgentHook } from "akasha/agents/hooks/agent-hooks/agent-hook.page-type.types.ts"

export const blockBiome = {
  id: "01a04edf-d739-7000-8634-f401edc3f875",
  type: "agent-hook",
  slug: "block-biome",
  definition: "a refusal of the biome calls an agent makes outside the akasha commands",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every biome call is refused whether that call reads or writes.",
    },
    {
      invariantKind: "departure",
      statement: "A biome call in the command word is refused whether it reads or writes.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the apply rather than the draft as where the linter runs.",
    },
    {
      invariantKind: "departure",
      statement: "Biome reached by a path is the same call and is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Biome reached through a runner is the same call and is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide a biome call from this hook.",
    },
    {
      invariantKind: "absence",
      statement: "A package script reaching biome is not read here.",
    },
    {
      invariantKind: "absence",
      statement: "No package script now reaches akasha.",
    },
    {
      invariantKind: "constraint",
      statement: "A biome write reaches akasha content with no gate.",
    },
    {
      invariantKind: "constraint",
      statement: "A biome write reaches akasha content with no index.",
    },
    {
      invariantKind: "constraint",
      statement: "A biome write reaches akasha content with no commit.",
    },
    {
      invariantKind: "gap",
      statement: "`prettier` reaching akasha content is refused as `biome` reaching it is.",
    },
  ],
} as const satisfies AgentHook
