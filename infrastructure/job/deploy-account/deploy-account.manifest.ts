import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifest/manifest.page-type.types.ts"

export const deployAccount = {
  id: "01a0a162-b114-7eb3-b2ed-f34d8ef02c1d",
  type: "manifest",
  slug: "deploy-account",
  definition: "the account the deploy job runs as",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The deploy job runs as this account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This account sits in the namespace the deploy job runs in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This account is allowed every action on every object the cluster holds.",
    },
  ],
} as const satisfies Manifest
