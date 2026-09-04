import type { Finding } from "../finding.page-type.ts"

export const rooftopSolarSingleProjectLeverage = {
  id: "01a06555-9f3e-73f1-8cd6-4b1cff541f3c",
  pageTypeSlug: "finding",
  slug: "rooftop-solar-single-project-leverage",
  domainSlug: "domain/all-about-alan",
  claim:
    "One capital project carries more leverage than anything else in Alan's audit: rooftop solar reduces his dependence on Provo Power, on Dominion for natural gas, and on public charging for a future EV at once, and sits under the whole household electric load besides. It also gates the second stage — a heat pump replacing gas heating and hot water, induction replacing gas cooking. Its scope is unsketched, no installer is assessed, and it is gated on burnout recovery rather than money.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds two items under the SOLAR thread of `backlog/personal-freedom.md`: `rooftop-solar` (line 87, was item 30) and `heat-pump-induction` (line 88, was item 33). The second is the stage that begins once the first is in place, so the spine records the ordering directly (`backlog.md` line 44), which is why I took them as one observation. They cite `notes/transportation.md` and `notes/utilities.md`.\n\nThe scope items left unsketched are generation capacity, battery storage, inverter selection, a trustworthy installer, and the ordering against an EV purchase — solar can precede the EV, which then consumes its surplus.\n\nWhat I did not measure: I read neither note, so the three dependencies it would reduce and the leverage ranking are the backlog's. I did not check whether any quote or site assessment has since happened.",
} as const satisfies Finding
