import type { ActionButtonConfig } from "@akasha/pages-core/schema/action-button-config"
import type { PageDataJSON } from "@akasha/pages-core/types"

export interface ActionVerbContext {
  readonly pageId: string
  readonly pageTypeSlug: string
  readonly data: PageDataJSON
  readonly verbId: string
  readonly config: ActionButtonConfig
}

export type ActionVerbHandler = (ctx: ActionVerbContext) => void | Promise<void>

export interface ActionPresentation {
  readonly label?: string
  readonly icon?: string
  readonly disabled?: boolean
}

export type ResolveActionPresentation = (ctx: ActionVerbContext) => ActionPresentation

interface ActionVerbEntry {
  readonly handler: ActionVerbHandler
  readonly resolvePresentation?: ResolveActionPresentation
}

const entriesByVerbId = new Map<string, ActionVerbEntry>()

export function registerActionVerb(
  verbId: string,
  handler: ActionVerbHandler,
  resolvePresentation?: ResolveActionPresentation
): undefined {
  entriesByVerbId.set(verbId, { handler, resolvePresentation })
}

export function getActionVerb(verbId: string): ActionVerbHandler | undefined {
  return entriesByVerbId.get(verbId)?.handler
}

export function getActionVerbPresentation(verbId: string): ResolveActionPresentation | undefined {
  return entriesByVerbId.get(verbId)?.resolvePresentation
}

export function unregisterActionVerb(verbId: string): undefined {
  entriesByVerbId.delete(verbId)
}
