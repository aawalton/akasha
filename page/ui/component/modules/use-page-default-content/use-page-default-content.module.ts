import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const usePageDefaultContent = {
  id: "01a06205-4f3c-7008-8e50-44c6018074e7",
  type: "page-type/module",
  slug: "use-page-default-content",
  definition:
    "The data a page's default content needs: properties, sections, subpages and referrers.",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page's content loads until the page, the page types and its related pages are in.",
    },
  ],
  createdAt: "2026-09-02T12:08:30.268Z",
  updatedAt: "2026-09-27T07:53:01.000Z",
} as const satisfies Module
