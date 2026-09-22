import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hostsEntering = {
  id: "01a0c97f-c3e5-7a4f-a97f-73954818b58a",
  type: "page-type/module",
  slug: "hosts-entering",
  definition: "the hosts file line a host page stating an address wants",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A host page stating an address wants that address answered for that host's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name answered is the host's title rather than the host's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a line already answers is read off that line rather than answered again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is appended, and no line already there is rewritten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What follows a hash on a line is no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is weighed against a line's names without regard to case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The line is handed to the shell as an argument rather than spelled into the script.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the hosts file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A host page stating no address wants no line.",
    },
  ],
} as const satisfies Module
