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
      statement: "Every biome call is refused whether that call reads or writes.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names `akasha lint`.",
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
        "A prefix that only runs the call behind it does not hide a biome call from this hook.",
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
      statement: "`prettier` sits in node_modules and writes the same files.",
    },
    {
      invariantKind: "gap",
      statement: "`prettier` is not named here.",
    },
  ],
} as const satisfies AgentHook
