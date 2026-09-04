import type { Module } from "@akasha/code-system/module"

export const talosctl = {
  id: "01a06813-7b0f-7010-a231-2838cd77ce50",
  pageTypeSlug: "module",
  slug: "talosctl",
  definition: "a spawned `talosctl` answered as a promise, with a guard on its output flag",
  code: "ts",
} as const satisfies Module
