import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const k8sWebService = {
  id: "01a08e73-15ce-72a4-b041-35203781f62c",
  type: "page-type/module",
  slug: "k8s-web-service",
  definition: "a web app's in-cluster Service",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app is reached inside the cluster rather than from outside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app's Service answers on the container port its cluster service states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The labels a Service selects on are handed in beside the labels it carries.",
    },
  ],
} as const satisfies Module
