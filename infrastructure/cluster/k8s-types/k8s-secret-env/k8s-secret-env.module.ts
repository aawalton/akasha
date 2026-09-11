import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const k8sSecretEnv = {
  id: "01a08ddf-72fc-7860-89cc-0d78bdc27fc8",
  type: "module",
  slug: "k8s-secret-env",
  definition: "the environment entry a container reads one key of a secret through",
  code: "ts",
} as const satisfies Module
