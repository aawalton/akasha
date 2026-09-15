import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceWanScore = {
  id: "01a093fb-9d2a-7ffc-a042-a59588f4a83d",
  type: "page-type/command",
  slug: "inference-wan-score",
  definition: "the command measuring each frame's cosine against a reference identity",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every word this takes is a flag or a flag's value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag this does not take is refused rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One row is answered for each frame and nothing beside those rows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each row carries its frame's cosine and whether that cosine clears the floor.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A reference no face is found in is answered against the data rather than the caller.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the GPU.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the `:Z` relabelling podman did to the mounted directories.",
    },
  ],
  name: "score",
  arguments: [
    { argument: "argument/frames-dir", required: true },
    { argument: "argument/reference", required: true },
    { argument: "argument/floor" },
  ],
} as const satisfies Command
