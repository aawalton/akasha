import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dockerfileBuilder = {
  id: "01a06865-abff-7005-b853-662b71046aba",
  pageTypeSlug: "module",
  type: "module",
  slug: "dockerfile-builder",
  definition: "the install and copy stages a Next.js build shares",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The image installs against the root manifest the checkout carries.",
    },
    {
      invariantKind: "departure",
      statement: "Every workspace member's manifest is copied before the install runs.",
    },
  ],
} as const satisfies Module
