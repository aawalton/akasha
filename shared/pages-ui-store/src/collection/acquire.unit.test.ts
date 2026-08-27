import { beforeEach, describe, expect, it } from "bun:test"
import { NEVER_MATCH_SLUG } from "@shared/pages-access/sentinels"
import {
  type AcquireRegistry,
  acquireShape,
  acquireSlug,
  attachDetachedShapes,
  createAcquireRegistry,
  isShapeReady,
  isSlugReady,
  markSeededReady,
  markShapeDetached,
  markShapeReady,
  releaseShape,
  releaseSlug,
  whenShapeReady,
  whenSlugReady,
} from "./acquire"
import type { ShapeDescriptor } from "./shape-descriptor"

let attachLog: string[] = []
let stopLog: string[] = []

function makeRegistry(
  onAttach?: (reg: AcquireRegistry, shapeKey: string) => void
): AcquireRegistry {
  let self: AcquireRegistry | null = null
  const reg = createAcquireRegistry((descriptor: ShapeDescriptor) => {
    attachLog.push(descriptor.shapeKey)
    if (self !== null) onAttach?.(self, descriptor.shapeKey)
    return () => {
      stopLog.push(descriptor.shapeKey)
    }
  })
  self = reg
  return reg
}

beforeEach(() => {
  attachLog = []
  stopLog = []
})

describe("acquire registry — S4a sentinel short-circuit", () => {
  it("never-match sentinel acquire is a no-op — never enters map, never attaches", () => {
    const reg = makeRegistry()
    acquireSlug(reg, NEVER_MATCH_SLUG)
    expect(attachLog).toEqual([])
    expect(reg.shapes.has(NEVER_MATCH_SLUG)).toBe(false)
  })

  it("never-match sentinel is ready-immediately and never wedges the barrier", async () => {
    const reg = makeRegistry()
    expect(isSlugReady(reg, NEVER_MATCH_SLUG)).toBe(true)
    await expect(whenSlugReady(reg, NEVER_MATCH_SLUG)).resolves.toBeUndefined()
  })

  it("sentinel release is a no-op (refcounts stay balanced)", () => {
    const reg = makeRegistry()
    expect(() => releaseSlug(reg, NEVER_MATCH_SLUG)).not.toThrow()
    expect(stopLog).toEqual([])
  })

  it("contrast — a real slug DOES attach (sentinel assertions are not vacuous)", () => {
    const reg = makeRegistry()
    acquireSlug(reg, "task")
    expect(attachLog).toEqual(["task"])
    expect(reg.shapes.get("task")?.count).toBe(1)
  })
})

describe("acquire registry — refcounting", () => {
  it("second acquire increments the count without re-attaching", () => {
    const reg = makeRegistry()
    acquireSlug(reg, "task")
    acquireSlug(reg, "task")
    expect(attachLog).toEqual(["task"])
    expect(reg.shapes.get("task")?.count).toBe(2)
  })

  it("release stops the attachment and drops the entry only at 1→0", () => {
    const reg = makeRegistry()
    acquireSlug(reg, "task")
    acquireSlug(reg, "task")
    releaseSlug(reg, "task")
    expect(stopLog).toEqual([])
    expect(reg.shapes.get("task")?.count).toBe(1)
    releaseSlug(reg, "task")
    expect(stopLog).toEqual(["task"])
    expect(reg.shapes.has("task")).toBe(false)
  })

  it("releasing an unacquired slug is a no-op", () => {
    const reg = makeRegistry()
    expect(() => releaseSlug(reg, "task")).not.toThrow()
    expect(stopLog).toEqual([])
  })
})

describe("acquire registry — readiness", () => {
  it("an acquired slug is not ready until marked", () => {
    const reg = makeRegistry()
    acquireSlug(reg, "task")
    expect(isSlugReady(reg, "task")).toBe(false)
  })

  it("markSlugReady flips readiness and resolves pending waiters, idempotently", async () => {
    const reg = makeRegistry()
    acquireSlug(reg, "task")
    const waiter = whenSlugReady(reg, "task")
    markShapeReady(reg, "task")
    markShapeReady(reg, "task")
    expect(isSlugReady(reg, "task")).toBe(true)
    await expect(waiter).resolves.toBeUndefined()
  })

  it("whenSlugReady resolves immediately once already ready", async () => {
    const reg = makeRegistry()
    acquireSlug(reg, "task")
    markShapeReady(reg, "task")
    await expect(whenSlugReady(reg, "task")).resolves.toBeUndefined()
  })

  it("an unacquired non-sentinel slug resolves immediately (never wedges)", async () => {
    const reg = makeRegistry()
    expect(isSlugReady(reg, "task")).toBe(false)
    await expect(whenSlugReady(reg, "task")).resolves.toBeUndefined()
  })

  it("synchronous onSlugLive during attach finds the entry (in-session resume)", () => {
    const reg = makeRegistry((r, slug) => markShapeReady(r, slug))
    acquireSlug(reg, "task")
    expect(isSlugReady(reg, "task")).toBe(true)
  })
})

describe("acquire registry — per-shape readiness decoupling (#14777 count-badge anti-wedge)", () => {
  it("one slug never readying does not gate a different slug's readiness", async () => {
    const reg = makeRegistry()
    acquireSlug(reg, "story")
    acquireSlug(reg, "notification")

    markShapeReady(reg, "story")

    expect(isSlugReady(reg, "story")).toBe(true)
    await expect(whenSlugReady(reg, "story")).resolves.toBeUndefined()

    expect(isSlugReady(reg, "notification")).toBe(false)
    const marker = Symbol("still-pending")
    const raced = await Promise.race([whenSlugReady(reg, "notification"), Promise.resolve(marker)])
    expect(raced).toBe(marker)
  })
})

describe("acquire registry — seed readiness (#14948, offline mirror)", () => {
  it("a fresh registry is not seed-ready (browser / cold-first-launch default)", () => {
    const reg = makeRegistry()
    expect(reg.seededReady).toBe(false)
    acquireSlug(reg, "story-chapter")
    expect(isSlugReady(reg, "story-chapter")).toBe(false)
  })

  it("markSeededReady resolves an already-pending waiter (pre-hydration acquire)", async () => {
    const reg = makeRegistry()
    acquireSlug(reg, "page-type")
    const waiter = whenSlugReady(reg, "page-type")
    markSeededReady(reg)
    expect(isSlugReady(reg, "page-type")).toBe(true)
    await expect(waiter).resolves.toBeUndefined()
  })

  it("after seed-ready, a slug acquired later resolves immediately from the mirror", async () => {
    const reg = makeRegistry()
    markSeededReady(reg)
    acquireSlug(reg, "story-chapter")
    expect(isSlugReady(reg, "story-chapter")).toBe(true)
    await expect(whenSlugReady(reg, "story-chapter")).resolves.toBeUndefined()
  })

  it("seed-ready resolves an EMPTY / unacquired slug (render empty, never spin)", async () => {
    const reg = makeRegistry()
    markSeededReady(reg)
    expect(isSlugReady(reg, "story")).toBe(true)
    await expect(whenSlugReady(reg, "story")).resolves.toBeUndefined()
  })

  it("seed-ready covers a cross-type shapeKey too", async () => {
    const reg = makeRegistry()
    markSeededReady(reg)
    expect(isShapeReady(reg, "cross:favorites")).toBe(true)
    await expect(whenShapeReady(reg, "cross:favorites")).resolves.toBeUndefined()
  })

  it("is monotonic — a later onShapeLive never flips readiness back", () => {
    const reg = makeRegistry()
    markSeededReady(reg)
    acquireSlug(reg, "story-chapter")
    markShapeReady(reg, "story-chapter")
    expect(isSlugReady(reg, "story-chapter")).toBe(true)
    markSeededReady(reg)
    expect(reg.seededReady).toBe(true)
  })
})

describe("acquire registry — generic shapeKey core (#14635 cross-type)", () => {
  const crossDescriptor: ShapeDescriptor = {
    shapeKey: "cross:favorites",
  }

  it("acquires a cross-type descriptor once and refcounts by shapeKey", () => {
    const reg = makeRegistry()
    acquireShape(reg, crossDescriptor)
    acquireShape(reg, crossDescriptor)
    expect(attachLog).toEqual(["cross:favorites"])
    expect(reg.shapes.get("cross:favorites")?.count).toBe(2)
  })

  it("last release stops the cross-type shape and drops the entry", () => {
    const reg = makeRegistry()
    acquireShape(reg, crossDescriptor)
    releaseShape(reg, "cross:favorites")
    expect(stopLog).toEqual(["cross:favorites"])
    expect(reg.shapes.has("cross:favorites")).toBe(false)
  })

  it("readiness barrier works for a cross-type shapeKey", async () => {
    const reg = makeRegistry()
    acquireShape(reg, crossDescriptor)
    expect(isShapeReady(reg, "cross:favorites")).toBe(false)
    const waiter = whenShapeReady(reg, "cross:favorites")
    markShapeReady(reg, "cross:favorites")
    expect(isShapeReady(reg, "cross:favorites")).toBe(true)
    await expect(waiter).resolves.toBeUndefined()
  })
})

function makeSessionGatedRegistry(session: { present: boolean }): AcquireRegistry {
  return createAcquireRegistry((descriptor: ShapeDescriptor) => {
    if (!session.present) return null
    attachLog.push(descriptor.shapeKey)
    return () => {
      stopLog.push(descriptor.shapeKey)
    }
  })
}

describe("acquire registry — attach deferral + replay (#15907)", () => {
  it("a declined attach opens nothing but still creates a refcounted entry", () => {
    const reg = makeSessionGatedRegistry({ present: false })
    acquireSlug(reg, "temper-task")
    expect(attachLog).toEqual([])
    expect(reg.shapes.get("temper-task")?.count).toBe(1)
    expect(reg.shapes.get("temper-task")?.stop).toBeNull()
    expect(reg.shapes.get("temper-task")?.detached).toBe(true)
  })

  it("replay attaches the deferred shape once a session lands, and clears detached", () => {
    const session = { present: false }
    const reg = makeSessionGatedRegistry(session)
    acquireSlug(reg, "temper-task")
    expect(attachLog).toEqual([])

    session.present = true
    attachDetachedShapes(reg)

    expect(attachLog).toEqual(["temper-task"])
    expect(reg.shapes.get("temper-task")?.detached).toBe(false)
    expect(reg.shapes.get("temper-task")?.stop).not.toBeNull()
  })

  it("replay is a no-op for an already-attached shape (never double-opens)", () => {
    const reg = makeSessionGatedRegistry({ present: true })
    acquireSlug(reg, "temper-task")
    expect(attachLog).toEqual(["temper-task"])
    attachDetachedShapes(reg)
    expect(attachLog).toEqual(["temper-task"])
  })

  it("replay re-attaches a shape whose attachment died terminally", () => {
    const reg = makeSessionGatedRegistry({ present: true })
    acquireSlug(reg, "temper-task")
    expect(attachLog).toEqual(["temper-task"])

    markShapeDetached(reg, "temper-task")
    expect(reg.shapes.get("temper-task")?.detached).toBe(true)

    attachDetachedShapes(reg)
    expect(stopLog).toEqual(["temper-task"])
    expect(attachLog).toEqual(["temper-task", "temper-task"])
    expect(reg.shapes.get("temper-task")?.detached).toBe(false)
  })

  it("replay that is still declined leaves the shape detached for a later retry", () => {
    const reg = makeSessionGatedRegistry({ present: false })
    acquireSlug(reg, "temper-task")
    attachDetachedShapes(reg)
    expect(attachLog).toEqual([])
    expect(reg.shapes.get("temper-task")?.detached).toBe(true)
  })

  it("a deferred shape keeps its descriptor so the replay opens the right shape", () => {
    const session = { present: false }
    const reg = makeSessionGatedRegistry(session)
    acquireShape(reg, {
      shapeKey: "cross:favorites",
    })
    session.present = true
    attachDetachedShapes(reg)
    expect(attachLog).toEqual(["cross:favorites"])
  })

  it("markShapeDetached is inert for an unknown shapeKey", () => {
    const reg = makeSessionGatedRegistry({ present: true })
    expect(() => markShapeDetached(reg, "never-acquired")).not.toThrow()
  })
})
