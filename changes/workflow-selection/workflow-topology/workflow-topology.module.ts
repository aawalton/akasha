import type { Module } from "@akasha/code-system/module"

export const workflowTopology = {
  id: "01a0685e-023f-7007-8909-b071454d25c3",
  pageTypeSlug: "module",
  slug: "workflow-topology",
  definition:
    "the selected workflows put in dependency order, and whether carrying more over leaves an order possible",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workflow stands after every selected workflow it depends on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dependency on a workflow that was not selected is passed over rather than failing the sort.",
    },
    {
      invariantKind: "departure",
      statement: "Workflows free to run stand in the order they were declared in.",
    },
    {
      invariantKind: "departure",
      statement: "A cycle among the selected workflows throws, and names the ring it found.",
    },
    {
      invariantKind: "departure",
      statement: "A cycle a carried-over workflow would close is answered without throwing.",
    },
  ],
} as const satisfies Module
