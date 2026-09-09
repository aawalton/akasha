import type { Module } from "@akasha/code/module"

export const senderSurface = {
  id: "01a0655d-dab8-72ee-acf8-77bc35e6f4cb",
  pageTypeSlug: "module",
  type: "module",
  slug: "sender-surface",
  definition: "which surface an inbound message came from, and the footer it is answered with",
  code: "ts",
} as const satisfies Module
