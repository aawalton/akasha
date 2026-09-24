import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const foundationApplying = {
  id: "01a0a5fe-f019-72ee-a92a-9aa03e2494df",
  type: "page-type/module",
  slug: "foundation-applying",
  definition: "the manifests a cluster foundation's page names, put into the cluster",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A foundation is applied as the manifests its page names and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each manifest a foundation names is read from the page the index answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no cluster foundation page carries is refused by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foundation naming a manifest no page carries is refused.",
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
      statement: "Each manifest is reported as matching the cluster or differing from it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster already holding every manifest is applied nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The manifests are emitted from the tree pinned at the commit and written to the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foundation's manifests are applied in the order the code emitted them.",
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
      decisionKind: "decision-kind/absence",
      statement: "Nothing here builds an image.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here places a secret.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here waits on a rollout.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the command line.",
    },
  ],
} as const satisfies Module
