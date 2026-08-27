import { NEVER_MATCH_SLUG } from "@shared/pages-access/sentinels"
import { type ShapeDescriptor, slugShapeDescriptor } from "./shape-descriptor"

export interface ShapeAcquisition {
  count: number
  stop: (() => void) | null
  ready: boolean
  readyResolvers: readonly (() => void)[]
  descriptor: ShapeDescriptor
  detached: boolean
}

export interface AcquireRegistry {
  readonly shapes: Map<string, ShapeAcquisition>
  readonly attach: (descriptor: ShapeDescriptor) => (() => void) | null
  seededReady: boolean
}

export function createAcquireRegistry(
  attach: (descriptor: ShapeDescriptor) => (() => void) | null
): AcquireRegistry {
  return { shapes: new Map(), attach, seededReady: false }
}

export function acquireShape(reg: AcquireRegistry, descriptor: ShapeDescriptor): undefined {
  const { shapeKey } = descriptor
  const existing = reg.shapes.get(shapeKey)
  if (existing !== undefined) {
    existing.count += 1
    return
  }
  const entry: ShapeAcquisition = {
    count: 1,
    stop: null,
    ready: false,
    readyResolvers: [],
    descriptor,
    detached: false,
  }
  reg.shapes.set(shapeKey, entry)
  const stop = reg.attach(descriptor)
  entry.stop = stop
  if (stop === null) entry.detached = true
}

export function markShapeDetached(reg: AcquireRegistry, shapeKey: string): undefined {
  const entry = reg.shapes.get(shapeKey)
  if (entry === undefined) return
  entry.detached = true
}

export function attachDetachedShapes(reg: AcquireRegistry): undefined {
  for (const entry of reg.shapes.values()) {
    if (!entry.detached) continue
    entry.stop?.()
    entry.stop = null
    entry.detached = false
    const stop = reg.attach(entry.descriptor)
    if (stop === null) entry.detached = true
    else entry.stop = stop
  }
}

export function releaseShape(reg: AcquireRegistry, shapeKey: string): undefined {
  const existing = reg.shapes.get(shapeKey)
  if (existing === undefined) return
  existing.count -= 1
  if (existing.count > 0) {
    return
  }
  existing.stop?.()
  reg.shapes.delete(shapeKey)
}

export function markShapeReady(reg: AcquireRegistry, shapeKey: string): undefined {
  const entry = reg.shapes.get(shapeKey)
  if (entry === undefined || entry.ready) return
  entry.ready = true
  const resolvers = entry.readyResolvers
  entry.readyResolvers = []
  for (const resolve of resolvers) resolve()
}

export function markSeededReady(reg: AcquireRegistry): undefined {
  if (reg.seededReady) return
  reg.seededReady = true
  for (const entry of reg.shapes.values()) {
    if (entry.readyResolvers.length === 0) continue
    const resolvers = entry.readyResolvers
    entry.readyResolvers = []
    for (const resolve of resolvers) resolve()
  }
}

export function isShapeReady(reg: AcquireRegistry, shapeKey: string): boolean {
  if (reg.seededReady) return true
  return reg.shapes.get(shapeKey)?.ready ?? false
}

export function whenShapeReady(reg: AcquireRegistry, shapeKey: string): Promise<void> {
  if (reg.seededReady) return Promise.resolve()
  const entry = reg.shapes.get(shapeKey)
  if (entry === undefined || entry.ready) return Promise.resolve()
  return new Promise<void>((resolve) => {
    entry.readyResolvers = [...entry.readyResolvers, resolve]
  })
}

export function acquireSlug(reg: AcquireRegistry, slug: string): undefined {
  if (slug === NEVER_MATCH_SLUG) return
  acquireShape(reg, slugShapeDescriptor(slug))
}

export function releaseSlug(reg: AcquireRegistry, slug: string): undefined {
  if (slug === NEVER_MATCH_SLUG) return
  releaseShape(reg, slug)
}

export function isSlugReady(reg: AcquireRegistry, slug: string): boolean {
  if (slug === NEVER_MATCH_SLUG) return true
  return isShapeReady(reg, slug)
}

export function whenSlugReady(reg: AcquireRegistry, slug: string): Promise<void> {
  if (slug === NEVER_MATCH_SLUG) return Promise.resolve()
  return whenShapeReady(reg, slug)
}
