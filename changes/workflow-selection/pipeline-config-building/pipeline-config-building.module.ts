import type { Module } from "@akasha/code-system/module"

export const pipelineConfigBuilding = {
  id: "01a0685e-023f-700a-9b18-be926538b10b",
  pageTypeSlug: "module",
  slug: "pipeline-config-building",
  definition:
    "a pipeline's workflow declarations and a workflow's step declarations built out of what the pages hold",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workflow the pages call disabled is left out of the declarations entirely.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration naming nothing is left out rather than named for its position.",
    },
    {
      invariantKind: "departure",
      statement:
        "A field of the wrong type is left unstated rather than carried through as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "An inputs hash is carried only where it is twelve lower-case hex digits.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pipeline naming which checks to run narrows the check workflow's steps and no other workflow's.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline page that was not read yields no commit and narrows nothing.",
    },
  ],
} as const satisfies Module
