import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const foundationHealth = {
  id: "01a0d969-51c4-72a6-b7b1-de41f6f1ad08",
  type: "page-type/module",
  slug: "foundation-health",
  definition: "whether the cluster holds every resource a cluster foundation's manifests emit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every cluster foundation page is watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A foundation is well where the cluster holds every resource the foundation's manifests emit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foundation runs no workload, so what the cluster holds is its only health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cluster is asked once for each foundation, handed every manifest it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifests are emitted from the checkout the watcher reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foundation reads as broken with what the cluster said it lacks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foundation whose manifests could not be made is broken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks whether a resource matches its manifest.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a verdict or changes the cluster.",
    },
  ],
} as const satisfies Module
