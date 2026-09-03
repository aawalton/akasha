import type { Module } from "@akasha/code-system/module"

export const ciContainerCpuRate = {
  id: "01a06861-24c9-700e-bbdf-b49ca7119d31",
  pageTypeSlug: "module",
  slug: "ci-container-cpu-rate",
  definition: "the cpu a step's container is burning, asked of prometheus",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A container prometheus holds no sample for reads as no rate rather than as nothing burnt.",
    },
    {
      invariantKind: "departure",
      statement:
        "Prometheus is reached through the api server's service proxy, having no route from outside.",
    },
  ],
} as const satisfies Module
