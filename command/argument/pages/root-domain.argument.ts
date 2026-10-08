import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const rootDomain = {
  id: "01a094f6-b48e-7d46-b5f1-9c85f31466b5",
  type: "page-type/argument",
  slug: "root-domain",
  said: "--domain",
  takes: "the domain to root the tree at instead of at its roots, said once per domain",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-12T09:33:11.182Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
