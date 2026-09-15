import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const appShell = {
  id: "01a05b82-8b97-789b-96bd-9955295eae4b",
  type: "page-type/module",
  slug: "app-shell",
  definition: "the frame a browser draws every page of a site inside",
  code: "tsx",
} as const satisfies Module
