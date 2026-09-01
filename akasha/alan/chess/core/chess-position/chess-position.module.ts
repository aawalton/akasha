import type { Module } from "@akasha/code-system/module"

export const chessPosition = {
  id: "01a05be1-cb07-7df3-8226-d30980bcc078",
  pageTypeSlug: "module",
  slug: "chess-position",
  definition: "one chess position, what an engine scores it and what it allows",
  code: "ts",
} as const satisfies Module
