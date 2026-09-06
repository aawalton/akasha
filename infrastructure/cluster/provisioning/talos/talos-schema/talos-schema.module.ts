import type { Module } from "@akasha/code-system/module"

export const talosSchema = {
  id: "01a06813-7b0f-7bbe-925e-eaf7eea6ab02",
  pageTypeSlug: "module",
  slug: "talos-schema",
  definition: "the schemas a Talos node's and a cluster's declared configuration hold to",
  code: "ts",
} as const satisfies Module
