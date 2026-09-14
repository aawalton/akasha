import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const removeFile = {
  id: "01a07991-8989-7000-8e13-06e6791ebefb",
  type: "change-agent",
  slug: "remove-file",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one file taken away, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page file is refused here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal for a page file names the change that takes a page away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page file is read from the path against the page types the index has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path naming a page type that is no page type is no page file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path that is no page file is handed to the change taking that kind of path away.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No file beside the path is taken away here.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
