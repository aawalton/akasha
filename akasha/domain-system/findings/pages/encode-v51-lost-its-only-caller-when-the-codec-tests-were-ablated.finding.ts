import type { Finding } from "../finding.page-type.ts"

export const encodeV51LostItsOnlyCallerWhenTheCodecTestsWereAblated = {
  id: "01a061d1-cd95-7289-9d58-d6d510208863",
  pageTypeSlug: "finding",
  slug: "encode-v51-lost-its-only-caller-when-the-codec-tests-were-ablated",
  domainSlug: "domain/temper",
  claim:
    "build-codec-v51 exports encodeV51 and nothing in the shipping tree calls it, because its only caller was a test deleted in 09f964f5c5. A pass pruning unused exports would take it. Encoding a version 51 build is the only way to make a fixture for the version 51 read path, and that path is live, so losing the encoder would leave one of the five decoders permanently untestable.",
  evidence:
    "Found on 2026-09-02 while recreating temper/game-codec. temper/game-codec/src/character/build-codec-v51.ts line 101 exports encodeV51. A search of temper and akasha finds no caller. The caller it had was temper/game-codec/src/character/build-codec-round-trip.unit.test.ts, which imported encodeV51 by name and was deleted along with build-codec.unit.test.ts, build-codec-roles.unit.test.ts and companions/companion-codec.unit.test.ts in commit 09f964f5c5, titled for ablating the task pages. The four files are recoverable from 09f964f5c5 and run to 36,845 bytes together. Version 51 remains a read path: build-codec.ts reads the version from byte 1 and dispatches to decodeV51 for any hash a user saved while version 51 was current. Versions 48, 49 and 50 have no encoder at all, so their decoders can only be proved differentially against the temper decoder as oracle. Version 51 is the oldest version for which a real encoded fixture can still be produced, which is what makes encodeV51 worth more than its caller count suggests. Confirmed runnable: encodeV51 on an empty dragonknight yields ATMHKAAAAAAf_4AAAAAAAAA and decodeBuild reads the class and race back.",
} as const satisfies Finding
