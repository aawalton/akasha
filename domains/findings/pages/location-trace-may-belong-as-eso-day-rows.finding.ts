import type { Finding } from "../finding.page-type.ts"

export const locationTraceMayBelongAsEsoDayRows = {
  id: "01a0683c-2a55-7412-8b3f-833d11e93320",
  pageTypeSlug: "finding",
  slug: "location-trace-may-belong-as-eso-day-rows",
  domainSlug: "domain/tracking",
  claim:
    "`location-trace` and `health-sample` are the same shape, phone readings filed on an ESO day, and akasha carries them apart. `health-sample` carried as a `page-property-entry` on `eso-day` with live `.jsonl` sidecars. Nothing anywhere carried `location-trace`, so I minted it as a page type to unblock its 16 property definitions. Those 16 may instead belong as the properties of a `location-traces` entry on `eso-day`, which would make the page type a step on the way rather than the destination.",
  evidence:
    "`akasha/health-samples-access/sample-rows/sample-rows.module.code.ts:3` sets `ANCHOR_PAGE_TYPE = \"eso-day\"` and names no row page type. `akasha/location-traces-access/trace-rows/trace-rows.module.code.ts:3-7` sets the same anchor plus `ROW_PAGE_TYPE = \"location-trace\"`, and its `rowValuesOf` builds `device-id`, `client-seq`, `captured-at`, `latitude`, `longitude` and eleven more keys that match the 16 files under `pages/page-property-definition/location-trace-*.page-property-definition.md` key for key.\n\n`akasha/alan/tracking/daily/eso-days/eso-day.page-type.ts:29-30` names `page-property-entry/health-samples` and `page-property-entry/listens` and no trace entry. `find akasha -name '*.page-property-entry.ts'` returns 46 files and none is for traces. `find akasha -name '*.jsonl'` returns 238 `.health-samples.jsonl` files and no trace file. The absence of `location-trace` was total rather than a row-carry I read past.\n\nThe finding `nothing-has-ever-kept-a-location-trace` records that `pages/page-property-definition/eso-daily-tracking-location-traces.page-property-definition.md` already declares an entry destination on the ESO day, which is the entry shape rather than the page-type shape.\n\nI landed `akasha/alan/tracking/location-traces/location-trace.page-type.ts` and registered `page-type/location-trace` on `akasha/alan/tracking/tracking.domain.ts`. Its first invariant says a trace stands as a row on the ESO day it was captured in, so the page type states the row shape without holding one.",
} as const satisfies Finding
