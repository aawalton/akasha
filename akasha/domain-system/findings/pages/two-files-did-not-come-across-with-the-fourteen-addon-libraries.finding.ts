import type { Finding } from "../finding.page-type.ts"

export const twoFilesDidNotComeAcrossWithTheFourteenAddonLibraries = {
  id: "01a060c6-9711-77a0-a3ec-05cd0fedda99",
  pageTypeSlug: "finding",
  slug: "two-files-did-not-come-across-with-the-fourteen-addon-libraries",
  domainSlug: "domain/temper",
  claim:
    "The fourteen `temper-lib-*` landings were surveyed as file-for-file with nothing unmatched. Reading them file by file finds two source files with no counterpart: `lib-debug-logger/src/time-sync.ts` and the sibling addon manifest `LibMediaProvider-1.0.txt`. Neither blocks a teardown, and a survey claiming zero unmatched files should not be read as proof.",
  evidence:
    "`temper/shared-addon-libraries-lib-debug-logger/src/time-sync.ts` holds one line: `export function initTimeSync(this: void): undefined {}`. The source `src/main.ts` calls it. `akasha/temper/temper-lib-debug-logger/debug-logger-main/debug-logger-main.module.code.ts` calls seven `init*` functions and not this one, and `initTimeSync` appears nowhere under `temper-lib-debug-logger`. The function does nothing, so dropping it changes no behaviour, but it is a dropped file rather than a match.\n\n`temper/shared-addon-libraries-lib-media-provider/siblings/LibMediaProvider-1.0/LibMediaProvider-1.0.txt` is an ESO addon manifest for a compatibility alias addon. It has no counterpart under `akasha/temper/temper-lib-media-provider`. The akasha manifest names it at its `siblingAddons` key, so the file is presumably meant to be written from that key at build time, and whether it is should be checked before the source folder goes.\n\nEverything else in the fourteen is accounted for. The landing is a re-partition rather than a copy: source barrels folded into `-entry` modules, `src/types/eso-ext.d.ts` merged into a declarations module, every surface constant renamed from `lib` to upper snake case, and PascalCase functions renamed to camelCase. Module counts differ from source counts in twelve of the fourteen. The twelve `metadata/*.xml` files of media-provider and all fourteen `addon.json` manifests are byte-identical to their akasha counterparts.",
} as const satisfies Finding
