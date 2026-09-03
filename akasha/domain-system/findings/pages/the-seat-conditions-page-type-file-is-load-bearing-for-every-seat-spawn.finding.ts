import type { Finding } from "../finding.page-type.ts"

export const theSeatConditionsPageTypeFileIsLoadBearingForEverySeatSpawn = {
  id: "01a06837-f101-7589-a82f-27330116ea3f",
  pageTypeSlug: "finding",
  slug: "the-seat-conditions-page-type-file-is-load-bearing-for-every-seat-spawn",
  domainSlug: "domain/akasha-migration",
  claim:
    "`pages/page-type/seat-conditions.page-type.md` cannot be ablated yet. Removing it alone stops every seat spawning, because the supervisor reaches the singleton through the old markdown page-type registry rather than through the instance file. The type file, the instance page and the reader migrate together.",
  evidence:
    "Measured 2026-09-03 by probe rather than by reading the code. I copied `pages/` into a scratch root beside an empty `.git`, pointed `AKASHA_ROOT` at it, and called `readSeatConditions` from tools/lib/seat-conditions.ts.\n\nCONTROL. With the tree whole it answered: model opus, fallbackModel fable, autoCompactWindow 400000, subagentSpawnDepth 5, toolTimeout 600000, both resume thresholds 2147483647, extendedContextAvailable true. So the probe reaches the real reader on real data.\n\nTEST. I deleted `pages/page-type/seat-conditions.page-type.md` from the scratch root, changing nothing else, and the same call threw ``seat-conditions` names no page type whose pages are files`. The instance page was still there.\n\nWHY. page/page-types.ts sets PAGE_TYPE_GLOBS from `pages/page-type`, so a page type is itself a markdown page, and page-query answers `{pageType}` only for a type that glob finds. tools/lib/supervisor-account-config.ts calls the reader, and tools/lib/supervisor-interactive-spawn.ts calls that, which is every interactive spawn.\n\nWHAT I DID INSTEAD. Minted akasha/seat-system/seat-conditions/seat-conditions.page-type.ts, which unblocks the ten page-property-definition files keyed on the slug, and left the markdown. That is a duplicate on purpose until the composers move.\n\nSCOPE. The same probe shape tests any page type an old reader queries by slug. It cost one copy of `pages/` and two runs.",
} as const satisfies Finding
