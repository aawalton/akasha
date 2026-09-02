import type { Finding } from "../finding.page-type.ts"

export const theGateSharedNarrowWaitedOnIsOpenAndOneSeatShouldFinishIt = {
  id: "01a06097-31a9-79ee-84cd-613e8cdff547",
  pageTypeSlug: "finding",
  slug: "the-gate-shared-narrow-waited-on-is-open-and-one-seat-should-finish-it",
  domainSlug: "domain/temper",
  claim:
    "The gate `@temper/shared-narrow` was waiting on is open: `temper-eso-types` landed the tstl and ESO sandbox declarations, so `requireNumericKey` and its `tonumber` can move. Nine of the eleven helpers already exist in `@akasha/utils-narrow` and one is dead, leaving `requireNumericKey` as the only gap. 54 files outside akasha import the package, not the 35 counted before, and 53 of the 54 are addon code.",
  evidence:
    "Read off the akasha bodies rather than taken from the earlier finding.\n\nBehaviour-identical, so repointing these changes nothing: `isRecord` at 1 use, `isObjectRecord` at 18, `asObjectRecord` at 6, and `deleteRecordKey` at 2. None of the four throws.\n\nDrifted, so each site wants a judgement. `requireFirst` at 5 uses tests `array.length < 1` in akasha and `array[0] === undefined` in temper, so an array holding one `undefined` gives that value back in akasha and throws in temper. `assertNever` at 4 uses renders through `JSON.stringify` in akasha and through `String(value)` in temper. `requireAt` at 17 uses and `requireDefined` at 2 match temper word for word in what they say.\n\nEvery throwing akasha helper throws `NarrowError` where every temper one throws `Error`. Whether a tstl build of a class extending `Error` behaves under Lua 5.1 is unproven, and 53 of the 54 files are addon code compiled that way.\n\nMissing outright: `requireNumericKey` at 6 uses, whose body calls the Lua `tonumber`. `@akasha/utils-narrow` is the wrong home for it, holding no Lua of any kind; a temper addon-side package reaching `temper-eso-types` is the right one.\n\nDead: `requireLuaMapGet` has no caller anywhere and is still in the source file.\n\nThe call taken here: no second copy of `shared-narrow` lands in akasha, and no partial repoint either. Repointing the 27 safe uses leaves the package alive for `requireNumericKey` alone, so it buys no teardown while touching 45 files and carrying the drift at the other 27. The seat holding the addon side should do the whole thing in one run.",
} as const satisfies Finding
