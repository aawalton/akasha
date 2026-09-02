import "@akasha/temper-eso-types/eso-functions-01"
import { requireAt } from "@akasha/utils-narrow/require-at"

export interface BitReaderState {
  data: readonly number[]
  byteIndex: number
  bitPosition: number
}

export function makeBitReader(data: readonly number[]): BitReaderState {
  return { data, byteIndex: 0, bitPosition: 0 }
}

export function readBits(state: BitReaderState, numBits: number): number {
  let value = 0

  for (let i = 0; i < numBits; i++) {
    if (state.byteIndex >= state.data.length) {
      return value
    }

    const bitIndex = 7 - state.bitPosition
    const bit = BitAnd(
      BitRShift(requireAt(state.data, state.byteIndex, "bit-reader data"), bitIndex),
      1
    )
    value = BitOr(BitLShift(value, 1), bit)

    state.bitPosition++
    if (state.bitPosition === 8) {
      state.byteIndex++
      state.bitPosition = 0
    }
  }

  return value
}

export function hasMoreBits(state: BitReaderState): boolean {
  return state.byteIndex < state.data.length
}
