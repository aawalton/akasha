import { describe, expect, test } from "bun:test"
import {
  bytesOfSamples,
  dequeued,
  doubled,
  emptied,
  mixed,
  muLawOfSample,
  muLawOfSamples,
  queued,
  queueHolding,
  sampleOfMuLaw,
  samplesOfBytes,
  samplesOfMuLaw,
  speaking,
  thirded,
} from "akasha/alan/couples-therapy/couples-call/modules/audio/couples-call-audio.module.code.ts"

describe("mu-law", () => {
  test("silence is 0xff and reads back as nothing", () => {
    expect(muLawOfSample(0)).toBe(0xff)
    expect(sampleOfMuLaw(0xff)).toBe(0)
  })

  test("every byte survives being read and written again", () => {
    for (let byte = 0; byte < 256; byte += 1) {
      if (byte === 0x7f) continue
      expect(muLawOfSample(sampleOfMuLaw(byte))).toBe(byte)
    }
  })

  test("a sample comes back within the step mu-law keeps at its loudness", () => {
    for (const sample of [100, -100, 1000, -5000, 20_000, -32_000]) {
      const back = sampleOfMuLaw(muLawOfSample(sample))
      expect(Math.abs(back - sample)).toBeLessThanOrEqual(Math.abs(sample) / 16 + 8)
    }
  })

  test("a frame is read and written whole", () => {
    const frame = new Int16Array([0, 1000, -1000])
    expect([...samplesOfMuLaw(muLawOfSamples(frame))]).toEqual([0, 988, -988])
  })
})

describe("rates", () => {
  test("8 kHz doubles to 16 kHz, halfway samples between", () => {
    expect([...doubled(new Int16Array([0, 100]))]).toEqual([0, 50, 100, 100])
  })

  test("24 kHz thirds to 8 kHz by averaging", () => {
    expect([...thirded(new Int16Array([3, 6, 9, 30, 30, 30, 1]))]).toEqual([6, 30])
  })

  test("16-bit samples survive bytes", () => {
    const samples = new Int16Array([0, 32_767, -32_768, 5])
    expect([...samplesOfBytes(bytesOfSamples(samples))]).toEqual([...samples])
  })
})

describe("mixing", () => {
  test("frames add, clamped to 16 bits, and a short frame counts as silence", () => {
    expect([...mixed(new Int16Array([30_000, 1]), new Int16Array([10_000]))]).toEqual([32_767, 1])
  })

  test("a loud frame is speaking and a quiet one is not", () => {
    expect(speaking(new Int16Array(160).fill(3000))).toBe(true)
    expect(speaking(new Int16Array(160).fill(50))).toBe(false)
  })
})

describe("a sample queue", () => {
  test("samples come out in order, and silence fills what is not held", () => {
    const queue = queueHolding(100)
    queued(queue, new Int16Array([1, 2, 3]))
    queued(queue, new Int16Array([4]))
    expect([...dequeued(queue, 2)]).toEqual([1, 2])
    expect([...dequeued(queue, 3)]).toEqual([3, 4, 0])
    expect(queue.length).toBe(0)
  })

  test("a queue past what it holds drops its oldest samples", () => {
    const queue = queueHolding(4)
    for (let at = 0; at < 4; at += 1) queued(queue, new Int16Array([at, at]))
    expect(queue.length).toBeLessThanOrEqual(6)
    expect([...dequeued(queue, 2)]).not.toEqual([0, 0])
  })

  test("an emptied queue holds nothing", () => {
    const queue = queueHolding(100)
    queued(queue, new Int16Array([1, 2]))
    emptied(queue)
    expect([...dequeued(queue, 2)]).toEqual([0, 0])
  })
})
