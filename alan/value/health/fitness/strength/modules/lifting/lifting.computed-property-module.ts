import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const lifting = {
  id: "01a0c430-b805-7a8b-9fe8-22a00d76e851",
  type: "page-type/computed-property-module",
  slug: "lifting",
  definition: "the load a set of work moves",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One arithmetic answers what a set moved, wherever that answer is wanted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set is worth the load it moves once for each rep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The load counts the weight once for each implement held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The load counts the share of the lifter's own weight the movement carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An assisted set's load is that share less the weight once for each implement.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page.",
    },
  ],
  createdAt: "2026-09-21T13:38:42.309Z",
  updatedAt: "2026-10-09T12:01:13.175Z",
} as const satisfies ComputedPropertyModule
