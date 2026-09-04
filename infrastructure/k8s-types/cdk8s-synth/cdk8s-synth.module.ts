import type { Module } from "@akasha/code-system/module"

export const cdk8sSynth = {
  id: "01a06735-dd9c-7000-93a9-42c5731a8519",
  pageTypeSlug: "module",
  slug: "cdk8s-synth",
  definition: "a Kubernetes manifest rendered to YAML through a cdk8s chart",
  code: "ts",
} as const satisfies Module
