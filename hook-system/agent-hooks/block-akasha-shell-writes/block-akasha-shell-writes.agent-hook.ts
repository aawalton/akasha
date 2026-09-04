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
        "A command that makes or takes away a file is judged on every path the command names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A prefix that only runs the call behind the prefix does not hide the call from this hook.",
    },
    {
      invariantKind: "departure",
      statement: "A program's own text is not read.",
    },
    {
      invariantKind: "departure",
      statement: "A read through a program is not parted from a write through the program.",
    },
    {
      invariantKind: "departure",
      statement: "An interpreter is judged on every path the call handing it a program names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A removal naming a symlink itself is judged where the link is rather than where the link points.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming a symlink itself ends in the symlink's own name.",
    },
    {
      invariantKind: "departure",
      statement: "A landing the repository ignores is not guarded.",
    },
    {
      invariantKind: "departure",
      statement: "A landing inside the index is judged where the path points.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing inside the index is guarded even where the repository ignores that landing.",
    },
    {
      invariantKind: "departure",
      statement:
        "What the repository ignores is asked only over a landing that would otherwise be refused.",
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
      statement: "A call another program builds is hidden from this hook as `sh -c` hides a call.",
    },
    {
      invariantKind: "gap",
      statement: "A path a word stands for rather than spells is judged as a spelled one is.",
    },
  ],
} as const satisfies AgentHook
