import type { Module } from "@akasha/code-system/module"

export const deviceTokenContext = {
  id: "01a0655e-d399-7f83-8b69-496707b129e5",
  pageTypeSlug: "module",
  slug: "device-token-context",
  definition: "the account a push registration is made for, read out of the request",
  code: "ts",
} as const satisfies Module
