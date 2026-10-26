import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shapeDescriptor = {
  id: "01a05b69-4545-7ee0-a1d2-883584cf2c3c",
  type: "page-type/module",
  slug: "shape-descriptor",
  definition: "what names a subscribable set of the pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A set is named by ids, by slugs, by the values one relation holds, or by a view's narrows.",
    },
  ],
  createdAt: "2026-09-01T05:20:20.805Z",
  updatedAt: "2026-10-26T21:05:50.798Z",
} as const satisfies Module
