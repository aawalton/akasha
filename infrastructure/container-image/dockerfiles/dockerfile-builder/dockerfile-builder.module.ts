import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dockerfileBuilder = {
  id: "01a06865-abff-7005-b853-662b71046aba",
  type: "module",
  slug: "dockerfile-builder",
  definition: "the install and copy stages a Next.js build shares",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The image installs against the root manifest the checkout carries.",
    },
    {
      invariantKind: "departure",
      statement: "Every workspace member's manifest is copied before the install runs.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest is copied once.",
    },
  ],
} as const satisfies Module
