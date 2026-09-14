import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

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
      invariantKind: "invariant-kind/gap",
      statement: "Every biome call is refused whether that call reads or writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A biome call in the command word is refused whether it reads or writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names the apply rather than the draft as where the linter runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Biome reached by a path is the same call and is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Biome reached through a runner is the same call and is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide a biome call from this hook.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A package script reaching biome is not read here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No package script now reaches akasha.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A biome write reaches akasha content with no gate.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A biome write reaches akasha content with no index.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A biome write reaches akasha content with no commit.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "`prettier` reaching akasha content is refused as `biome` reaching it is.",
    },
  ],
} as const satisfies AgentHook
