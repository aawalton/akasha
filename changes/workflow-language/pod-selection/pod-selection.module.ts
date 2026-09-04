import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const podSelection = {
  id: "01a06f10-7000-700c-b000c-9d4a2f6c000ce1",
  pageTypeSlug: "module",
  slug: "pod-selection",
  definition: "shell lines naming one live pod of a deployment in a namespace",
  code: "ts",
} as const satisfies Module
