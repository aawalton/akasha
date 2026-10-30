import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const globalErrorCapture = {
  id: "01a05c89-6034-7aa8-8022-17a7a37e61e3",
  type: "page-type/module",
  slug: "global-error-capture",
  definition: "how code sends any error that reaches the whole browser page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The handlers are installed once however often this module is called.",
    },
  ],
  createdAt: "2026-09-01T10:35:02.068Z",
  updatedAt: "2026-10-30T15:38:34.928Z",
} as const satisfies Module
