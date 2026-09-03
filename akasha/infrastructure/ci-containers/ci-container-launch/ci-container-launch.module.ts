import type { Module } from "@akasha/code-system/module"

export const ciContainerLaunch = {
  id: "01a06861-24c9-700b-810e-f688e0ddb95d",
  pageTypeSlug: "module",
  slug: "ci-container-launch",
  definition: "creating each admitted step's container on the cluster",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A launch colliding with a container of another step is refused rather than taken over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A launch colliding with a corpse removes it and lets the next tick create a fresh one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pipeline fixing no instructions commit launches nothing, its tree being unfixed.",
    },
  ],
} as const satisfies Module
