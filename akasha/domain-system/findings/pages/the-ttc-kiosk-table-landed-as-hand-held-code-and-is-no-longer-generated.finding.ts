import type { Finding } from "../finding.page-type.ts"

export const theTtcKioskTableLandedAsHandHeldCodeAndIsNoLongerGenerated = {
  id: "01a060c6-9710-7171-babc-1f3d35a06349",
  pageTypeSlug: "finding",
  slug: "the-ttc-kiosk-table-landed-as-hand-held-code-and-is-no-longer-generated",
  domainSlug: "domain/temper",
  claim:
    "The 112-row TTC kiosk table was generated into `temper/game-trading-pricing/src/generated` by `ops temper addon-data generate`. It landed inlined in `akasha/temper/temper-trading-pricing/kiosk-location-name`, which no generator writes. Tearing the temper folder down took the writer with it, so the table is held by hand now and will drift from the `temper-guild-trader` pages it was read off.",
  evidence:
    "`tools/lib/temper-addon-data/writes/pricing.ts` called `generateTemperTtcKioskLocation(p.ttcKioskLocationPages.rows)` and wrote the answer to `TEMPER_PRICING_OUTPUT_DIR`, which `tools/lib/temper-addon-data/output-dirs.ts:21` resolved to `temper/game-trading-pricing/src/generated`.\n\nThe akasha recreation merged two source files into one module: `src/generated/ttc-kiosk-locations.generated.ts` and `src/ttc-kiosk-locations-data.ts` both became `kiosk-location-name.module.code.ts`, with the table written out above the `kioskLocationName` function and the generated banner stripped. Nothing marks the table as generated any more.\n\nDeleting the temper folder left `TEMPER_PRICING_OUTPUT_DIR` pointing at a path with no parent, and `assertOutputDirParentsExist` in the same file throws on exactly that shape. So the writer had to go rather than be repointed: a generator outside akasha cannot write into akasha, because the hook refuses a redirect into the folder and an `akasha write` is the only way in.\n\nWhat is left behind is the generator itself. `@akasha/temper-addon-generators/ttc-kiosk-locations` still exports `generateTemperTtcKioskLocation` and nothing calls it now.\n\nThe same shape waits for every other generated table the migration lands as a module. A generated table becoming a hand-held akasha module is a real loss of the tie between the pages and the code read off them, and it should be answered once for all of them rather than folder by folder.",
} as const satisfies Finding
