export interface ReorderVerbContext {
  readonly orderedIds: readonly string[]
  readonly fromIndex: number
  readonly toIndex: number
  readonly viewId?: string
  readonly pageTypeSlug: string
}

export type ReorderVerbHandler = (ctx: ReorderVerbContext) => void | Promise<void>

const handlersByVerbId = new Map<string, ReorderVerbHandler>()

export function registerReorderVerb(verbId: string, handler: ReorderVerbHandler): undefined {
  handlersByVerbId.set(verbId, handler)
}

export function getReorderVerb(verbId: string): ReorderVerbHandler | undefined {
  return handlersByVerbId.get(verbId)
}

export function unregisterReorderVerb(verbId: string): undefined {
  handlersByVerbId.delete(verbId)
}
