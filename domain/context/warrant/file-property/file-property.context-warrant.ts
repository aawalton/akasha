import type { ContextWarrant } from "akasha/domain/context/warrant/context-warrant.page-type.types.ts"

export const fileProperty = {
  id: "01a04f58-a7ef-7000-90c5-261b47c03601",
  type: "page-type/context-warrant",
  slug: "file-property",
  definition: "what a seat must read for the properties the page states",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page warrants the page property type of every property the page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page warrants nothing for a property the page does not state.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "`Never Depend On Everything` refuses this warrant a loader edge, which would reach every page.",
    },
  ],
} as const satisfies ContextWarrant
