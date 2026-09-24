import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const workloadApplying = {
  id: "01a08ce6-65f4-7bdd-adf3-0187b1b35936",
  type: "page-type/module",
  slug: "workload-applying",
  definition: "the cluster service a slug names, and what putting that service up reports",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster service is named by the slug its page carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a slug names is the page the index answers for that slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no cluster service page carries is refused by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A slug more than one cluster service page carries is refused rather than chosen between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page short of the values an apply rests on is refused by naming the values the page wants.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster service naming a manifest no page carries is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster service naming no manifest is refused.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A cluster service naming more than one manifest is refused, a workload being one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest page whose code file is not there is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A manifest carrying a value nothing filled in is refused before anything is applied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster already as the cluster service's page describes is applied nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kubectl that refuses makes the apply refuse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each kubectl that applied is named as soon as that kubectl applied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kubectl that refuses leaves the ones before it named rather than unsaid.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the command line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image the registry lacks is built before the manifests naming it are applied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The manifests are emitted from the tree pinned at the commit and written to the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy places every secret its manifests demand before the workload is applied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A demand no secret page answers is reported rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A secret is read from the checkout rather than from the pinned tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused placing is answered as the cluster's fault with the report so far.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy places the secrets even where every manifest already matches the cluster.",
    },
  ],
} as const satisfies Module
