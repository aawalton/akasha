import type { Finding } from "../finding.page-type.ts"

export const anAkashaAddOnTakesItsNameFromTheLegacyTwinBeforeItCanBuild = {
  id: "01a062f1-b8c8-7021-b259-51c6538483cb",
  pageTypeSlug: "finding",
  slug: "an-akasha-add-on-takes-its-name-from-the-legacy-twin-before-it-can-build",
  domainSlug: "domain/temper",
  claim:
    "The add-on roster prefers an akasha folder over a legacy folder of the same canonical name, and prefers it the moment the akasha manifest lands rather than once the recreation compiles. The first commit of a recreation therefore takes the name from a working add-on and gives it to one that builds nothing. A recreation is not landed manifest-first, or the add-on is dark for as long as the recreation runs.",
  evidence:
    "Measured 2026-09-02. Before the recreation began, `temper-addon-resolve TemperCharacters` answered `temper/player-completion-addon`, and `temper-addon-build TemperCharacters --build-only` exited 0 writing 1,350,218 bytes of Lua. After the first commit landed a manifest naming `TemperCharacters` at `akasha/temper/temper-characters-addon`, the same resolve answers the akasha folder and the same build exits 2 with 'holds no tsconfig.json ... and its page names no bundle entry to write one from, so there is nothing to compile'. The preference is general rather than particular to this add-on: `TemperCollections` is in both trees and resolves to the akasha folder too. Both folders remain reachable by directory leaf, so `player-completion-addon` and `temper-characters-addon` each still build on demand, which is how the two outputs can be compared.",
} as const satisfies Finding
