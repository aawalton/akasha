import type { Finding } from "../finding.page-type.ts"

export const aTrackingCommandWithNoOpsPageIsInvisibleToAPageDrivenSweep = {
  id: "01a06868-09fc-7001-98ef-eeab973dce30",
  pageTypeSlug: "finding",
  slug: "a-tracking-command-with-no-ops-page-is-invisible-to-a-page-driven-sweep",
  domainSlug: "domain/akasha-migration",
  claim:
    "`tools/commands/tracking/words-sync.ts` is a live command that no old ops page names, so a migration driven off the ops pages never reaches it and a folder-level ablation destroys it without either sweep noticing.",
  evidence:
    "The file stands at tools/commands/tracking/words-sync.ts, landed today at 476e823f24 'Wire the wisdom and intelligence word counts into a tracking sync command'. `ls pages/old-ops-command/ | grep -i words` returns nothing, against 172 ops pages each of which names its code file in a `command-path:` front matter line. It is live rather than dead: akasha's wake-day page type declares both `wisdomWords` and `intelligenceWords`. The old ops CLI finds commands by walking tools/commands for `export const summary` (tools/ops/declared.ts), so nothing would fail loudly if it went. The general shape is the hazard: the 172-pair map from ops page to code file is not a census of tools/commands, and any lane using it as one will miss whatever landed after the pages stopped being written.",
} as const satisfies Finding
