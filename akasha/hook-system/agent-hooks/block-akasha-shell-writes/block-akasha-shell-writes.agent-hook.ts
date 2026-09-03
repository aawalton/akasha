import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockAkashaShellWrites = {
  id: "01a04ee9-8899-7bf9-a3e7-3322e3b145d7",
  pageTypeSlug: "agent-hook",
  slug: "block-akasha-shell-writes",
  definition: "the hook refusing a shell write that lands inside akasha",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The guarded roots are the akasha folder and `.git/data`.",
    },
    {
      invariantKind: "departure",
      statement: "A copy is judged on where the copy puts things.",
    },
    {
      invariantKind: "departure",
      statement: "A move is judged on where the move puts things.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tool told to write the file the tool reads is judged on every path the tool names.",
    },
    {
      invariantKind: "departure",
      statement: "The flag saying so is what parts that tool from the same tool reading.",
    },
    {
      invariantKind: "departure",
      statement: "A descriptor redirected onto another descriptor is no path.",
    },
    {
      invariantKind: "departure",
      statement: "A descriptor redirected onto another descriptor is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command that makes, replaces or takes a file away is judged on every path it names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A prefix that only runs the call behind it does not hide the call from this hook.",
    },
    {
      invariantKind: "departure",
      statement:
        "A program's own text is not read, so a read through it is not parted from a write.",
    },
    {
      invariantKind: "departure",
      statement: "An interpreter is judged on every path the call handing it a program names.",
    },
    {
      invariantKind: "constraint",
      statement: "The ways a shell writes a file are sampled here rather than named in full.",
    },
    {
      invariantKind: "gap",
      statement: "No shell write reaches inside a guarded root.",
    },
    {
      invariantKind: "gap",
      statement: "A call another program builds is hidden from this hook as `sh -c` hides one.",
    },
    {
      invariantKind: "gap",
      statement: "A path a word stands for rather than spells is judged as a spelled one is.",
    },
  ],
} as const satisfies AgentHook
