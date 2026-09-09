import type { Module } from "@akasha/code/module"

export const upscaleBenchSynth = {
  id: "01a06815-9efd-7033-94e5-a09ca99e9413",
  pageTypeSlug: "module",
  type: "module",
  slug: "upscale-bench-synth",
  definition: "the manifests the upscale benchmark job is applied as",
  code: "ts",
  allowsTmpPaths: true,
} as const satisfies Module
