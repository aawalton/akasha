import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployAddonSourcing = {
  id: "01a0d96c-0da1-7bef-b1f9-703fe91d9379",
  type: "page-type/module",
  slug: "deploy-addon-sourcing",
  definition: "the files an addon bundle is built from, and one hash over what they hold",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The files are read from the commit rather than from the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file in every addon's folder is one the bundle is built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file an addon's code imports is one the bundle is built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The build's own code and the compiler's are files the bundle is built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Temper's shared declarations and the compiler's settings are among them too.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No test is among the files a bundle is built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hash changes where any of those files changes and nowhere else.",
    },
  ],
} as const satisfies Module
