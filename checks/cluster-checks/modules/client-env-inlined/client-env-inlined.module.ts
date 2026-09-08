import type { Module } from "@akasha/code/module"

export const clientEnvInlined = {
  id: "01a08165-7a62-7235-bb28-552dcd9012f2",
  pageTypeSlug: "module",
  slug: "client-env-inlined",
  definition:
    "the public env keys client-bundled code reads, and whether a vite define replaces each",
  code: "ts",
} as const satisfies Module
