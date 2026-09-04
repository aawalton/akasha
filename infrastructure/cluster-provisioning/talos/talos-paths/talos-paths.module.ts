import type { Module } from "@akasha/code-system/module"

export const talosPaths = {
  id: "01a06813-7b0f-7d70-b1b8-8c7051dcac51",
  pageTypeSlug: "module",
  slug: "talos-paths",
  definition: "the places a cluster's secrets, talosconfig and kubeconfig sit on disk",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The repository root is read from the checkout rather than climbed to.",
    },
  ],
} as const satisfies Module
