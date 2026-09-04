import type { Finding } from "../finding.page-type.ts"

export const addonCodeCannotReachTheAkashaPackagesItShares = {
  id: "01a0603b-d66b-78ed-9416-df0abf5b7e84",
  pageTypeSlug: "finding",
  slug: "addon-code-cannot-reach-the-akasha-packages-it-shares",
  domainSlug: "domain/temper",
  claim:
    "A temper package the game loads is compiled to Lua 5.1 and sandboxed away from `os`, so it reaches no Date, no clock and no filesystem. That rules out most of what akasha already holds: `@akasha/day` is built on Date and cannot be reached from any of the 63 addon-side packages. Sharing one module between the web app and an addon needs a rule saying which akasha packages are Lua-safe, and akasha has none.",
  evidence:
    "This surfaced in the pathfinder. temper/shared-foundation-misc-dungeons/src/eso-day.ts computes the game's daily reset from a Unix second with hand-rolled civil-date arithmetic, duplicating akasha/day/eso-day, so the first migration replaced it with `@akasha/day/eso-day`. That was wrong. temper/player-completion-addon/src/undaunted-pledges.ts calls getTodaysPledges with GetTimeStamp(), and temper/player-completion-addon/src/tracking/daily-writs.ts takes getEsoDayStringFromSec and getEsoResetTimestampSec off the same module — both compile to Lua. temper/addons/tsconfig.base.json sets luaTarget 5.1 and luaLibImport require-minimal, and the TypeScriptToLua Date polyfill rests on os.time and os.date. The ESO sandbox bans exactly that: temper/shared-build-deploy-checks/__fixtures__/addon-sandbox/banned-os.lua is a check fixture, alongside banned-io.lua, banned-package.lua and banned-dofile.lua. `git grep 'new Date(' temper/*-addon/src` answers nothing, so the ban is already obeyed everywhere. The migration was reverted: akasha/temper/temper-dungeons now holds its own `eso-reset` module in whole seconds, and the package depends on nothing. So the duplication with akasha/day is real and remains, and the two cannot be merged until akasha says what a Lua-safe module is.",
} as const satisfies Finding
