import type { Finding } from "../finding.page-type.ts"

export const aManifestLosesYourLinesToALaterSiblingHoweverCarefullyYouWrote = {
  id: "01a0687e-7bfa-7000-aa40-14c0918f89c3",
  pageTypeSlug: "finding",
  slug: "a-manifest-loses-your-lines-to-a-later-sibling-however-carefully-you-wrote",
  domainSlug: "domain/akasha-migration",
  claim:
    "A whole-file manifest landing reverts a sibling's export lines, and the loss surfaces not in the manifest but as an unresolvable import in a third file. Reading the manifest bytes in-process at land time stops you clobbering others; it does not stop a later sibling clobbering you. A manifest a lane depends on must therefore be re-verified AFTER landing, not only read afresh before it. Every landing involved returns `code: 0`.",
  evidence:
    "Measured twice on `akasha/seat-system/package.json` while carrying the tools/lib supervisor-[j-z] block. `afe5023148` added 33 exports, 97 to 130. `c6364602aa`, landing after it, rewrote the file from a pre-landing snapshot and dropped all 33, taking it back to 97; nothing in that commit's own diff names the loss, and it surfaced as `bun build --target=bun tools/run-supervisor.ts` failing to resolve `@akasha/seat-system/supervisor-state` from a THIRD file, `supervising/supervisor/supervisor.module.code.ts:13`. Restored in `2caf380be6`. It then happened again within twenty minutes: `659ae36377` added 5, `2780470448` dropped exactly those 5, surfacing as the same file's line 1 failing on `@akasha/seat-system/supervisor-lifecycle`. Restored in `dab4a360dd`. Both of my landings read the manifest in-process at land time, the discipline recommended for this hazard, and it did not help: that discipline is about what YOU drop, not what is dropped from under you. What caught both inside minutes was a check run after landing rather than before: every key the block needs present, and every export target existing on disk. A build of one live entrypoint caught both as well. Seeded control for the probe: `./zzz-nonexistent` reads MISSING by the same call that reads `./supervisor-config` present, so a zero is a reading rather than a blind instrument. The asymmetry is the point — a writer can be careful and still lose its lines, so the manifest is a shared surface that wants re-reading on a clock, not a file any one lane can land correctly once.",
} as const satisfies Finding
