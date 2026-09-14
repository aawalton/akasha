import type { AgentHook } from "akasha/agents/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockAkashaShellWrites = {
  id: "01a04ee9-8899-7bf9-a3e7-3322e3b145d7",
  type: "agent-hook",
  slug: "block-akasha-shell-writes",
  definition: "the hook refusing a shell write that lands inside akasha",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A copy is judged on where the copy puts things.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A move is judged on where the move puts things.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A tool told to write the file the tool reads is judged on every path the tool names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The flag saying so is what parts that tool from the same tool reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A descriptor redirected onto another descriptor is no path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A descriptor redirected onto another descriptor is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A redirect reading in names what a call is handed rather than where the call lands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A command that makes or takes away a file is judged on every path the command names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A prefix that only runs the call behind the prefix does not hide the call from this hook.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program's own text is not read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A redirect is read outside the body a heredoc carries rather than inside that body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body handed to a program is read for the paths that body names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call a heredoc body carries is data rather than a call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read through a program is not parted from a write through the program.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An interpreter is judged on every path the call handing that interpreter a program names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A removal naming a symlink itself is judged where the link is rather than where the link points.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A link made over a symlink itself and told not to follow it is judged where the link is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link made over a symlink without that flag is judged where the link points.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path naming a symlink itself ends in the symlink's own name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing the repository ignores is not guarded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing inside the index is judged where the path points.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A landing elsewhere under the folder git does not track is answered with the sweep.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That landing is guarded even where the repository ignores it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No refusal over that folder names a change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A landing inside the index is guarded even where the repository ignores that landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The repository's ignore rules are read only over a landing that would otherwise be refused.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The ways a shell writes a file are sampled here rather than named in full.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "No shell write reaches inside a guarded root.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A call another program builds is judged as a call written on the line is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A payload this cannot read judges nothing and exits so the dispatch refuses.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A payload that parses and is not an object is a payload this cannot read.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A path a word represents rather than spells is judged as a spelled path is.",
    },
  ],
} as const satisfies AgentHook
