import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const appShellBottomNav = {
  id: "01a05b82-8b97-74bf-9735-1b3ad6f8889d",
  type: "page-type/module",
  slug: "app-shell-bottom-nav",
  definition: "the nav bar a narrow browser draws along the bottom of the frame",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar offers More wherever the shell has a footer, since Settings is there.",
    },
  ],
  createdAt: "2026-09-01T05:47:57.207Z",
  updatedAt: "2026-10-24T21:55:16.118Z",
} as const satisfies Module
