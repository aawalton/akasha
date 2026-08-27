import { beforeEach, describe, expect, test } from "bun:test"
import { createMutex } from "./mutex"
import { createSwapController, type SwapEffects } from "./swap"

const upPorts = new Set<number>()
const startCalls: string[] = []
const stopCalls: string[] = []
const labelToPort = new Map<string, number>()

const effects: SwapEffects = {
  startService: async (_uid, label) => {
    startCalls.push(label)
    const port = labelToPort.get(label)
    if (port !== undefined) upPorts.add(port)
  },
  stopService: async (_uid, label) => {
    stopCalls.push(label)
    const port = labelToPort.get(label)
    if (port !== undefined) upPorts.delete(port)
  },
  killService: async (_uid, label) => {
    const port = labelToPort.get(label)
    if (port !== undefined) upPorts.delete(port)
  },
  waitForPort: async (_host, port) => upPorts.has(port),
  waitForPortFree: async (_host, port) => !upPorts.has(port),
}

const QWEN_LABEL = "com.alanwalton.inference.image-edit-qwen"
const config = {
  adminPort: 8099,
  warmSet: [],
  services: [
    {
      name: "image-edit-qwen",
      publicPort: 8088,
      publicHost: "0.0.0.0" as const,
      internalPort: 18088,
      launchdLabel: QWEN_LABEL,
    },
  ],
}

beforeEach(() => {
  upPorts.clear()
  startCalls.length = 0
  stopCalls.length = 0
  labelToPort.clear()
  labelToPort.set(QWEN_LABEL, 18088)
})

describe("createSwapController.ensureLive self-heal", () => {
  test("re-loads a service the cop believes is resident but whose port has died", async () => {
    const [qwen] = config.services
    if (qwen === undefined) throw new Error("fixture")
    const swap = createSwapController(config, createMutex(), effects)

    expect((await swap.ensureLive(qwen)).ok).toBe(true)
    expect(startCalls).toEqual([QWEN_LABEL])
    expect(swap.getResident()).toEqual(["image-edit-qwen"])

    upPorts.delete(18088)

    expect((await swap.ensureLive(qwen)).ok).toBe(true)
    expect(startCalls).toEqual([QWEN_LABEL, QWEN_LABEL])
    expect(swap.getResident()).toEqual(["image-edit-qwen"])
  })

  test("does not restart a service that is genuinely still resident (warm path)", async () => {
    const [qwen] = config.services
    if (qwen === undefined) throw new Error("fixture")
    const swap = createSwapController(config, createMutex(), effects)

    expect((await swap.ensureLive(qwen)).ok).toBe(true)
    expect(startCalls).toEqual([QWEN_LABEL])

    expect((await swap.ensureLive(qwen)).ok).toBe(true)
    expect(startCalls).toEqual([QWEN_LABEL])
  })
})

const MOSS_LABEL = "com.alanwalton.inference.moss-tts"
const GEN_LABEL = "com.alanwalton.inference.image-gen"
const OLLAMA_LABEL = "com.alanwalton.inference.ollama"
const warmConfig = {
  adminPort: 8099,
  warmSet: ["moss-tts", "image-gen"],
  services: [
    {
      name: "moss-tts",
      publicPort: 8093,
      publicHost: "0.0.0.0" as const,
      internalPort: 18093,
      launchdLabel: MOSS_LABEL,
    },
    {
      name: "image-gen",
      publicPort: 8086,
      publicHost: "0.0.0.0" as const,
      internalPort: 18086,
      launchdLabel: GEN_LABEL,
    },
    {
      name: "ollama",
      publicPort: 11434,
      publicHost: "0.0.0.0" as const,
      internalPort: 21434,
      launchdLabel: OLLAMA_LABEL,
    },
  ],
}

const wireWarm = () => {
  labelToPort.set(MOSS_LABEL, 18093)
  labelToPort.set(GEN_LABEL, 18086)
  labelToPort.set(OLLAMA_LABEL, 21434)
}

describe("createSwapController warm-set co-residency", () => {
  test("serving image-gen while moss-tts is resident keeps BOTH warm (no evict)", async () => {
    wireWarm()
    const [moss, gen] = warmConfig.services
    if (moss === undefined || gen === undefined) throw new Error("fixture")
    const swap = createSwapController(warmConfig, createMutex(), effects)

    expect((await swap.ensureLive(moss)).ok).toBe(true)
    expect((await swap.ensureLive(gen)).ok).toBe(true)

    expect(startCalls).toEqual([MOSS_LABEL, GEN_LABEL])
    expect(stopCalls).toEqual([])
    expect([...swap.getResident()].sort()).toEqual(["image-gen", "moss-tts"])

    expect((await swap.ensureLive(moss)).ok).toBe(true)
    expect(startCalls).toEqual([MOSS_LABEL, GEN_LABEL])
  })

  test("a non-warm request (ollama) evicts the whole warm set to bound RSS", async () => {
    wireWarm()
    const [moss, gen, ollama] = warmConfig.services
    if (moss === undefined || gen === undefined || ollama === undefined) throw new Error("fixture")
    const swap = createSwapController(warmConfig, createMutex(), effects)

    expect((await swap.ensureLive(moss)).ok).toBe(true)
    expect((await swap.ensureLive(gen)).ok).toBe(true)
    expect((await swap.ensureLive(ollama)).ok).toBe(true)

    expect(stopCalls.sort()).toEqual([GEN_LABEL, MOSS_LABEL])
    expect(swap.getResident()).toEqual(["ollama"])
  })
})

const twoServiceConfig = {
  adminPort: 8099,
  warmSet: [],
  services: [
    {
      name: "image-edit-qwen",
      publicPort: 8088,
      publicHost: "0.0.0.0" as const,
      internalPort: 18088,
      launchdLabel: QWEN_LABEL,
    },
    {
      name: "image-gen",
      publicPort: 8086,
      publicHost: "0.0.0.0" as const,
      internalPort: 18086,
      launchdLabel: GEN_LABEL,
    },
  ],
}

const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

describe("createSwapController.runWithPool serialization", () => {
  test("holds the pool across onReady — A's inference fully completes before B's swap begins", async () => {
    labelToPort.set(GEN_LABEL, 18086)
    const [qwen, gen] = twoServiceConfig.services
    if (qwen === undefined || gen === undefined) throw new Error("fixture")
    const swap = createSwapController(twoServiceConfig, createMutex(), effects)
    const order: string[] = []
    const onReady = (name: string, ms: number) => async (): Promise<string> => {
      order.push(`${name}:enter`)
      await delay(ms)
      order.push(`${name}:exit`)
      return name
    }

    const [a, b] = await Promise.all([
      swap.runWithPool(qwen, onReady("qwen", 30)),
      swap.runWithPool(gen, onReady("gen", 1)),
    ])

    expect(order).toEqual(["qwen:enter", "qwen:exit", "gen:enter", "gen:exit"])
    expect(a).toEqual({ ok: true, value: "qwen" })
    expect(b).toEqual({ ok: true, value: "gen" })
    expect(startCalls).toEqual([QWEN_LABEL, GEN_LABEL])
    expect(stopCalls).toEqual([QWEN_LABEL])
  })

  test("N concurrent same-service requests all run (none dropped), serialized FIFO", async () => {
    const [qwen] = twoServiceConfig.services
    if (qwen === undefined) throw new Error("fixture")
    const swap = createSwapController(twoServiceConfig, createMutex(), effects)
    let inFlight = 0
    let maxInFlight = 0
    const completions: number[] = []
    const onReady = (id: number) => async (): Promise<number> => {
      inFlight += 1
      maxInFlight = Math.max(maxInFlight, inFlight)
      await delay(5)
      inFlight -= 1
      completions.push(id)
      return id
    }

    const results = await Promise.all([0, 1, 2, 3].map((id) => swap.runWithPool(qwen, onReady(id))))

    expect(results.every((r) => r.ok)).toBe(true)
    expect(completions.length).toBe(4)
    expect(maxInFlight).toBe(1)
    expect(startCalls).toEqual([QWEN_LABEL])
  })

  test("a failed swap does not run onReady and reports the message", async () => {
    const [qwen] = config.services
    if (qwen === undefined) throw new Error("fixture")
    const throwingEffects: SwapEffects = {
      ...effects,
      startService: async () => {
        throw new Error("boom")
      },
    }
    const swap = createSwapController(config, createMutex(), throwingEffects)
    let ran = false
    const outcome = await swap.runWithPool(qwen, async () => {
      ran = true
      return "x"
    })

    expect(ran).toBe(false)
    expect(outcome.ok).toBe(false)
    if (!outcome.ok) expect(outcome.message).toContain("failed to start")
  })
})
