interface ReorderVerbContext {
  readonly orderedIds: readonly string[]
  readonly fromIndex: number
  readonly toIndex: number
  readonly viewId?: string
  readonly pageTypeSlug: string
}

type ReorderVerbHandler = (ctx: ReorderVerbContext) => void | Promise<void>

const handlersByVerbId = new Map<string, ReorderVerbHandler>()

export function getReorderVerb(verbId: string): ReorderVerbHandler | undefined {
  return handlersByVerbId.get(verbId)
}
