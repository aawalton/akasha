import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const workloadApplying = {
  id: "01a08ce6-65f4-7bdd-adf3-0187b1b35936",
  type: "module",
  slug: "workload-applying",
  definition: "the cluster service a slug names, and what putting that service up reports",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cluster service is named by the slug its page carries.",
    },
    {
      invariantKind: "departure",
      statement: "The page a slug names is the page the index answers for that slug.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no cluster service page carries is refused by name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A slug more than one cluster service page carries is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page short of the values an apply rests on is refused by naming the values the page wants.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster service naming a manifest no page carries is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest page whose code file is not there is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest carrying a value nothing filled in is refused before anything is applied.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster already as the cluster service's page describes is applied nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reports the plan the run would carry out and applies nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A kubectl that refuses makes the apply refuse.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the command line.",
    },
    {
      invariantKind: "departure",
      statement: "An image the registry lacks is built before the manifests naming it are applied.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run says which image would be built and builds none.",
    },
  ],
} as const satisfies Module
