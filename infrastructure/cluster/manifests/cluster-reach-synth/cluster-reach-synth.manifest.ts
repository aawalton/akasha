import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const clusterReachSynth = {
  id: "01a091dd-3f89-71f8-8712-76e7c7de9a53",
  type: "manifest",
  slug: "cluster-reach-synth",
  definition: "the account a program off the cluster reaches the cluster's API as",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One account is what every program off the cluster reaches the API as.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The account is allowed each action the code reaching the API asks of it, and no other.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The token this account is reached by is minted on the workstation and kept out of the repository.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An account this names that the cluster does not hold answers every read 401.",
    },
  ],
} as const satisfies Manifest
