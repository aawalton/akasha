export interface BitReaderState {
  data: Uint8Array
  byteIndex: number
  bitPosition: number
}

export function makeBitReader(data: Uint8Array): BitReaderState {
  return { data, byteIndex: 0, bitPosition: 0 }
}

export function readBits(state: BitReaderState, bits: number): number {
  if (bits < 1 || bits > 32) {
    throw new Error(`Invalid bit count: ${bits}`)
  }

  let value = 0

  for (let i = 0; i < bits; i++) {
    const byte = state.data[state.byteIndex]
    if (byte === undefined) {
      throw new Error("Unexpected end of data")
    }

    const bitIndex = 7 - state.bitPosition
    const bit = (byte >> bitIndex) & 1
    value = (value << 1) | bit

    state.bitPosition++
    if (state.bitPosition === 8) {
      state.byteIndex++
      state.bitPosition = 0
    }
  }

  return value
}
