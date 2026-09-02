import type { Finding } from "../finding.page-type.ts"

export const fiveBuildDecodersRepeatEachOtherBecauseTheRepetitionIsTheFormat = {
  id: "01a061d1-cd94-7bdb-ad0e-0d7207de58e1",
  pageTypeSlug: "finding",
  slug: "five-build-decoders-repeat-each-other-because-the-repetition-is-the-format",
  domainSlug: "domain/temper",
  claim:
    "The build codec carries five near-identical decoders, one per game version from 48 to 52, and the repetition is deliberate. Collapsing them onto shared code would let an edit made for the current format reach a legacy decoder, so a hash saved at version 48 would decode as version 52 and read back as a different build with nothing failing. The five decoders are kept apart on purpose.",
  evidence:
    "Measured on 2026-09-02 while recreating temper/game-codec as akasha modules. The invitation to collapse them is strong: build-codec-v48-skills, v49-skills and v50-skills are 1,107 bytes each, the three champion-points files 1,205 bytes each, and the three equipment files 5,733 bytes each, while v51 and v52 pair off at 1,834, 2,080, 9,449 and 9,285. Versions 48, 49 and 50 export a decoder and no encoder. Only v51 and v52 export encodeV51 and encodeV52. build-codec.ts reads the version from byte 1 and dispatches to all five decoders, while encodeBuild calls encodeV52 alone, so every one of the five is a live read path for hashes users already saved and only version 52 is ever written. A shared helper between a legacy decoder and the current one is therefore a wire-format change to data nobody can re-encode. The failure is silent: a decoder reading the wrong bit offsets returns a well-formed build rather than throwing, which is the same shape as the potion-index defect recorded in splitting-a-data-table-for-the-byte-ceiling-moved-a-codec-index. This departs from the initiative rule to recreate rather than carry across, and the departure is the point.",
} as const satisfies Finding
