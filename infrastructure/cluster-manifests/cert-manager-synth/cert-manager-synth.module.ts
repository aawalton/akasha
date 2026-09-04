import type { Module } from "@akasha/code-system/module"

export const certManagerSynth = {
  id: "01a06810-1262-7065-b0b4-0de2efa13873",
  pageTypeSlug: "module",
  slug: "cert-manager-synth",
  definition: "the issuer that answers a certificate request through a DNS record",
  code: "ts",
} as const satisfies Module
