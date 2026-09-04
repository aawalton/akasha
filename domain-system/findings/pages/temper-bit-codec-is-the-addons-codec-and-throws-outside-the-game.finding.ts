import type { Finding } from "../finding.page-type.ts"

export const temperBitCodecIsTheAddonsCodecAndThrowsOutsideTheGame = {
  id: "01a062f8-6fdc-7c65-917b-312192283f40",
  pageTypeSlug: "finding",
  slug: "temper-bit-codec-is-the-addons-codec-and-throws-outside-the-game",
  domainSlug: "domain/temper",
  claim:
    "akasha/temper/temper-bit-codec is not the twin of temper/game-codec/src/binary-utils.ts. It is the addon's codec, written against the game's Lua sandbox, and it throws in Node and in the browser. Every codec temper carries exists twice, split by which runtime reads it. The brief for the game-codec row read temper-bit-codec as already holding binary-utils' four primitives, and acting on that would have routed 26 consumers through code that cannot run.",
  evidence:
    "base64url.module.code.ts line 13 calls string.len, and lines 22 to 30 call BitOr, BitLShift, BitRShift and BitAnd, which are the game's Lua 5.1 bit functions rather than JavaScript operators. Its two imports, eso-functions-01 and tstl-eso-sandbox, are type-declaration pages carrying d: ts, so they declare those globals without supplying them. Importing base64urlToBytes from it under bun and calling it gives ReferenceError: string is not defined at base64url.module.code.ts:13:15. The signatures differ as well: the akasha base64urlToBytes returns readonly number[] and reads a character outside the alphabet as zero, while the binary-utils one returns Uint8Array or null and returns null on malformed input. That null is the branch build-codec.ts line 17 and companion-codec.ts line 17 both test before decoding, so swapping one for the other turns a rejected build string into a silently wrong decode rather than an error. The same split holds for the companion codec: temper-companions-addon/companions-codec imports temper-bit-codec/bit-writer and five eso-types declarations, so it is the addon side too. That settles what the finding the-companion-codec-may-be-written-twice-over-one-wire-format left open, which asked whether this is one format recreated or one format implemented twice: it is implemented twice, and deliberately, because the addon cannot use JavaScript bit operators. What was not checked is whether the two agree bit for bit on the wire format.",
} as const satisfies Finding
