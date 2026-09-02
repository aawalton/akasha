import type { Finding } from "../finding.page-type.ts"

export const theFiveBuildDecodersAreOneDecoderStampedFiveWays = {
  id: "01a061db-7bb2-7d35-a352-6cb608f3bacf",
  pageTypeSlug: "finding",
  slug: "the-five-build-decoders-are-one-decoder-stamped-five-ways",
  domainSlug: "domain/temper",
  claim:
    "build-codec versions 48 through 52 carry byte-identical decoders. The split protects no saved data, because a hash written at version 48 already decodes through the same code a version 52 hash does. Only versions 51 and 52 add an encoder, and those two differ by one line. Keeping the five apart to preserve format history preserves nothing, and no future seat should keep them for that reason.",
  evidence:
    "Measured on 2026-09-02 in temper/game-codec/src/character. Diffing decodeV48 against decodeV52 with the version numerals normalised gives an empty diff. build-codec-v51 against build-codec-v52 across all four files gives one line, ESO_VERSION 51 against 52. build-codec-v48 against build-codec-v49 gives the version constant and three import paths. build-codec-v48-equipment against build-codec-v52-equipment differs only by 83 added lines of encoder and its imports, so the file-size gap of 5,881 against 9,285 bytes is the encoder rather than a different decode path. Decoding one sampled build through decodeV48 and through decodeV52 gives 0 field differences while the two functions compare distinct. 129 byte vectors were each fed to the four decoders the case did not come from: 416 wrong-decoder substitutions, 0 detected. This finding replaces one removed at `5cd8126e73`, which claimed the reverse on the strength of the file sizes and the decode-only exports, and which was filed without diffing the decode path. Whether the five should now be collapsed is a change to how saved user data is read and is Alan's call, not a conclusion of this finding.",
} as const satisfies Finding
