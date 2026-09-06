import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const podSelection = {
  id: "01a07740-d031-750a-bb56-bf2ab4991321",
  pageTypeSlug: "module",
  slug: "pod-selection",
  definition: "shell lines naming one live pod of a deployment in a namespace",
  code: "ts",
} as const satisfies Module
