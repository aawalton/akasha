import type { Module } from "@akasha/code-system/module"

export const useAppVersionCheck = {
  id: "01a05c0f-884e-7536-97e4-75ea5b4b6b46",
  pageTypeSlug: "module",
  slug: "use-app-version-check",
  definition: "a browser asking for the live build and offering a reload when it differs",
  code: "ts",
} as const satisfies Module
