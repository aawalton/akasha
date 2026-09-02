import type { Finding } from "../finding.page-type.ts"

export const aPersonaDayValueSlugIsARecordThatDrifts = {
  id: "01a05c31-f01d-74b8-a1b3-709fb1a8a2d9",
  pageTypeSlug: "finding",
  slug: "a-persona-day-value-slug-is-a-record-that-drifts",
  domainSlug: "domain/akasha-migration",
  claim:
    "A persona-day's value-slug records the value a persona stood for that day, and it drifts for real reasons: amy love to health, eppie faith to learn to fun and back. The reading that nothing here drifts except by the defect was taken over the green day bar alone. Two of the pages missing a value sit inside eppie's own change, and nothing dates which side of it they fell on.",
  evidence:
    "Counted 2026-09-01 over 2059 pages under pages/persona-day. Eleven of the thirteen personas missing a value carry one value on every day they have, matching their own page. amy carries love from 2026-06-11 and health from 07-03, six weeks before the gap, with both its edges and her page reading health. eppie carries faith from 06-25, learn from 07-28, fun on 08-16, 17 and 18, then has no page until 08-25, which reads learn, as her page has at its first commit on 08-26. Her fun stands at the earliest commit of those three days, so it is what was recorded rather than a later edit. tools/lib/wake-day/persona-day-points.ts:71 writes the key only where the persona carries one, `if (persona.valueSlug !== undefined) values[\"value-slug\"] = persona.valueSlug`, and the writer reaches only offsets -1 and 0, so a day falls out of that window and freezes at what it then held. That is why the value is a record and not a copy of the persona's. It was dropped unevenly rather than wholesale: 08-20 held 16 pages of which 8 carried a value, 08-21 held 15 of which 3 did. Twenty-three have since been given the value their persona carries, each already standing on every other day that persona has; eppie's two were left without one, the change being undated. The rescore reads and writes green-day-points alone and never touches this key. But a column of this same page type drifting for a real reason is why the rescore's date floor is load-bearing rather than tidy: the bar shows no legitimate drift only because no persona has had hers changed yet.",
} as const satisfies Finding
