import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const k8sWebService = {
  id: "01a08e73-15ce-72a4-b041-35203781f62c",
  type: "module",
  slug: "k8s-web-service",
  definition: "the in-cluster Service a web app is reached on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A web app is reached inside the cluster rather than from outside it.",
    },
    {
      invariantKind: "departure",
      statement: "Every web app answers on one port, named once here.",
    },
    {
      invariantKind: "departure",
      statement: "The labels a Service selects on are handed in beside the labels it carries.",
    },
  ],
} as const satisfies Module
