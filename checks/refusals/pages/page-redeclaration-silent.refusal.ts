import type { Refusal } from "../refusal.page-type.ts"

export const pageRedeclarationSilent = {
  id: "01a06611-3998-7816-bd99-34fb0bd4aafa",
  pageTypeSlug: "refusal",
  slug: "page-redeclaration-silent",
  title: "Page redeclaration silent",
  text: "`{key}` is declared at {at}, and neither states `narrows-slug:`, so nothing says which of them bounds the key.\n\nA redeclaration narrows what it redeclares and names it under `narrows-slug:`, and the same rule bars a silent one for a `blocks.` key at `{side}`.",
} as const satisfies Refusal
