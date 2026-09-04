import type { Finding } from "../finding.page-type.ts"

export const collapsingTheFiveBuildDecodersDependsOnTheVersionGateNotTheDecodeBody = {
  id: "01a06239-0dc6-7735-bf2b-068922a8bcb4",
  pageTypeSlug: "finding",
  slug: "collapsing-the-five-build-decoders-depends-on-the-version-gate-not-the-decode-body",
  domainSlug: "domain/temper",
  claim:
    "None of the five character build decoders reads the version byte it was dispatched on. Each reads byte 1 and throws it away, and every format branch is on the minor version in byte 2. The switch in build-codec.ts is the only thing refusing a hash stamped with a version akasha does not know. One decoder can replace the five without altering a decoded field, but it has to carry an explicit list of readable versions.",
  evidence:
    "Measured on 2026-09-02 while recreating temper/game-codec, building on the-five-build-decoders-are-one-decoder-stamped-five-ways.\n\ndecodeV48 through decodeV52 each open with two unassigned readBits(reader, 8) calls and then const minorVersion = readBits(reader, 8), at build-codec-v48.ts lines 76 to 78 and build-codec-v52.ts lines 188 to 190. The three format branches, at build-codec-v52.ts lines 243, 244 and 277, are all on minorVersion. ESO_VERSION_48 through ESO_VERSION_52 have two uses between them: the switch at build-codec.ts lines 31 to 50, and the stamp encodeV51 and encodeV52 write into byte 1.\n\nWith the encoders and the imports stripped and the numerals normalised, the decode text of all twenty per-version files is one file. Every difference left is a const declaration, and not one of them is a read.\n\nOver the 129 byte vectors the earlier finding used, one collapsed decoder was compared against all five originals at every leaf of the decoded build rather than at a digest: 161,580 leaf comparisons, 0 differences, 129 of 129 vectors. Its encoder gives bytes identical to encodeV52.\n\nThe gate is where the collapse is not free. Restamping the 100 sampled vectors with twelve version bytes and three type bytes gives 3,600 dispatch probes, and a collapsed reader keeping the readable-version list agrees with the switch on all 3,600. Drop the list and, of the 700 restamped vectors the switch refuses, the decode body answers with a filled-in build for 700.\n\nNothing outside game-codec imports a version-specific decoder.",
} as const satisfies Finding
