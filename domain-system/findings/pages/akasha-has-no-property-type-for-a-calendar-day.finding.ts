import type { Finding } from "../finding.page-type.ts"

export const akashaHasNoPropertyTypeForACalendarDay = {
  id: "01a05fc7-f920-7cdd-b946-5864f6b6665d",
  pageTypeSlug: "finding",
  slug: "akasha-has-no-property-type-for-a-calendar-day",
  domainSlug: "workspace-package/pages-system",
  claim:
    "A page property holding a calendar day has nowhere to land. An instant property must close its slug with `-at` and carry a time to the millisecond, and a day carries neither, so a day is written as text and nothing judges it.",
  evidence:
    "`temper-quest-giver` states `epoch: 2026-02-18`, a day rather than a moment. `instant-property` declares that an instant is written as ISO 8601 in UTC to the millisecond closing with `Z`, and that an instant property's slug closes with `-at`, so the value and the slug both refuse a day. `akasha/day/` carries the modules `day-string` and `eso-day`, which read and write days, but no `day-property` page type declares one as a page property. The property landed as a text property with `max: 10` and a gap invariant saying it is a day rather than text, at `akasha/temper/temper-catalog/temper-world/properties/epoch.text-property.ts`. Nothing now refuses `2026-02-30` or `not-a-day` in that property. Temper is unlikely to be the only domain wanting one.",
} as const satisfies Finding
