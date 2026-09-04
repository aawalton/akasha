import type { Module } from "@akasha/code-system/module"

export const bunPty = {
  id: "01a069c2-9357-7000-9a06-5cb8e9dd1c2e",
  pageTypeSlug: "module",
  slug: "bun-pty",
  definition: "Bun's own spawn, typed as the terminal it answers when asked for one",
  code: "ts",
} as const satisfies Module
