import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const subagentStopped = {
  id: "01a09c51-0af1-7b79-8b0d-282cd0e95b9d",
  type: "boolean-property",
  slug: "subagent-stopped",
  propertySlug: "stopped",
  definition: "whether a subagent was stopped from the agents panel",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent nobody stopped states this neither way.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent stopped this way is refused every model turn it asks for after that.",
    },
    {
      invariantKind: "departure",
      statement: "The stop reaches the subagent at the next model turn that subagent asks for.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent inside a tool call finishes that call before the stop reaches it.",
    },
    {
      invariantKind: "departure",
      statement: "A stop written here outlives a restart of the proxy refusing the turns.",
    },
    {
      invariantKind: "departure",
      statement: "A stop outlives that restart only while the page it is beside is there.",
    },
    {
      invariantKind: "departure",
      statement: "A stop written here reads the subagent's page as stale to the sweep.",
    },
    {
      invariantKind: "departure",
      statement: "A stop written here goes with the subagent's page.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
