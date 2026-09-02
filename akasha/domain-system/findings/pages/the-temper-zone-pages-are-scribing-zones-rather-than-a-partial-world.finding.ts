import type { Finding } from "../finding.page-type.ts"

export const theTemperZonePagesAreScribingZonesRatherThanAPartialWorld = {
  id: "01a060f1-98f3-7341-a8eb-764b02bef94a",
  pageTypeSlug: "finding",
  slug: "the-temper-zone-pages-are-scribing-zones-rather-than-a-partial-world",
  domainSlug: "domain/temper",
  claim:
    "The 23 `temper-zone` pages are no partial view of the 42 zones the capture reports. They are the zones that drop scribing scripts, and `dropsScripts` is a required property 22 of the 23 answer true. Filling the list out to 42 would break what the page type is about. Telvanni Peninsula carries a page in akasha and appears in none of the four captured tables carrying a zone list.",
  evidence:
    "Measured on 2026-09-02. `zone-completion-data.generated.ts` and `poi-data.generated.ts` each report the same 42 zone ids and names. `akasha/temper/temper-catalog/temper-world/zones/pages` holds 23 pages, and `temper-zone.page-type.ts` requires `dropsScripts` and `isDlc`; only Gold Coast answers `dropsScripts` false. Of the 23, only four are base-game zones — Cyrodiil, Deshaan, Grahtwood and Stormhaven — and every alliance levelling zone is absent, which is the shape of a scribing lookup rather than a gazetteer. 22 of the 23 titles are among the 42; Telvanni Peninsula is the one that is not, and it is missing from `zone-completion-data` (42), `poi-data` (42), `quest-data` (65 zone names) and `cadwell-data` (15) alike. A third zone list disagrees with neither: `akasha/temper/temper-character/skill-points/pages` holds 50 pages, 43 of category `zone` and 7 of category `general`, and those 43 cover all 42 captured zones and add The Wailing Prison, which `quest-data` also carries. So the capture and the skill-point pages agree, and the zone pages answer a different question. A seat brief handed this to me as akasha holding 23 of 42 of one subject; that reading would have added 19 pages to a table whose reason for holding a row is that the zone drops scripts.",
} as const satisfies Finding
