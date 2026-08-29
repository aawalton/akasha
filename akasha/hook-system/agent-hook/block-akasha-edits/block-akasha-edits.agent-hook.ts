import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockAkashaEdits = {
  id: "01a04e17-0958-7be5-9b50-5a856c02c5a6",
  pageTypeSlug: "agent-hook",
  slug: "block-akasha-edits",
  definition: "the hook refusing a Write, an Edit or a NotebookEdit that lands inside akasha",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Write", "Edit", "NotebookEdit"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call is refused for where it writes, never for what it is.",
    },
    {
      invariantKind: "departure",
      statement: "The guarded roots are the akasha folder and `.git/data`.",
    },
    {
      invariantKind: "departure",
      statement: "A path is resolved against the working directory the call was made in.",
    },
    {
      invariantKind: "departure",
      statement: "Every symlink on a path is followed before the path is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A path arrives as tool input, and is never parsed out of text.",
    },
    {
      invariantKind: "departure",
      statement: "No call of a tool named here reaches inside a guarded root.",
    },
    {
      invariantKind: "absence",
      statement: "A shell write is no business of this hook.",
    },
    {
      invariantKind: "absence",
      statement: "There is no akasha command for a notebook.",
    },
    {
      invariantKind: "gap",
      statement: "An agent refused here still writes the file the akasha command reads.",
    },
  ],
  rules: [
    {
      name: "The Index Is Akasha",
      act: "Guard `.git/data` as the akasha folder is guarded.",
      warrant:
        "The pages and the index are two halves of one store, and a hand-written index cost three outages in one day.",
      aids: [
        "The index is derived state, and is still not yours to write.",
        "`akasha index refresh` is the sanctioned repair, and nothing else writes there.",
      ],
    },
  ],
} as const satisfies AgentHook
