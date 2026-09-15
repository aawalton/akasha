import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceCapabilityList = {
  id: "01a0685e-fd50-72b2-a396-3f2715e4d3b4",
  type: "command",
  slug: "inference-capability-list",
  definition: "the command naming the image pool services and the mflux batch tools beside them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An image pool service is a pool member whose name opens with `image-`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each service is reported with its model path, its port and its route.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The route a service takes is read from the model type its command binds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service whose command binds `--model-type image-edit` takes the edits route.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other service takes the generations route.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The mflux tools are read off the env of the first image service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A host that will not answer is reported rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No image service declared is an empty answer rather than a refusal.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here changes the resident.",
    },
  ],
  name: "capability-list",
  arguments: [],
} as const satisfies Command
