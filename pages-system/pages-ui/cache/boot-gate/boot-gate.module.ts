import type { Module } from "@akasha/code-system/module"

export const bootGate = {
  id: "01a05c7d-d068-79aa-9ca7-ec600a058f2d",
  pageTypeSlug: "module",
  slug: "boot-gate",
  definition: "how long a screen waits for the page store to come up before it draws without it",
  code: "ts",
} as const satisfies Module
