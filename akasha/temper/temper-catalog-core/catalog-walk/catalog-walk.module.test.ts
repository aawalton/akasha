import { describe, expect, test } from "bun:test"
import {
  type CatalogWalkDeps,
  type CatalogWalkDomain,
  type CatalogWalkOptions,
  type CatalogWalkVerdict,
  runCatalogWalk,
  summarizeCatalogWalk,
} from "./catalog-walk.module.code.ts"

const OPTIONS: CatalogWalkOptions = { domainDelayMs: 100, domainTimeoutMs: 60_000 }

function makeHarness() {
  const collectedKeys = new Set<string>()
  const log: string[] = []
  let now = 0
  let timers: { at: number; seq: number; run: () => void }[] = []
  let seq = 0

  const deps: CatalogWalkDeps = {
    attempt: (run) => {
      try {
        run()
        return undefined
      } catch (thrown) {
        return thrown instanceof Error ? thrown.message : String(thrown)
      }
    },
    schedule: (run, delayMs) => {
      seq += 1
      timers.push({ at: now + delayMs, seq, run })
    },
    hasCollected: (domainKey) => collectedKeys.has(domainKey),
    log: (message) => {
      log.push(message)
    },
  }

  function runTo(horizon: number): undefined {
    for (;;) {
      const due = timers.filter((t) => t.at <= horizon)
      if (due.length === 0) return
      let next = due[0]
      if (next === undefined) return
      for (const candidate of due) {
        if (candidate.at < next.at || (candidate.at === next.at && candidate.seq < next.seq)) {
          next = candidate
        }
      }
      const chosen = next
      timers = timers.filter((t) => t !== chosen)
      now = chosen.at
      chosen.run()
    }
  }

  return { collectedKeys, deps, log, runTo }
}

function healthy(key: string, collectedKeys: Set<string>): CatalogWalkDomain {
  return {
    key,
    collect: (onComplete) => {
      collectedKeys.add(key)
      onComplete()
    },
  }
}

function throwing(key: string, message: string): CatalogWalkDomain {
  return {
    key,
    collect: () => {
      throw new Error(message)
    },
  }
}

function silentlyStalling(key: string): CatalogWalkDomain {
  return { key, collect: () => {} }
}

function runWalk(
  domains: readonly CatalogWalkDomain[],
  harness: ReturnType<typeof makeHarness>,
  horizon = 500_000
): CatalogWalkVerdict | undefined {
  let verdict: CatalogWalkVerdict | undefined
  runCatalogWalk(domains, harness.deps, OPTIONS, (result) => {
    verdict = result
  })
  harness.runTo(horizon)
  return verdict
}

describe("runCatalogWalk — a failing collector does not halt the walk", () => {
  test("a collector that throws is skipped and every later domain still runs", () => {
    const h = makeHarness()
    const domains = [
      healthy("alphaCatalog", h.collectedKeys),
      throwing("betaCatalog", "attempt to compare number with nil"),
      healthy("gammaCatalog", h.collectedKeys),
      healthy("deltaCatalog", h.collectedKeys),
    ]

    const verdict = runWalk(domains, h)

    expect(verdict).toBeDefined()
    expect(verdict?.collected).toEqual(["alphaCatalog", "gammaCatalog", "deltaCatalog"])
    expect(verdict?.completed).toBe(false)
    expect(verdict?.skips).toEqual([
      { domain: "betaCatalog", reason: "attempt to compare number with nil" },
    ])
  })

  test("a collector that never invokes its callback times out and the walk continues", () => {
    const h = makeHarness()
    const domains = [
      healthy("alphaCatalog", h.collectedKeys),
      silentlyStalling("betaCatalog"),
      healthy("gammaCatalog", h.collectedKeys),
    ]

    const verdict = runWalk(domains, h)

    expect(verdict?.collected).toEqual(["alphaCatalog", "gammaCatalog"])
    expect(verdict?.skips).toHaveLength(1)
    expect(verdict?.skips[0]?.domain).toBe("betaCatalog")
    expect(verdict?.skips[0]?.reason).toContain("60000")
  })

  test("a late callback arriving after the watchdog does not advance the walk twice", () => {
    const h = makeHarness()
    function slow(key: string, delayMs: number): CatalogWalkDomain {
      return {
        key,
        collect: (onComplete) => {
          h.deps.schedule(() => {
            h.collectedKeys.add(key)
            onComplete()
          }, delayMs)
        },
      }
    }
    const domains = [slow("alphaCatalog", 70_000), slow("betaCatalog", 40_000)]

    let finishes = 0
    let verdict: CatalogWalkVerdict | undefined
    runCatalogWalk(domains, h.deps, OPTIONS, (result) => {
      finishes += 1
      verdict = result
    })
    h.runTo(500_000)

    expect(finishes).toBe(1)
    expect(verdict?.collected).toEqual(["alphaCatalog", "betaCatalog"])
    expect(verdict?.completed).toBe(true)
  })

  test("every domain is walked even when they all throw", () => {
    const h = makeHarness()
    const domains = [
      throwing("alphaCatalog", "boom a"),
      throwing("betaCatalog", "boom b"),
      throwing("gammaCatalog", "boom c"),
    ]

    const verdict = runWalk(domains, h)

    expect(verdict?.collected).toEqual([])
    expect(verdict?.skips.map((s) => s.domain)).toEqual([
      "alphaCatalog",
      "betaCatalog",
      "gammaCatalog",
    ])
    expect(verdict?.completed).toBe(false)
  })

  test("an all-healthy walk reports completion with no skips", () => {
    const h = makeHarness()
    const domains = [
      healthy("alphaCatalog", h.collectedKeys),
      healthy("betaCatalog", h.collectedKeys),
    ]

    const verdict = runWalk(domains, h)

    expect(verdict).toEqual({
      completed: true,
      collected: ["alphaCatalog", "betaCatalog"],
      skips: [],
    })
  })

  test("sum invariant: every walked domain is either collected or explained", () => {
    const h = makeHarness()
    const domains = [
      healthy("alphaCatalog", h.collectedKeys),
      throwing("betaCatalog", "boom"),
      silentlyStalling("gammaCatalog"),
      healthy("deltaCatalog", h.collectedKeys),
    ]

    const verdict = runWalk(domains, h)

    expect(verdict).toBeDefined()
    const collected = verdict?.collected.length ?? 0
    const skipped = verdict?.skips.length ?? 0
    expect(collected + skipped).toBe(domains.length)
    expect(verdict?.completed).toBe(skipped === 0)
  })
})

describe("summarizeCatalogWalk — the verdict is settled against what landed", () => {
  test("a collector that reported completion but wrote nothing is a skip, not a collection", () => {
    const verdict = summarizeCatalogWalk(
      [
        { domain: "alphaCatalog", failure: undefined },
        { domain: "betaCatalog", failure: undefined },
      ],
      (key) => key === "alphaCatalog"
    )

    expect(verdict.collected).toEqual(["alphaCatalog"])
    expect(verdict.skips).toEqual([
      { domain: "betaCatalog", reason: "collector reported completion but wrote no catalog data" },
    ])
    expect(verdict.completed).toBe(false)
  })

  test("a domain that failed but whose key is present is credited as collected", () => {
    const verdict = summarizeCatalogWalk(
      [{ domain: "alphaCatalog", failure: "timed out" }],
      () => true
    )

    expect(verdict.collected).toEqual(["alphaCatalog"])
    expect(verdict.skips).toEqual([])
    expect(verdict.completed).toBe(true)
  })

  test("an empty walk is complete", () => {
    expect(summarizeCatalogWalk([], () => false)).toEqual({
      completed: true,
      collected: [],
      skips: [],
    })
  })
})
