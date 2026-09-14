import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const appendLines = {
  id: "01a08c38-a17c-70de-985a-a097e3dced7d",
  type: "change-agent",
  slug: "append-lines",
  changeMode: "change-mode/change-mode-append",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "content put at the end of what one path holds, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The content is handed in rather than read off a file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument this change was handed no value for is refused by that key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Answering the append is left to the partial this change runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the body the path holds.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
