import type { Command } from "@akasha/command-system/command"

export const pipelineShow = {
  id: "01a06810-9439-7723-a1f8-60ee89e12251",
  pageTypeSlug: "command",
  slug: "pipeline-show",
  definition: "the command stating one pipeline's own fields and how its workflows stand",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<seq>", takes: "the pipeline to state, named by its seq" },
    { said: "--json", takes: "give one object rather than tab-separated key and value lines" },
  ],
  helpNotes: [
    "a seq is allocated per page type, so a pipeline seq and a seq of any other type are unrelated numbers that look alike.",
    "the workflows are counted by status rather than named, which is what `pipeline-workflows` does.",
    "a capacity wait is named only where a step is queued on a node, and it is a queue rather than a wedge.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq is the pipeline's own rather than a number shared across page types.",
    },
    {
      invariantKind: "departure",
      statement: "A seq no pipeline stands at is the data's trouble rather than the caller's.",
    },
    {
      invariantKind: "departure",
      statement: "The workflows are given as a count for each status they stand at.",
    },
    {
      invariantKind: "departure",
      statement: "A field the pipeline does not carry is left out rather than given as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A capacity wait is counted from the steps dispatching that name a wait reason.",
    },
    {
      invariantKind: "departure",
      statement: "A capacity wait is said only where at least one step is waiting.",
    },
    {
      invariantKind: "departure",
      statement: "The nodes a wait names are given once each and in order.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a workflow or a step.",
    },
  ],
} as const satisfies Command
