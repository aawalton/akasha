import type { Refusal } from "../refusal.page-type.ts"

export const pageBlockRedeclarationSilent = {
  id: "01a06611-398f-7e33-a226-f31a9a556eb8",
  pageTypeSlug: "refusal",
  slug: "page-block-redeclaration-silent",
  title: "Page block redeclaration silent",
  text: "`{path}` declares `blocks.{key}`, which `{above}` above it declares, and states no `narrows:`.\n\nA redeclaration narrows what it redeclares and names the page type it narrows under `blocks.{key}.narrows:`, and the same rule bars a silent one for a property at `{side}`.",
} as const satisfies Refusal
