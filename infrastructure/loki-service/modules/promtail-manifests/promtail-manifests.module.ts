import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const promtailManifests = {
  id: "01a06816-68b1-702f-9567-6866b7d0ae7a",
  type: "module",
  slug: "promtail-manifests",
  definition: "the configuration, permissions and daemonset manifests Promtail runs as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pod template carries the hash of the promtail-config configmap.",
    },
  ],
} as const satisfies Module
