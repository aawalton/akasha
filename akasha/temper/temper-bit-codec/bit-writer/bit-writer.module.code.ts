import "@akasha/temper-eso-types/eso-functions-01"

export interface BitWriterState {
  bytes: readonly number[]
  currentByte: number
  bitPosition: number
}

export function makeBitWriter(): BitWriterState {
  return { bytes: [], currentByte: 0, bitPosition: 0 }
}

export function writeBits(state: BitWriterState, value: number, numBits: number): undefined {
  const mask = numBits === 32 ? 0xffffffff : BitLShift(1, numBits) - 1
  value = BitAnd(value, mask)

  for (let i = numBits - 1; i >= 0; i--) {
    const bitValue = BitAnd(BitRShift(value, i), 1)
    state.currentByte = BitOr(BitLShift(state.currentByte, 1), bitValue)
    state.bitPosition++

    if (state.bitPosition === 8) {
      state.bytes = [...state.bytes, state.currentByte]
      state.currentByte = 0
      state.bitPosition = 0
    }
  }
}

export function bitWriterToBytes(state: BitWriterState): readonly number[] {
  const result = [...state.bytes]

  if (state.bitPosition > 0) {
    result.push(BitLShift(state.currentByte, 8 - state.bitPosition))
  }

  return result
}

export function bitsWritten(state: BitWriterState): number {
  return state.bytes.length * 8 + state.bitPosition
}
