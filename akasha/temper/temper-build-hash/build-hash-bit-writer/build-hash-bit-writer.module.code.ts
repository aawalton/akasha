export interface BitWriterState {
  bytes: readonly number[]
  currentByte: number
  bitPosition: number
}

export function makeBitWriter(): BitWriterState {
  return { bytes: [], currentByte: 0, bitPosition: 0 }
}

export function writeBits(state: BitWriterState, value: number, bits: number): undefined {
  if (bits < 1 || bits > 32) {
    throw new Error(`Invalid bit count: ${bits}`)
  }

  const mask = bits === 32 ? 0xffffffff : (1 << bits) - 1
  value = value & mask

  for (let i = bits - 1; i >= 0; i--) {
    const bit = (value >> i) & 1
    state.currentByte = (state.currentByte << 1) | bit
    state.bitPosition++

    if (state.bitPosition === 8) {
      state.bytes = [...state.bytes, state.currentByte]
      state.currentByte = 0
      state.bitPosition = 0
    }
  }
}

export function bitWriterToBytes(state: BitWriterState): Uint8Array {
  const result = [...state.bytes]

  if (state.bitPosition > 0) {
    result.push(state.currentByte << (8 - state.bitPosition))
  }

  return new Uint8Array(result)
}
