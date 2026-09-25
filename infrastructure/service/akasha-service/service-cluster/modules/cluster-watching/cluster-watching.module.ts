import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clusterWatching = {
  id: "01a0d4b9-5629-7cf5-bf0f-9147f31e2b6b",
  type: "page-type/module",
  slug: "cluster-watching",
  definition:
    "the run leaving each page the cluster answers for carrying whether that service is well",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every cluster service whose verdict changed is left carrying this run's finding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "So is every vendored workload, every cluster foundation and every web app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Foundations and web apps are looked at only once the cluster answered for its workloads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This run's own page is left carrying the moment this run looked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster that could not be read ends the run rather than leaving any verdict.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run says each verdict it wrote, and why a service it found broken is broken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here tells a persona that a cluster service is broken.",
    },
  ],
} as const satisfies Module
