import type { Finding } from "../finding.page-type.types.ts"

export const aRunningServiceWritesPagesItsPageTypeRefuses = {
  id: "01a088a1-7c9c-75ee-92ca-9c997db906ae",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-running-service-writes-pages-its-page-type-refuses",
  domain: "domain/oauth-proxy",
  claim:
    "A service that keeps running across a rename goes on writing the old keys, and every page it writes after that breaks the tree for every seat until someone mends it by hand.\n",
  evidence:
    "`oauth-proxy-console-akasha-2026-09-10.seat-log-day.ts` and two beside it landed in commit `320fc64807d` stating `sourceSlug` and no `type`, while `seat-log-day` states `source` and `page` states `type`. `log-day-writing` writes both correctly, so the code on disk is right and the process holding an older copy is not. The three pages compiled for nothing that read them, and the next landing by any seat was refused with TS2353 until I mended them. A day-keyed writer makes one more of these every day it runs.\n",
} as const satisfies Finding
