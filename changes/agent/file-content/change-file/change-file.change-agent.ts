import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const changeFile = {
  id: "01a07813-6e3d-7d39-a28a-164766ab0fed",
  type: "change-agent",
  slug: "change-file",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "one passage of one body replaced, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The passage and the replacement are two arguments.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A passage drops the newline its fence leaves on the last line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body keeps the newline its fence leaves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A passage whose fence closed with `no-newline` is left as the caller wrote it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A passage ending in a newline is written with a blank line before its fence.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Working the passage is left to the change reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change is the one for the kind of body the path has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path naming a file a machine writes is refused rather than edited.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal names the code to change where a group writes the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the path the caller names here is judged that way.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No change a mechanism reaches passes through this refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A passage an earlier `change-file` draft wrote is found, so these stack on one path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A passage another kind of act drafted is not found, and that draft is dropped and made again.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
