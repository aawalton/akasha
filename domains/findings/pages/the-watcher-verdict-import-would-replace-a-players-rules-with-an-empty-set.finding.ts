import type { Finding } from "../finding.page-type.ts"

export const theWatcherVerdictImportWouldReplaceAPlayersRulesWithAnEmptySet = {
  id: "01a07233-6e9d-7640-990d-aa54a760a6d5",
  pageTypeSlug: "finding",
  slug: "the-watcher-verdict-import-would-replace-a-players-rules-with-an-empty-set",
  domainSlug: "domain/temper",
  claim:
    "The watcher's item rule verdict import rebuilds a player's inventory settings from an empty set and writes that back, because the settings it means to amend read as unreadable rather than as absent. One unrelated guard is all that holds the write off, and that guard's own words ask for the change that would arm it.",
  evidence:
    'temperPlayerSettingsStore().read answers `inventory: asRecord(asRecord(page)?.settings)?.inventory`. The `settings` property of temper-player is a file-property whose type is the string `json`, so a page answers `settings: "json"` and asRecord of that is null. The read therefore answers `present: true` with `inventory` undefined for a player carrying 42,772 bytes of settings. importItemRuleVerdicts then calls `toRuleSettings(current.inventory)`, and toRuleSettings answers `{ version: 2, rules: [] }` for anything whose `version` is not 2, undefined included. The verdicts are upserted into that empty set and store.write replaces `/settings/inventory` with the result. For this account that discards 82 rules, 2 item rules, 1 buy rule and the managed guild banks. The write does not land today: patchPage calls refuseJsonPatch, which throws whenever a `patch` is present at all, the file-backed test being a separate guard a line earlier. So an empty-set fallback is the only path this code has, rather than a rare one, and the refusal that stops it reads `Set the whole property instead`, which is the edit that would let the wipe through.',
} as const satisfies Finding
