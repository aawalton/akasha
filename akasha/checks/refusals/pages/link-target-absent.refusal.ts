import type { Refusal } from "../refusal.page-type.ts"

export const linkTargetAbsent = {
  id: "01a06611-398d-70f0-8ada-582dd41d591a",
  pageTypeSlug: "refusal",
  slug: "link-target-absent",
  title: "Link target absent",
  text: "{where} links `{href}`, which resolves to {resolved}, and nothing stands there — the reader is sent to a document that does not exist, and the sentence pointing them at it still reads as though it does.",
} as const satisfies Refusal
