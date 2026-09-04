import type { Finding } from "../finding.page-type.ts"

export const aRescoreRewritesEveryDayAPersonaEverHad = {
  id: "01a05c08-c6df-7f67-8f5f-c307807dcd3d",
  pageTypeSlug: "finding",
  slug: "a-rescore-rewrites-every-day-a-persona-ever-had",
  domainSlug: "domain/akasha-migration",
  claim:
    "The rescore repairing a drifted green day bar is bounded by nothing but the persona. It asks for every persona-day she ever had and rewrites each whose stored bar differs from the bar she carries today, so a bar that changed for a reason is overwritten and the day it described restated. Tonight it repaired fifty pages and no more, only because no page holds a bar differing for another cause. The guard is the data, not the code.",
  evidence:
    'tools/lib/wake-day/points-source-rescore.ts:53-56 asks `where: { "persona-slug": { is: slug } }`. The where names the persona and nothing else, so the answer is the persona\'s whole history. planRescore at lines 31-44 keeps a day when `if (storedBar === currentBar) continue` fails, with no comparison against a date: `const storedBar = numberOf(row[GREEN_DAY_POINTS_KEY]) ?? null`. Lines 70-81 upsert every day it returned. Measured 2026-09-01 across 2059 pages under pages/persona-day: exactly seven personas carry more than one distinct green-day-points, and for each the second is 10000, the default the broken read fell through to. aelwyn holds 400 on 81 pages, amy 1 on 75, eppie 60 on 61, grace 48 on 16, ione 400 on 80, natalie 160 on 70, shaestrel 8 on 34, each equal to the bar its persona carries now. So planRescore found no drift outside the damaged window. Observed: the run beginning 02:04:25 started at aelwyn-2026-08-18 and walked forward to 08-31, never touching 08-17 or earlier, which the same code would have rewritten had those days held another bar. The bar is read from the persona rather than from the day, so nothing records what a day was scored against when it was scored, and a persona whose bar is raised once loses every day judged under the old one.',
} as const satisfies Finding
