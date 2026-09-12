import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const rootDomain = {
  id: "01a094f6-b48e-7d46-b5f1-9c85f31466b5",
  type: "argument",
  slug: "root-domain",
  said: "--domain",
  takes: "the domain to root the tree at instead of at its roots, said once per domain",
  value: "text",
  placeholder: "slug",
  repeats: true,
} as const satisfies Argument
