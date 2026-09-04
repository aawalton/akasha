import type { Finding } from "../finding.page-type.ts"

export const libDebugLoggersTimeSyncSuppressionWasLostBeforeAkasha = {
  id: "01a06063-ef92-74a0-8dea-3062c443ab7c",
  pageTypeSlug: "finding",
  slug: "lib-debug-loggers-time-sync-suppression-was-lost-before-akasha",
  domainSlug: "domain/temper",
  claim:
    "LibDebugLogger reads a field nothing ever fills. Its Lua error handler skips an error whose code is in `INTERNAL.TIME_SYNC_ERROR_CODE`, and no code in the package writes that field, so the guard is always false and every time-sync error reaches the log. The module that would fill the field is an empty function. The suppression was lost when temper ported the library from Lua, before akasha, and the akasha recreation drops the empty module rather than carrying a stub that does nothing.",
  evidence:
    "temper/shared-addon-libraries-lib-debug-logger/src/time-sync.ts is one line: `export function initTimeSync(this: void): undefined {}`. src/main.ts calls it eighth and last. `grep -rn TIME_SYNC src/` answers exactly two lines and neither writes: src/initialization.ts line 277 reads `const timeSyncCodes = internal.TIME_SYNC_ERROR_CODE` and skips logging where `timeSyncCodes[errorCode] === true`, and src/types.ts line 115 declares the field optional as `TIME_SYNC_ERROR_CODE?: Record<number, boolean>`. Being undefined, the guard `timeSyncCodes === undefined || timeSyncCodes[errorCode] !== true` is true for every error, so nothing is ever skipped. Upstream LibDebugLogger 2.6.2 carries a time-sync module that watches for the client's clock-resync errors and gathers their codes, which is what the guard was written against. The akasha recreation akasha/temper/temper-lib-debug-logger, landed in ad233a31f915af174e7fb4ce21a60733f1d8e454, holds fourteen modules and no `debug-logger-time-sync`; the call was taken out of `debug-logger-main` and the read at `debug-logger-startup` was left as temper had it, so behaviour is unchanged and the gap is now visible rather than hidden behind an empty call. Mending this means porting the upstream module, which needs the codes the live client raises, so it waits on someone who can watch the game.",
} as const satisfies Finding
