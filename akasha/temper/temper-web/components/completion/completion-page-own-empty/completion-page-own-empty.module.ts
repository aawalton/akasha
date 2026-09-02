import type { Module } from "@akasha/code-system/module"

export const completionPageOwnEmpty = {
  id: "01a06421-f74b-757b-ab0c-999fac750027",
  pageTypeSlug: "module",
  slug: "completion-page-own-empty",
  definition: "what the completion page draws before the signed-in player has imported anything",
  code: "tsx",
  test: "tsx",
} as const satisfies Module
