import {
  CAPACITY,
  EC_BLOCKS,
  REMAINDER,
} from "akasha/temper/addon/pages/characters/modules/qr-code-blocks/qr-code-blocks.module.code.ts"
import { calculateErrorCorrection } from "akasha/temper/addon/pages/characters/modules/qr-code-galois/qr-code-galois.module.code.ts"
import { matrixWithLowestPenalty } from "akasha/temper/addon/pages/characters/modules/qr-code-matrix/qr-code-matrix.module.code.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"

const ALPHANUMERIC_VALUE: readonly number[] = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, 36, -1, -1, -1, 37, 38, -1, -1, -1, -1, 39, 40, -1, 41, 42, 43, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 44, -1, -1, -1, -1, -1, -1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, -1, -1, -1, -1, -1,
]

const LENGTH_DIGITS: readonly (readonly number[])[] = [
  [10, 9, 8, 8],
  [12, 11, 16, 10],
  [14, 13, 16, 12],
]

const NUMERIC = "0123456789"

const ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*./:+-"

function binary(this: void, x: number, digits: number): string {
  let bits = ""
  let rest = x
  while (rest > 0) {
    bits = (rest % 2 === 1 ? "1" : "0") + bits
    rest = Math.floor(rest / 2)
  }
  while (bits.length < digits) bits = `0${bits}`
  return bits
}

function madeOnlyOf(this: void, str: string, allowed: string): boolean {
  if (str.length === 0) return false
  for (let i = 0; i < str.length; i++) {
    if (!allowed.includes(str.charAt(i))) return false
  }
  return true
}

function modeOf(this: void, str: string): number {
  if (madeOnlyOf(str, NUMERIC)) return 1
  if (madeOnlyOf(str, ALPHANUMERIC)) return 2
  return 4
}

function lengthDigits(this: void, version: number, localMode: number): number {
  if (version < 10) return (LENGTH_DIGITS[0] ?? [])[localMode - 1] ?? 0
  if (version < 27) return (LENGTH_DIGITS[1] ?? [])[localMode - 1] ?? 0
  return (LENGTH_DIGITS[2] ?? [])[localMode - 1] ?? 0
}

function tableMode(this: void, mode: number): number {
  if (mode === 4) return 3
  if (mode === 8) return 4
  return mode
}

type VersionEcLevel = { readonly version: number; readonly ecLevel: number }

function versionAndEcLevel(
  this: void,
  len: number,
  mode: number,
  requestedEcLevel: number | undefined
): VersionEcLevel {
  const localMode = tableMode(mode)
  let minVersion = 40
  let maxEcLevel = requestedEcLevel ?? 1
  let min = 1
  let max = 4
  if (requestedEcLevel !== undefined && requestedEcLevel >= 1 && requestedEcLevel <= 4) {
    min = requestedEcLevel
    max = requestedEcLevel
  }
  for (let ecLevel = min; ecLevel <= max; ecLevel++) {
    for (let version = 1; version <= CAPACITY.length; version++) {
      const bits = ((CAPACITY[version - 1] ?? [])[ecLevel - 1] ?? 0) * 8 - 4
      const modeBits = bits - lengthDigits(version, localMode)
      let c: number
      if (localMode === 1) c = Math.floor((modeBits * 3) / 10)
      else if (localMode === 2) c = Math.floor((modeBits * 2) / 11)
      else if (localMode === 3) c = Math.floor((modeBits * 1) / 8)
      else c = Math.floor((modeBits * 1) / 13)
      if (c >= len) {
        if (version <= minVersion) {
          minVersion = version
          maxEcLevel = ecLevel
        }
        break
      }
    }
  }
  return { version: minVersion, ecLevel: maxEcLevel }
}

function digitsValue(this: void, digits: string): number {
  let value = 0
  for (let i = 0; i < digits.length; i++) value = value * 10 + NUMERIC.indexOf(digits.charAt(i))
  return value
}

function encodeNumeric(this: void, str: string): string {
  let bitstring = ""
  for (let at = 0; at < str.length; at += 3) {
    const a = str.substring(at, at + 3)
    const width = a.length === 3 ? 10 : a.length === 2 ? 7 : 4
    bitstring += binary(digitsValue(a), width)
  }
  return bitstring
}

function encodeAlphanumeric(this: void, str: string): string {
  let bitstring = ""
  for (let at = 0; at < str.length; at += 2) {
    if (at + 1 < str.length) {
      const b1 = ALPHANUMERIC_VALUE[str.charCodeAt(at)] ?? -1
      const b2 = ALPHANUMERIC_VALUE[str.charCodeAt(at + 1)] ?? -1
      bitstring += binary(b1 * 45 + b2, 11)
    } else {
      bitstring += binary(ALPHANUMERIC_VALUE[str.charCodeAt(at)] ?? -1, 6)
    }
  }
  return bitstring
}

function encodeBinary(this: void, str: string): string {
  let bitstring = ""
  for (let i = 0; i < str.length; i++) bitstring += binary(str.charCodeAt(i), 8)
  return bitstring
}

function encodeData(this: void, str: string, mode: number): string {
  if (mode === 1) return encodeNumeric(str)
  if (mode === 2) return encodeAlphanumeric(str)
  if (mode === 4) return encodeBinary(str)
  throw "not implemented yet"
}

function addPadData(this: void, version: number, ecLevel: number, given: string): string {
  let data = given
  const cpty = ((CAPACITY[version - 1] ?? [])[ecLevel - 1] ?? 0) * 8
  const countToPad = Math.min(4, cpty - data.length)
  if (countToPad > 0) data += "0".repeat(countToPad)
  if (data.length % 8 !== 0) data += "0".repeat(8 - (data.length % 8))
  while (data.length < cpty) {
    data += "11101100"
    if (data.length < cpty) data += "00010001"
  }
  return data
}

function interleave(this: void, blocks: readonly string[], until: number): string {
  let arranged = ""
  let pos = 1
  do {
    for (const block of blocks) {
      if (pos < block.length) arranged += block.substring(pos - 1, pos + 7)
    }
    pos += 8
  } while (arranged.length !== until)
  return arranged
}

function arrangeCodewordsAndCalculateEc(
  this: void,
  version: number,
  ecLevel: number,
  data: string
): string {
  const groups = (EC_BLOCKS[version - 1] ?? [])[ecLevel - 1] ?? []
  const dataBlocks: string[] = []
  const ecBlocks: string[] = []
  let pos = 0
  let cptyEcBits = 0
  for (const group of groups) {
    const count = group[0] ?? 0
    const sizeDataBlockBytes = group[2] ?? 0
    const sizeEcBlockBytes = (group[1] ?? 0) - sizeDataBlockBytes
    for (let n = 1; n <= count; n++) {
      cptyEcBits += sizeEcBlockBytes * 8
      const block = data.substring(pos * 8, (pos + sizeDataBlockBytes) * 8)
      dataBlocks.push(block)
      let ecString = ""
      for (const codeword of calculateErrorCorrection(block, sizeEcBlockBytes)) {
        ecString += binary(codeword, 8)
      }
      ecBlocks.push(ecString)
      pos += sizeDataBlockBytes
    }
  }
  return interleave(dataBlocks, data.length) + interleave(ecBlocks, cptyEcBits)
}

export function qrcode(
  this: void,
  str: string,
  requestedEcLevel?: number
): LuaMultiReturn<[true, number[][]] | [false, string]> {
  const mode = modeOf(str)
  const { version, ecLevel } = versionAndEcLevel(str.length, mode, requestedEcLevel)
  const lengthString = binary(str.length, lengthDigits(version, tableMode(mode)))
  let data = binary(mode, 4) + lengthString + encodeData(str, mode)
  data = addPadData(version, ecLevel, data)
  let arranged = arrangeCodewordsAndCalculateEc(version, ecLevel, data)
  if (arranged.length % 8 !== 0) {
    return $multi<[false, string]>(
      false,
      `Arranged data % 8 != 0: data length = ${arranged.length}, mod 8 = ${arranged.length % 8}`
    )
  }
  arranged += "0".repeat(REMAINDER[version - 1] ?? 0)
  return $multi<[true, number[][]]>(true, matrixWithLowestPenalty(version, ecLevel, arranged))
}
