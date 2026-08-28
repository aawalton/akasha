export const TEST_RUN = "AKASHA_TEST_RUN"

/**
 * Whether a test run is what is asking, in this process or in the one that started it.
 *
 * `Bun.main` ALONE COULD NOT ANSWER ACROSS A SPAWN, which is the boundary a test crosses to write.
 * It names the test file in the process `bun test` runs and the spawned command's own path in
 * anything that process starts, so a test that reached a write by running `ops` was invisible to
 * every caller keyed on it. The variable is put in the environment by the `bun test` preload at
 * `tools/lib/live-store-write-guard-preload.ts` and carried down into every child it spawns.
 */
export function inATestRun(): boolean {
  if (typeof process !== "undefined" && process.env?.[TEST_RUN] === "1") return true
  return typeof Bun !== "undefined" && /\.test\.tsx?$/.test(Bun.main)
}
