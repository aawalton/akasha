import type { Question } from "../question.page-type.ts"

export const libasyncHasNoLicenceGrantAnywhereUpstreamNoLicenseF = {
  id: "019f992e-8d6c-7ac7-ab75-138bade9a1b7",
  pageTypeSlug: "question",
  slug: "libasync-has-no-licence-grant-anywhere-upstream-no-license-f",
  ask: "LibAsync has NO licence grant anywhere upstream — no LICENSE file, no header, no declaration, at any commit ever. Under default copyright nobody has granted permission to redistribute it, and tempereso.com is serving it publicly right now. What do you want to do?",
  askedBy: "ember",
  askedIn: "019f32f0-ea53-7940-9596-1613e218bb1f",
  status: "answered",
  offered: [
    "Pull TemperSales + LibHistoire + LibAsync from the archive now — David loses sales capture, other 12 addons unaffected",
    "Keep serving all 15 while I ask votan73 for an explicit licence",
    "Take the whole archive offline until every licence is settled",
    "Something else — let's talk",
  ],
  answer:
    "This isn't a crisis. Third-part libraries shouldn't be hosted, but other than TTC, they shouldn't be in the system at all. If Temper depends on any of them, we need to rewrite the needed functionality in Temper.",
  closedAt: "2026-07-25T12:11:06.153Z",
  context: "txt",
} as const satisfies Question
