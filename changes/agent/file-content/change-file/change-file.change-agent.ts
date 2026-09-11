import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const changeFile = {
  id: "01a07813-6e3d-7d39-a28a-164766ab0fed",
  type: "change-agent",
  slug: "change-file",
  changeMode: "change-mode-change",
  definition: "one passage of one body replaced, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The passage and the replacement are two arguments.",
    },
    {
      invariantKind: "departure",
      statement: "A passage drops the newline its fence leaves on the last line.",
    },
    {
      invariantKind: "departure",
      statement: "A body keeps the newline its fence leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A passage whose fence closed with `no-newline` is left as the caller wrote it.",
    },
    {
      invariantKind: "departure",
      statement: "A passage ending in a newline is written with a blank line before its fence.",
    },
    {
      invariantKind: "departure",
      statement: "Working the passage is left to the change reached.",
    },
    {
      invariantKind: "departure",
      statement: "That change is the one for the kind of body the path has.",
    },
    {
      invariantKind: "departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming a file a machine writes is refused rather than edited.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the code to change where a group writes the file.",
    },
    {
      invariantKind: "departure",
      statement: "Only the path the caller names here is judged that way.",
    },
    {
      invariantKind: "absence",
      statement: "No change a mechanism reaches passes through this refusal.",
    },
  ],
  changeKind: "change-authored",
} as const satisfies ChangeAgent
