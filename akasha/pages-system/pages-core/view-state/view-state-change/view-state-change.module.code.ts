import type { Json } from "@akasha/utils-narrow/json-value"
import type { ViewDataJSON } from "../../schema/view-data/view-data.module.code.ts"

export type JsonPatchOp =
  | { op: "replace"; path: string; value: Json }
  | { op: "add"; path: string; value: Json }
  | { op: "remove"; path: string }
export type JsonPatch = readonly JsonPatchOp[]

export interface ViewRow {
  _id: string
  properties: Record<string, unknown>
}

export interface ReducerCtx {
  newPageId: string
  ownerNavItemId: string
}

export interface PropertyWrite {
  propertyId: string
  value: unknown
}

export type ViewEffect =
  | {
      kind: "createPage"
      pageId: string
      properties?: readonly PropertyWrite[]
    }
  | {
      kind: "deletePage"
      pageId: string
    }
  | {
      kind: "setProperty"
      pageId: string
      propertyId: string
      value: unknown
    }
  | {
      kind: "bulkSetProperties"
      pageId: string
      properties: readonly PropertyWrite[]
    }
  | {
      kind: "applyPagePatch"
      pageId: string
      patch: JsonPatch
    }

export interface CreateViewArgs {
  name: string
  data: ViewDataJSON
}

export interface UpdateViewConfigArgs {
  id: string
  updates: Partial<ViewDataJSON>
}

export interface RenameViewArgs {
  id: string
  name: string
}

export interface DuplicateViewArgs {
  sourceId: string
}

export interface ReorderViewsArgs {
  viewIds: readonly string[]
}

export interface DeleteViewArgs {
  id: string
}
