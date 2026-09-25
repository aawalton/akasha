import type { PageDataJSON } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { ActionButtonConfig } from "akasha/page/core/schema/modules/action-button-config/action-button-config.module.code.ts"

export interface ActionVerbContext {
  readonly pageId: string
  readonly pageTypeSlug: string
  readonly data: PageDataJSON
  readonly verbId: string
  readonly config: ActionButtonConfig
}

export type ActionVerbHandler = (ctx: ActionVerbContext) => void | Promise<void>

interface ActionPresentation {
  readonly label?: string
  readonly icon?: string
  readonly disabled?: boolean
}

type ResolveActionPresentation = (ctx: ActionVerbContext) => ActionPresentation

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
