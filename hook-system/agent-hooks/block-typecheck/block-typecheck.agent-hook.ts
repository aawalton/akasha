import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockTypecheck = {
  id: "01a058d6-293d-7bd0-8774-23b6112680f6",
  pageTypeSlug: "agent-hook",
  slug: "block-typecheck",
  definition: "a refusal of the typecheck calls an agent makes outside the akasha commands",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every `tsc` call is refused whether it names a file or none.",
    },
    {
      invariantKind: "departure",
      statement: "A `bun typecheck` and a `bun run typecheck` are refused with `tsc`.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names `akasha audit --check typecheck`.",
    },
    {
      invariantKind: "departure",
      statement: "Tsc reached by a path is the same call and is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Tsc reached through a runner is the same call and is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix that only runs the call behind it does not hide a `tsc` from this hook.",
    },
    {
      invariantKind: "departure",
      statement: "A flag before the script name does not hide a `bun run typecheck`.",
    },
    {
      invariantKind: "constraint",
      statement: "The repository's own `tsconfig.json` names no file.",
    },
    {
      invariantKind: "constraint",
      statement: "A `tsc` run at the repository root compiles no file and exits 0.",
    },
    {
      invariantKind: "constraint",
      statement: "A check reporting success over no file reads exactly like one that passed.",
    },
    {
      invariantKind: "absence",
      statement: "A package script reaching a compiler is not read here.",
    },
    {
      invariantKind: "gap",
      statement: "`vue-tsc` and every other compiler wrapper is not named here.",
    },
  ],
} as const satisfies AgentHook
