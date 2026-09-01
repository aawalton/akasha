export interface ReorderVerbContext {
  readonly orderedIds: readonly string[]
  readonly fromIndex: number
  readonly toIndex: number
  readonly viewId?: string
  readonly pageTypeSlug: string
}

export type ReorderVerbHandler = (ctx: ReorderVerbContext) => void | Promise<void>

const registry = new Map<string, ReorderVerbHandler>()

export function registerReorderVerb(verbId: string, handler: ReorderVerbHandler): undefined {
  registry.set(verbId, handler)
}

export function getReorderVerb(verbId: string): ReorderVerbHandler | undefined {
  return registry.get(verbId)
}

export function unregisterReorderVerb(verbId: string): undefined {
  registry.delete(verbId)
}
