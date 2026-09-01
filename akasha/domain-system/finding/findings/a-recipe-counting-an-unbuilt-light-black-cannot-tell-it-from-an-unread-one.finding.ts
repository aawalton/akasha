import type { Finding } from "../finding.page-type.ts"

export const aRecipeCountingAnUnbuiltLightBlackCannotTellItFromAnUnreadOne = {
  id: "01a05c08-c6e3-730d-8fe5-cb2ac7292fd3",
  pageTypeSlug: "finding",
  slug: "a-recipe-counting-an-unbuilt-light-black-cannot-tell-it-from-an-unread-one",
  domainSlug: "domain/akasha-migration",
  claim:
    "Amy's points are the mean of Alan's stoplights, and her recipe says a light he has not built counts black and still counts. Absence is a legitimate input rather than an error, so when the persona read began answering absent the lights went black and the mean fell with nothing able to object. Every other persona's points came through the defect untouched; hers did not, because hers is the one recipe for which a missing answer is a valid answer.",
  evidence:
    'pages/persona-points-source/amy-points-source.persona-points-source.md carries `kind: stoplights` and states "the mean of the color floor values of Alan\'s primary stoplights, where black counts zero" and "A light Alan has not built yet counts black and still counts." It is the only page of that kind among the 24 there; the rest are direct, external, manual, seed, unavailable and windowed. readouts/daily-stoplights.ts:241-242 reads `textIn(row.values, "value-slug")` off the moved persona type and does `if (stated === null) continue`, so readPersonaDaily returns empty and readouts/stoplight-mean-points.ts:121 sums nothing while the denominator holds. Against git: the personas moved in at 4d859e182c, 2026-08-30 11:45:49, which is when the read began answering absent. pages/persona-day/amy-2026-08-30.persona-day.md was last written well at 429c6513f9, 10:06:33 that morning, holding `source-points: 0.39705882352941174`. It was rewritten at f92edbb46c, 2026-09-01 00:20:18, to 0.35294117647058826, which is 6/17. Comparing all 50 damaged pages across the commit introducing the 10000 bar, 41 carry an unchanged source-points and only amy\'s fell; grace-2026-08-30 rose from 10 to 54, a partial day completed rather than hollowed, her recipe reading pages that never moved. After the read was mended the engine recomputed amy to 0.47058823529411764, or 8/17, so two lights had been going black unread.',
} as const satisfies Finding
