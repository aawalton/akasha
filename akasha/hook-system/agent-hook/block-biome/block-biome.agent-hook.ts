import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockBiome = {
  id: "01a04edf-d739-7000-8634-f401edc3f875",
  pageTypeSlug: "agent-hook",
  slug: "block-biome",
  definition: "a refusal of the biome calls an agent makes outside the akasha commands",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every biome call is refused whether it reads or writes.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names `akasha lint`.",
    },
    {
      invariantKind: "departure",
      statement: "Biome reached by a path or through a runner is the same call and is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call running outside the repository this hook stands in is let through.",
    },
    {
      invariantKind: "departure",
      statement: "What this does not reach is printed by the hook and asked for with `--scope`.",
    },
    {
      invariantKind: "absence",
      statement: "A package script reaching biome is not read here.",
    },
    {
      invariantKind: "absence",
      statement: "No package script standing now reaches akasha.",
    },
    {
      invariantKind: "constraint",
      statement: "A biome write reaches akasha content with no gate and no index and no commit.",
    },
    {
      invariantKind: "gap",
      statement:
        "`prettier` stands in node_modules and writes the same files and is not named here.",
    },
  ],
} as const satisfies AgentHook
