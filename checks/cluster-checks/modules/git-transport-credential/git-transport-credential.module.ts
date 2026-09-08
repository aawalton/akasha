import type { Module } from "@akasha/code/module"

export const gitTransportCredential = {
  id: "01a0816c-f195-790d-9234-2a82e2b3029a",
  pageTypeSlug: "module",
  slug: "git-transport-credential",
  definition: "the token and git arguments a call to the in-cluster git transport carries",
  code: "ts",
} as const satisfies Module
