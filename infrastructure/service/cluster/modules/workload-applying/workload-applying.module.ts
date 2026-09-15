import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const workloadApplying = {
  id: "01a08ce6-65f4-7bdd-adf3-0187b1b35936",
  type: "module",
  slug: "workload-applying",
  definition: "the cluster service a slug names, and what putting that service up reports",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cluster service is named by the slug its page carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page a slug names is the page the index answers for that slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug no cluster service page carries is refused by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A slug more than one cluster service page carries is refused rather than chosen between.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page short of the values an apply rests on is refused by naming the values the page wants.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cluster service naming a manifest no page carries is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest page whose code file is not there is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A manifest carrying a value nothing filled in is refused before anything is applied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cluster already as the cluster service's page describes is applied nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dry run reports the plan the run would carry out and applies nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kubectl that refuses makes the apply refuse.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each kubectl that applied is named as soon as that kubectl applied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kubectl that refuses leaves the ones before it named rather than unsaid.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the command line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An image the registry lacks is built before the manifests naming it are applied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dry run says which image would be built and builds none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The manifests are emitted from the tree pinned at the commit and written to the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A deploy places every secret its manifests demand before the workload is applied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A demand no secret page answers is reported rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A secret is read from the checkout rather than from the pinned tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refused placing is answered as the cluster's fault with the report so far.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dry run places no secret.",
    },
  ],
} as const satisfies Module
