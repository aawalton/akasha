import type { Finding } from "../finding.page-type.ts"

export const theLogPageTypesCarriedIntoTheSeatSystemWithLinesAsRows = {
  id: "01a06837-0535-7683-975f-9e49a1662ebc",
  pageTypeSlug: "finding",
  slug: "the-log-page-types-carried-into-the-seat-system-with-lines-as-rows",
  domainSlug: "domain/akasha-migration",
  claim:
    "The old `log-day` and `log-line` page types are carried rather than absent. `log-day` carried as `seat-log-day` in the seat system, holding its `date`, `lines` and `source-slug` keys unchanged and adding a seat. `log-line` carried as rows in the `lines` file-property on `seat-log-day`, one json object to a row. The nine `page-property-definition` files keyed on either slug are carried with them and want ablating rather than waiting on a page type nobody will mint.",
  evidence:
    'Measured on 2026-09-03 working the `pages/page-type` block.\n\nA `find akasha -name \'*.page-type.ts\'` inventory reports neither slug, and `rg \'"log-day"\'` and `rg \'"log-line"\'` over the repo return zero outside the old markdown pages, so nothing in akasha writes either. A seed of `"seat-log-day"` returned 291, so the search was not blind.\n\n`akasha/seat-system/seat-log-days/seat-log-day.page-type.ts` holds `sourceSlug`, `seatName`, `date` and `lines`, its `sourceSlug` targeting `page-type/log-source`. The old `log-day-source-slug` states `key: source-slug, target-slug: log-source`, `log-day-date` states `key: date`, and `log-day-lines` states `key: lines, rows: jsonl, uncommitted: true`. akasha\'s `lines.file-property.ts` is `Lines = "jsonl"` declared `uncommitted: true`. Three of the four old keys stand letter for letter.\n\nThe old design lines carry one to one. \'A log day holds its lines beside it\' is akasha\'s \'The page is committed and the lines beside it are not\'. \'A log is rotated by taking its oldest days away\' is \'A day past the window a log is kept for is taken away\'.\n\nFor `log-line`, a row of `oauth-proxy-console-aine-2026-09-03.seat-log-day.lines.uncommitted.jsonl` reads `{"written-at":...,"agent-id":...,"level":"LOG","text":...}`. Those are the keys of `log-line-written-at`, `log-line-agent-id`, `log-line-level` and `log-line-text` exactly. 290 seat-log-day pages and 360 jsonl files stand live beside them.\n\nMinting either page type would have duplicated that live structure.',
} as const satisfies Finding
