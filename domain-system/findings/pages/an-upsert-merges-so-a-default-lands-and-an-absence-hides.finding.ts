import type { Finding } from "../finding.page-type.ts"

export const anUpsertMergesSoADefaultLandsAndAnAbsenceHides = {
  id: "01a05c08-c6e1-7227-b310-f3a7015f6768",
  pageTypeSlug: "finding",
  slug: "an-upsert-merges-so-a-default-lands-and-an-absence-hides",
  domainSlug: "domain/akasha-migration",
  claim:
    "An upsert merging key by key splits one broken read into two kinds of damage, and the louder one is the lesser. A field read as absent but given a default is written, overwriting a good value on a page that already stood. A field read as absent and omitted is not written, so an existing page keeps its old value and a fresh page has none. The defect leaves old pages wrong and loud, new pages quietly incomplete, and counting the wrong values understates it.",
  evidence:
    "tools/lib/wake-day/persona-recipe-rows.ts:63-65 spreads three fields conditionally — `...(valueSlug === undefined ? {} : { valueSlug })` and the same for greenDayPoints and totalPoints — so a field read as undefined never reaches the row. points-source-engine.ts:122 does not omit its field: `greenDayPoints: raw.greenDayPoints ?? DEFAULT_GREEN_DAY_POINTS`, and that default is 10000, which no persona carries; the forty under akasha/persona-system/persona run 1 to 5000. Observed 2026-09-01: fifty pages under pages/persona-day carried `green-day-points: 10000` spanning 2026-08-18 to 08-31, while value-slug behaved oppositely. Every 08-30 page kept its value-slug — grace faith, eppie learn, the rest health — because the upsert never named the key and the merge left the old value standing. All seven pages created fresh on 08-31 carry no value-slug at all, there being nothing for the merge to preserve. A persona-day with no value-slug matches nothing in value-green-day-units-on-day, which filters `value-slug: is $value`, so the day is absent from the rollup rather than wrong in it. The bar was recoverable: each page's own history holds the pre-defect value, 400 for aelwyn and ione, 160 natalie, 1 amy, 60 eppie, 48 grace, 8 shaestrel. The seven fresh pages have no prior blob, so for them the value has to come from the persona rather than from the day.",
} as const satisfies Finding
