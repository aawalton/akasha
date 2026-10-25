export const LEG_RATE = 8000

export const HEARD_RATE = 16_000

export const FRAME_MS = 20

export const FRAME_SAMPLES = (LEG_RATE * FRAME_MS) / 1000

const INT16_TOP = 0x7fff

const INT16_BOTTOM = -0x8000

const MU_BIAS = 0x84

const MU_CLIP = 32_635

const SPEAKING_RMS = 900

export function sampleOfMuLaw(byte: number): number {
  const flipped = ~byte & 0xff
  const exponent = (flipped >> 4) & 0x07
  const mantissa = flipped & 0x0f
  const magnitude = (((mantissa << 3) + MU_BIAS) << exponent) - MU_BIAS
  return (flipped & 0x80) === 0 ? magnitude : -magnitude
}

export function muLawOfSample(sample: number): number {
  const sign = sample < 0 ? 0x80 : 0
  const magnitude = Math.min(Math.abs(Math.round(sample)), MU_CLIP) + MU_BIAS
  let exponent = 7
  for (let mask = 0x4000; (magnitude & mask) === 0 && exponent > 0; mask >>= 1) exponent -= 1
  const mantissa = (magnitude >> (exponent + 3)) & 0x0f
  return ~(sign | (exponent << 4) | mantissa) & 0xff
}

export function samplesOfMuLaw(bytes: Uint8Array): Int16Array {
  const made = new Int16Array(bytes.length)
  for (let at = 0; at < bytes.length; at += 1) made[at] = sampleOfMuLaw(bytes[at] ?? 0xff)
  return made
}

export function muLawOfSamples(samples: Int16Array): Uint8Array {
  const made = new Uint8Array(samples.length)
  for (let at = 0; at < samples.length; at += 1) made[at] = muLawOfSample(samples[at] ?? 0)
  return made
}

function clamped(sum: number): number {
  return Math.max(INT16_BOTTOM, Math.min(INT16_TOP, sum))
}

export function mixed(...frames: readonly Int16Array[]): Int16Array {
  const length = Math.max(0, ...frames.map((one) => one.length))
  const made = new Int16Array(length)
  for (let at = 0; at < length; at += 1) {
    let sum = 0
    for (const one of frames) sum += one[at] ?? 0
    made[at] = clamped(sum)
  }
  return made
}

export function doubled(samples: Int16Array): Int16Array {
  const made = new Int16Array(samples.length * 2)
  for (let at = 0; at < samples.length; at += 1) {
    const here = samples[at] ?? 0
    const next = samples[at + 1] ?? here
    made[at * 2] = here
    made[at * 2 + 1] = Math.round((here + next) / 2)
  }
  return made
}

export function thirded(samples: Int16Array): Int16Array {
  const made = new Int16Array(Math.floor(samples.length / 3))
  for (let at = 0; at < made.length; at += 1) {
    const from = at * 3
    made[at] = Math.round(
      ((samples[from] ?? 0) + (samples[from + 1] ?? 0) + (samples[from + 2] ?? 0)) / 3
    )
  }
  return made
}

export function samplesOfBytes(bytes: Uint8Array): Int16Array {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const made = new Int16Array(Math.floor(bytes.byteLength / 2))
  for (let at = 0; at < made.length; at += 1) made[at] = view.getInt16(at * 2, true)
  return made
}

export function bytesOfSamples(samples: Int16Array): Uint8Array {
  const made = new Uint8Array(samples.length * 2)
  const view = new DataView(made.buffer)
  for (let at = 0; at < samples.length; at += 1) view.setInt16(at * 2, samples[at] ?? 0, true)
  return made
}

export function speaking(frame: Int16Array): boolean {
  if (frame.length === 0) return false
  let sum = 0
  for (const one of frame) sum += one * one
  return Math.sqrt(sum / frame.length) > SPEAKING_RMS
}

export type SampleQueue = {
  readonly holds: number
  readonly held: Int16Array[]
  length: number
}

export function queueHolding(holds: number): SampleQueue {
  return { holds, held: [], length: 0 }
}

export function queued(queue: SampleQueue, samples: Int16Array): undefined {
  if (samples.length === 0) return
  queue.held.push(samples)
  queue.length += samples.length
  while (queue.length - (queue.held[0]?.length ?? 0) >= queue.holds) {
    queue.length -= queue.held.shift()?.length ?? 0
  }
  return undefined
}

export function dequeued(queue: SampleQueue, count: number): Int16Array {
  const made = new Int16Array(count)
  let at = 0
  while (at < count && queue.held.length > 0) {
    const first = queue.held[0] ?? new Int16Array(0)
    const taken = Math.min(count - at, first.length)
    made.set(first.subarray(0, taken), at)
    at += taken
    queue.length -= taken
    if (taken === first.length) queue.held.shift()
    else queue.held[0] = first.subarray(taken)
  }
  return made
}

export function emptied(queue: SampleQueue): undefined {
  queue.held.length = 0
  queue.length = 0
  return undefined
}
