import type { Module } from "@akasha/code-system/module"

export const inferenceRunServices = {
  id: "01a0685d-4b35-700e-a313-871e5b2440ad",
  pageTypeSlug: "module",
  slug: "inference-run-services",
  definition:
    "the services a run is recorded against, the operations they do and the versions they ran",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every service names the versions it ran, and a service that pins nothing names an empty set.",
    },
  ],
} as const satisfies Module
