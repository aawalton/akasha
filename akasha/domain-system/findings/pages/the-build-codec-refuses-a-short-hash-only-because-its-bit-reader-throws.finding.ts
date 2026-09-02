import type { Finding } from "../finding.page-type.ts"

export const theBuildCodecRefusesAShortHashOnlyBecauseItsBitReaderThrows = {
  id: "01a0623d-8127-76b4-bd6c-25b95c579b4e",
  pageTypeSlug: "finding",
  slug: "the-build-codec-refuses-a-short-hash-only-because-its-bit-reader-throws",
  domainSlug: "domain/temper",
  claim:
    "The character build codec refuses a truncated or corrupt hash for one reason: binary-utils readBits throws at the end of the data and the decoder catches it. The only bit reader under akasha does the opposite, answering with the bits it managed to gather, and it is addon code written against the game's own bitwise functions. Recreating the codec on top of it would turn every short hash that today reads as nothing into a filled-in build.",
  evidence:
    "Measured on 2026-09-02 while recreating temper/game-codec for akasha.\n\ntemper/game-codec/src/binary-utils.ts line 61 throws Unexpected end of data as soon as readBits meets a byte index past the array, and every decoder wraps its body in try/catch to answer null. Of the 129 byte vectors used for the collapse proof, 25 are truncated at lengths 0, 1, 2, 3 and 8. All 25 answer null, and replaying each through readBits shows the mechanism is the end-of-data throw in 25 of 25, with no other route to null among them.\n\nakasha/temper/temper-bit-codec/bit-reader/bit-reader.module.code.ts is the only bit reader under akasha. It answers with the value gathered so far when byteIndex reaches the end rather than throwing, so a body reading past the end carries on over zero bits. It takes readonly number[] where the web codec takes Uint8Array, and it reaches for BitAnd, BitOr, BitLShift and BitRShift, the game's own bitwise functions supplied by the addon runtime. Under bun those are undefined and the reader cannot run at all.\n\nThe whole package is addon-targeted: base64url, bit-writer and equipment-mappings reach for the same eso-functions and the TypeScriptToLua sandbox. So temper-bit-codec is the wrong home for the web build codec however well its definition reads, and binary-utils has no counterpart under akasha yet. A recreation needs it ported on its own terms with the throw kept, and the 25 truncated vectors are the check that it was.",
} as const satisfies Finding
