import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const promtailManifests = {
  id: "01a06816-68b1-702f-9567-6866b7d0ae7a",
  type: "page-type/module",
  slug: "promtail-manifests",
  definition: "the config, permissions and daemonset manifests Promtail runs as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pod template carries the hash of the promtail-config configmap.",
    },
  ],
} as const satisfies Module
