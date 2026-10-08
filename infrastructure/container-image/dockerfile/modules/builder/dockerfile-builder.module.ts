import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dockerfileBuilder = {
  id: "01a06865-abff-7005-b853-662b71046aba",
  type: "page-type/module",
  slug: "dockerfile-builder",
  definition: "the install and copy stages a Next.js build shares",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The image installs against the root manifest the checkout carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest is copied once.",
    },
  ],
  createdAt: "2026-09-03T17:51:28.767Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
