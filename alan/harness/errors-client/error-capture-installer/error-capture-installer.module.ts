import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const errorCaptureInstaller = {
  id: "01a05c89-6034-7058-9849-2d597112d2ac",
  type: "module",
  slug: "error-capture-installer",
  definition: "an element installing the window handlers for as long as it is mounted",
  code: "tsx",
} as const satisfies Module
