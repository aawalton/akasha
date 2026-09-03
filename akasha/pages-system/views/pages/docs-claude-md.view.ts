import type { View } from "../view.page-type.ts"

export const docsClaudeMd = {
  id: "01a06577-2614-7012-a712-91ce7be2a1c2",
  pageTypeSlug: "view",
  slug: "docs-claude-md",
  title: "CLAUDE.md",
  navSlug: "docs",
  viewPlace: 1,
  narrows: [{ key: "source-path", comparison: "has", values: ["CLAUDE.md"] }],
} as const satisfies View
