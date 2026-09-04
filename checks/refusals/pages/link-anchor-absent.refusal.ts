import type { Refusal } from "../refusal.page-type.ts"

export const linkAnchorAbsent = {
  id: "01a06611-398a-74b9-896d-d291af9e399c",
  pageTypeSlug: "refusal",
  slug: "link-anchor-absent",
  title: "Link anchor absent",
  text: "{where} links `{href}`, and {resolved} holds no heading spelled `#{anchor}` — the file is there, so the reader lands at the top of it with no sign they missed anything.",
} as const satisfies Refusal
