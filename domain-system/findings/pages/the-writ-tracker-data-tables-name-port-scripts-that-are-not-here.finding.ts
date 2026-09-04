import type { Finding } from "../finding.page-type.ts"

export const theWritTrackerDataTablesNamePortScriptsThatAreNotHere = {
  id: "01a06181-d385-7f99-a8d3-9c4da0a4efe2",
  pageTypeSlug: "finding",
  slug: "the-writ-tracker-data-tables-name-port-scripts-that-are-not-here",
  domainSlug: "domain/temper",
  claim:
    "Ten files under `temper/game-crafting-addon/src/writ-worthy/generated/` are named `.generated.ts` and each carries a header telling the reader to re-run a converter rather than hand-edit. No converter answers. The two scripts named in those headers are in no package here, and no generator in `akasha/temper/temper-addon-generators` answers at any of the ten slugs. The bytes on disk are the only copy.",
  evidence:
    "`git ls-files | grep -E 'port-mat-data|port-i18n-data'` answers nothing. `temper/game-crafting-addon/scripts` does not exist and `temper/scripts/src` holds only `_mined-data-test-helpers.ts`, `watcher` and `watcher-exe`. `grep -rl 'link-data-table|price-data-table|ui-strings-shorten|ui-strings-static|i18n-data' akasha/ tools/` answers nothing. The ten are `i18n-data-client-si`, `i18n-data-fooddrink`, `i18n-data-gear`, `i18n-data-mat`, `i18n-data-motif`, `i18n-data-set`, `link-data-table`, `price-data-table`, `ui-strings-shorten` and `ui-strings-static`, together about 50 KB, ported from WritWorthy's `WritWorthy_Link.lua`, `WritWorthy_Price.lua` and `lang/en_forced.lua`. They migrate as source because nothing else can answer for them.",
} as const satisfies Finding
