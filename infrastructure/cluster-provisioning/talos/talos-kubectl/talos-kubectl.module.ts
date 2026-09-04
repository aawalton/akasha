import type { Module } from "@akasha/code-system/module"

export const talosKubectl = {
  id: "01a06813-7b0f-78f8-8420-3ac40730df9b",
  pageTypeSlug: "module",
  slug: "talos-kubectl",
  definition: "a spawned `kubectl` carrying a chosen kubeconfig, answered as a promise",
  code: "ts",
} as const satisfies Module
