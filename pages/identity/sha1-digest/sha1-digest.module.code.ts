const BLOCK = 64

const ROUNDS = 80

const WORDS = 16

const TAIL = 8

const HIGH = 0x100000000

const INITIAL: readonly number[] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]

const ADDED: readonly number[] = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6]

const HEX = "0123456789abcdef"

function turned(value: number, by: number): number {
  return ((value << by) | (value >>> (32 - by))) >>> 0
}

function mixed(round: number, one: number, two: number, three: number): number {
  if (round < 20) return ((one & two) | (~one & three)) >>> 0
  if (round < 40) return (one ^ two ^ three) >>> 0
  if (round < 60) return ((one & two) | (one & three) | (two & three)) >>> 0
  return (one ^ two ^ three) >>> 0
}

function addedAt(round: number): number {
  return ADDED[Math.floor(round / 20)] ?? 0
}

function paddedFrom(input: Uint8Array): DataView {
  const bits = input.length * 8
  const length = ((Math.floor((input.length + TAIL) / BLOCK) + 1) * BLOCK) >>> 0
  const padded = new Uint8Array(length)
  padded.set(input)
  padded[input.length] = 0x80
  const view = new DataView(padded.buffer)
  view.setUint32(length - TAIL, Math.floor(bits / HIGH), false)
  view.setUint32(length - 4, bits >>> 0, false)
  return view
}

export function sha1Bytes(input: Uint8Array): Uint8Array {
  const view = paddedFrom(input)
  const held = [...INITIAL]
  const schedule = new Uint32Array(ROUNDS)
  for (let at = 0; at < view.byteLength; at += BLOCK) {
    for (let one = 0; one < WORDS; one += 1) schedule[one] = view.getUint32(at + one * 4, false)
    for (let one = WORDS; one < ROUNDS; one += 1) {
      const said =
        (schedule[one - 3] ?? 0) ^
        (schedule[one - 8] ?? 0) ^
        (schedule[one - 14] ?? 0) ^
        (schedule[one - 16] ?? 0)
      schedule[one] = turned(said, 1)
    }
    let a = held[0] ?? 0
    let b = held[1] ?? 0
    let c = held[2] ?? 0
    let d = held[3] ?? 0
    let e = held[4] ?? 0
    for (let one = 0; one < ROUNDS; one += 1) {
      const next =
        (turned(a, 5) + mixed(one, b, c, d) + e + addedAt(one) + (schedule[one] ?? 0)) >>> 0
      e = d
      d = c
      c = turned(b, 30)
      b = a
      a = next
    }
    held[0] = ((held[0] ?? 0) + a) >>> 0
    held[1] = ((held[1] ?? 0) + b) >>> 0
    held[2] = ((held[2] ?? 0) + c) >>> 0
    held[3] = ((held[3] ?? 0) + d) >>> 0
    held[4] = ((held[4] ?? 0) + e) >>> 0
  }
  const digest = new Uint8Array(held.length * 4)
  const out = new DataView(digest.buffer)
  for (let one = 0; one < held.length; one += 1) out.setUint32(one * 4, held[one] ?? 0, false)
  return digest
}

export function hexOf(bytes: Uint8Array): string {
  let said = ""
  for (const one of bytes) said += (HEX[one >> 4] ?? "") + (HEX[one & 0x0f] ?? "")
  return said
}

export function bytesOfHex(said: string): Uint8Array {
  const bytes = new Uint8Array(Math.floor(said.length / 2))
  for (let one = 0; one < bytes.length; one += 1) {
    bytes[one] = Number.parseInt(said.slice(one * 2, one * 2 + 2), 16)
  }
  return bytes
}

export function sha1HexOfText(text: string): string {
  return hexOf(sha1Bytes(new TextEncoder().encode(text)))
}
