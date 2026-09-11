import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const bashCallWeighing = {
  id: "01a0925a-998e-7907-84cc-2bd7c9823491",
  type: "shell-script",
  slug: "bash-call-weighing",
  definition: "what weighs one bash call from inside that call's own shell",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The script is read into the shell a bash call runs in rather than run on its own.",
    },
    {
      invariantKind: "departure",
      statement: "The file one line is appended to and that line's opening are handed in as words.",
    },
    {
      invariantKind: "departure",
      statement: "The shell joins a control group made for that one call.",
    },
    {
      invariantKind: "departure",
      statement:
        "That group is made under the nearest group above delegating processor and memory.",
    },
    {
      invariantKind: "departure",
      statement: "The group bounds the shell together with everything that shell starts.",
    },
    {
      invariantKind: "departure",
      statement: "What the call spent is read as the call ends, by a trap the shell runs at exit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A trap runs where the command exited of its own accord as well as where it ran out.",
    },
    {
      invariantKind: "departure",
      statement: "The shell leaves the group before the group is read and taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A subshell reaching the trap writes nothing, since the call is the shell's own.",
    },
    {
      invariantKind: "departure",
      statement: "A shell on a machine delegating neither is weighed from its own kernel counters.",
    },
    {
      invariantKind: "departure",
      statement: "Those counters carry the seconds the shell's reaped children spent.",
    },
    {
      invariantKind: "departure",
      statement: "A call weighed that way states that its peak was not measured.",
    },
    {
      invariantKind: "departure",
      statement:
        "The peak a group reached is the memory the call added, since a shell starts holding nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every second the call spent is a child's, since the shell is not the process recording.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says on either stream.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the status the command left.",
    },
    {
      invariantKind: "departure",
      statement: "A step that would not run leaves the call as the call was.",
    },
    {
      invariantKind: "gap",
      statement: "A command putting an exit trap of its own in place is weighed by nothing.",
    },
    {
      invariantKind: "gap",
      statement: "The group such a call left behind is swept by whoever opens the next call.",
    },
  ],
} as const satisfies ShellScript
