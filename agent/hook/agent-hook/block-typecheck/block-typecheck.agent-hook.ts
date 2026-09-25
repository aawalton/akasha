import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockTypecheck = {
  id: "01a058d6-293d-7bd0-8774-23b6112680f6",
  type: "page-type/agent-hook",
  slug: "block-typecheck",
  definition: "a refusal of the typecheck calls an agent makes outside the akasha commands",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every `tsc` call the line holds is refused whether the call names a file or names no file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `bun typecheck` and a `bun run typecheck` are refused with `tsc`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names `akasha audit --check typecheck`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tsc reached by a path is the same call and is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tsc reached through a runner is the same call and is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide a `tsc` from this hook.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag before the script name does not hide a `bun run typecheck`.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The repository's own `tsconfig.json` names no file.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A `tsc` run at the repository root compiles no file and exits 2.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "That run's only error is the empty `files` list, so no fault in the code draws an error.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A package script reaching a compiler is not read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `tsgo` call is refused as a `tsc` call is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A `ts-node` call told to check types is refused, and one not told is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A compiler's own file run by `node` or `bun` is the same call and is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A compiler call another program builds, as `xargs tsc` is, is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A compiler call another program builds writes nothing and at worst reports a false success.",
    },
  ],
} as const satisfies AgentHook
