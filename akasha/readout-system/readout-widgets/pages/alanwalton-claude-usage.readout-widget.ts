import type { ReadoutWidget } from "../readout-widget.page-type.ts"

export const alanwaltonClaudeUsage = {
  id: "01a06420-b259-76b1-aba4-b26ab965fb5b",
  pageTypeSlug: "readout-widget",
  slug: "alanwalton-claude-usage",
  definition: "the tile on Alan's phone showing how much of the weekly Claude allowance is spent",
  appSlug: "alanwalton",
  componentSlug: "alanwalton-claude-usage-widget",
  kind: "ClaudeUsageWidget",
  families: ["small", "medium"],
  feed: "https://alanwalton.com/api/claude-usage",
  caption: "Weekly Usage",
  galleryName: "Claude Usage",
  galleryDescription: "Claude account usage and when capacity comes back.",
  opens: "capacitor://localhost/nav/claude-accounts-d93b211a",
  groupSlugs: ["claude-usage"],
  place: 2,
} as const satisfies ReadoutWidget
