import type { Finding } from "../finding.page-type.ts"

export const theCompanionCodecMayBeWrittenTwiceOverOneWireFormat = {
  id: "01a061d1-cd93-75bb-875b-0e5ca7384183",
  pageTypeSlug: "finding",
  slug: "the-companion-codec-may-be-written-twice-over-one-wire-format",
  domainSlug: "domain/temper",
  claim:
    "Two bodies of code read the companion build format. akasha/temper/temper-companions-addon carries companions-codec at 6,252 bytes beside companions-decoder at 3,197, and temper/game-codec/src/companions carries companion-codec-v48 and companion-codec-v49 at 15,706 bytes together. Which of the two this is, one format recreated or one format implemented twice, was not determined. If it is the second, the duplication reaches wider than the game-codec row.",
  evidence:
    "Found while mapping the game-codec row for the migration initiative. What was checked: the akasha addon files name decodeCompanion and COMPANION_BUILD_TYPE, which are the names the temper companion codec uses, and temper/game-companions-core/src/optimizer/reference-build-data.ts line 7 holds a companion build hash, AjADh2kaRpGkaRpGkJDw8U8AMx1p3WrQgA, whose second byte is 48 and so names companion format version 48. That same hash and that same file are already copied into akasha at temper-companions-core/reference-build-data line 7. What was not checked: whether the two bodies of code agree bit for bit on the layout, whether the addon copy reads version 49 at all, and whether either was derived from the other. No differential decode was run between them. The reason it was left undetermined is that the game-codec row was scoped to the 22 character modules, and settling a duplication of this size as a side effect of that landing would have hidden it. Deciding it needs a differential decode of the same bytes through both, compared field by field, in the way the character codec is being proved.",
} as const satisfies Finding
