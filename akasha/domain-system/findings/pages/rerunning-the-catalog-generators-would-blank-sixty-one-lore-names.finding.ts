import type { Finding } from "../finding.page-type.ts"

export const rerunningTheCatalogGeneratorsWouldBlankSixtyOneLoreNames = {
  id: "01a06124-d230-7526-a40d-df822aa0c3e2",
  pageTypeSlug: "finding",
  slug: "rerunning-the-catalog-generators-would-blank-sixty-one-lore-names",
  domainSlug: "domain/temper",
  claim:
    "Running `ops temper catalog generate` against the capture on this machine would not reproduce the files on disk, and one of the eleven degrades quietly. `lore-library` renders 64 empty collection names where the file on disk carries 3, so 61 names would be blanked and nothing would fail. For the other ten the difference is the capture having moved on rather than a generator gone stale.",
  evidence:
    'Measured on 2026-09-02 by rendering every tier from the live `TemperCatalog.lua` and comparing to the file each writes. Eight of the eleven differ on one line alone, the banner recording `apiVersion`: the files were rendered from `eso.live.12.0.6.3274791` and the capture here is `eso.live.12.0.8.3288357`. `trait-research` differs on the banner and on trailing commas, its own banner recording the older `eso.live.11.3.6.3240040`; with the banner and the commas set aside the two are equal character for character, so that difference is a formatter\'s and carries no data. `zone-completion` differs on 14 of 22,017 lines, all of them activity ids and titles the game itself changed. `lore-library` differs on 62 of 7,047 lines, and those are the ones that matter: a collection the game has not yet given a name for comes back as the empty string, so a capture taken without opening the lore library renders `name: ""` over a name that was there. `quest` throws rather than rendering, because the mined capture here holds no quests. None of this was caused by the generators moving into akasha; every one of the eleven renders text identical to what its copy outside rendered from the same capture. The reading to take from it is that the file on disk is the better data wherever it disagrees, and that a capture is worth checking for empty names before a generated file is committed over a good one.',
} as const satisfies Finding
