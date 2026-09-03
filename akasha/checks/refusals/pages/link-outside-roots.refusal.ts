import type { Refusal } from "../refusal.page-type.ts"

export const linkOutsideRoots = {
  id: "01a06611-398b-77f2-9c4e-5aa9a9baaf0f",
  pageTypeSlug: "refusal",
  slug: "link-outside-roots",
  title: "Link outside roots",
  text: "{where} links `{href}`, which resolves to {resolved}, outside every declared root ({roots}) — a path leaving the roots is reachable on the machine that wrote it and nowhere else, so the link reads as resolved to its author alone.",
} as const satisfies Refusal
