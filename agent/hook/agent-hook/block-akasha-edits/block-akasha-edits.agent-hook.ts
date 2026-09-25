import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockAkashaEdits = {
  id: "01a04e17-0958-7be5-9b50-5a856c02c5a6",
  type: "page-type/agent-hook",
  slug: "block-akasha-edits",
  definition: "a refusal of an agent tool that writes into akasha",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Write", "Edit", "NotebookEdit"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call is refused for where the call writes rather than for what the call is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The guarded roots are the akasha folder, the folder git does not track, and the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing inside the index is answered with the rebuild.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing elsewhere under the folder git does not track is answered with the sweep.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No refusal over that folder names a change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is resolved against the working directory the call was made in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every symlink on a path is followed before the path is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path arrives as tool input and is never parsed out of text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No call of a tool named here reaches inside a guarded root.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A shell write is no business of this hook.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "`block-akasha-shell-writes` samples shell writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "There is no akasha command for a notebook.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload this cannot read judges nothing and exits so the dispatch passes.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "The Index Is Akasha",
      act: "Guard the index as the akasha folder is guarded.",
      warrant: "The pages and the index are two halves of one store.",
      aids: [
        "Derived state is still not yours to write.",
        "`akasha index refresh` is the one repair.",
      ],
    },
  ],
} as const satisfies AgentHook
