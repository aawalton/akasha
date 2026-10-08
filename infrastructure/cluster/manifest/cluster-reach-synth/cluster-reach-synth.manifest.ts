import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const clusterReachSynth = {
  id: "01a091dd-3f89-71f8-8712-76e7c7de9a53",
  type: "page-type/manifest",
  slug: "cluster-reach-synth",
  definition: "the account a program off the cluster reaches the cluster's API as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One account is what every program off the cluster reaches the API as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The account is allowed each action the code reaching the API asks of it, and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The token this account is reached by is minted on the workstation and kept out of the repository.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An account this names that the cluster does not hold answers every read 401.",
    },
  ],
  createdAt: "2026-09-11T19:06:31.177Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Manifest
