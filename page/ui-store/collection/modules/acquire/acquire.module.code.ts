import { NEVER_MATCH_SLUG } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import {
  type ShapeDescriptor,
  slugShapeDescriptor,
} from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"

export interface ShapeAcquisition {
  count: number
  stop: (() => undefined) | null
  ready: boolean
  readyResolvers: readonly (() => undefined)[]
  descriptor: ShapeDescriptor
  detached: boolean
}

export interface AcquireRegistry {
  readonly shapes: Map<string, ShapeAcquisition>
  readonly attach: (descriptor: ShapeDescriptor) => (() => undefined) | null
}

export function createAcquireRegistry(
  attach: (descriptor: ShapeDescriptor) => (() => undefined) | null
): AcquireRegistry {
  return { shapes: new Map(), attach }
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

export function isShapeReady(reg: AcquireRegistry, shapeKey: string): boolean {
  return reg.shapes.get(shapeKey)?.ready ?? false
}

export function whenShapeReady(reg: AcquireRegistry, shapeKey: string): Promise<void> {
  const entry = reg.shapes.get(shapeKey)
  if (entry === undefined || entry.ready) return Promise.resolve()
  return new Promise<void>((resolve) => {
    entry.readyResolvers = [
      ...entry.readyResolvers,
      () => {
        resolve()
        return undefined
      },
    ]
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
