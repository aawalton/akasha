"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { isJson } from "akasha/code/type/narrowing/modules/is-json/is-json.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import {
  type CreatePageArgs,
  createPage,
} from "akasha/page/access/modules/create/create.module.code.ts"
import {
  type DeletePageArgs,
  deletePage,
} from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import {
  type PatchPageArgs,
  patchPage,
} from "akasha/page/access/modules/patch/patch.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { ViewDataJSON } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import {
  createView as createViewReducer,
  deleteView as deleteViewReducer,
  duplicateView as duplicateViewReducer,
  renameView as renameViewReducer,
  reorderViews as reorderViewsReducer,
  updateViewConfig as updateViewConfigReducer,
} from "akasha/page/core/view-state/modules/reducers/reducers.module.code.ts"
import type {
  ViewEffect,
  ViewRow,
} from "akasha/page/core/view-state/modules/view-state-change/view-state-change.module.code.ts"
import type { ViewCallbacks } from "akasha/page/ui/modules/view-callbacks/view-callbacks.module.code.ts"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import { useSetPropertyOptimistic } from "akasha/page/ui/supabase/modules/use-set-property-optimistic/use-set-property-optimistic.module.code.tsx"
import { useOptimisticCreatePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-create-page/use-optimistic-create-page.module.code.ts"
import { useOptimisticDeletePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-delete-page/use-optimistic-delete-page.module.code.ts"
import { useOptimisticPatchPage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import { useCallback, useMemo } from "react"
import { toast } from "sonner"

const VIEW_PAGE_TYPE_SLUG = "view"

const VIEW_WRITE_FAILED_MESSAGE = "This view's change was not kept"

function announceViewWriteFailure(err: unknown): undefined {
  console.error("useSupabaseViewCallbacks: a view write failed", err)
  toast.error(VIEW_WRITE_FAILED_MESSAGE, {
    id: "view-write-failed",
    description: err instanceof Error ? err.message : String(err),
  })
  return undefined
}

function projectViewRows(views: readonly PageWithProperties[]): readonly ViewRow[] {
  return views.map((v) => ({
    _id: v._id,
    properties: v.properties satisfies Record<string, unknown>,
  }))
}

export function useSupabaseViewCallbacks({
  userId,
  ownerNavSlug,
  views,
}: {
  userId: string
  ownerNavSlug: string
  views: readonly PageWithProperties[]
}): ViewCallbacks {
  const boundCreate = useCallback((args: CreatePageArgs): Promise<Page> => createPage(args), [])
  const boundPatch = useCallback((args: PatchPageArgs): Promise<Page | null> => patchPage(args), [])
  const boundDelete = useCallback(
    (args: DeletePageArgs): Promise<Page | null> => deletePage(args),
    []
  )

  const createPageFn = useOptimisticCreatePage(boundCreate)
  const patchPageFn = useOptimisticPatchPage(boundPatch)
  const deletePageFn = useOptimisticDeletePage(boundDelete)
  const setProperty = useSetPropertyOptimistic()

  const dispatchEffects = useCallback(
    async (effects: readonly ViewEffect[]) => {
      if (userId === "") return
      const idMap = new Map<string, string>()
      const resolveId = (id: string) => idMap.get(id) ?? id
      for (const effect of effects) {
        switch (effect.kind) {
          case "createPage": {
            const initial: Record<string, Json> = {}
            for (const pw of effect.properties ?? []) {
              if (!isJson(pw.value)) {
                throw new Error(
                  `useSupabaseViewCallbacks: createPage initial value for ${pw.propertyId} is not JSON-shaped (${typeof pw.value})`
                )
              }
              initial[pw.propertyId] = pw.value
            }
            const row = await createPageFn({
              pageTypeSlug: VIEW_PAGE_TYPE_SLUG,
              properties: initial,
            })
            const realId = typeof row.id === "string" ? row.id : effect.pageId
            idMap.set(effect.pageId, realId)
            break
          }
          case "deletePage": {
            await deletePageFn({
              pageTypeSlug: VIEW_PAGE_TYPE_SLUG,
              where: [{ key: "id", eq: resolveId(effect.pageId) }],
            })
            break
          }
          case "setProperty": {
            await setProperty({
              pageTypeSlug: VIEW_PAGE_TYPE_SLUG,
              pageId: resolveId(effect.pageId),
              propertyId: effect.propertyId,
              value: effect.value,
            })
            break
          }
          case "bulkSetProperties": {
            const set: Record<string, Json> = {}
            for (const pw of effect.properties) {
              if (!isJson(pw.value)) {
                throw new Error(
                  `useSupabaseViewCallbacks: bulkSetProperties value for ${pw.propertyId} is not JSON-shaped (${typeof pw.value})`
                )
              }
              set[pw.propertyId] = pw.value
            }
            await patchPageFn({
              pageTypeSlug: VIEW_PAGE_TYPE_SLUG,
              where: [{ key: "id", eq: resolveId(effect.pageId) }],
              set,
            })
            break
          }
          case "applyPagePatch": {
            await patchPageFn({
              pageTypeSlug: VIEW_PAGE_TYPE_SLUG,
              where: [{ key: "id", eq: resolveId(effect.pageId) }],
              set: {},
              patch: effect.patch,
            })
            break
          }
          default:
            assertNever(effect)
        }
      }
    },
    [createPageFn, deletePageFn, setProperty, patchPageFn, userId]
  )

  const dispatch = useCallback(
    (effects: readonly ViewEffect[]): undefined => {
      dispatchEffects(effects).catch(announceViewWriteFailure)
    },
    [dispatchEffects]
  )

  const buildCtx = useCallback(
    () => ({
      newPageId: crypto.randomUUID(),
      ownerNavSlug,
    }),
    [ownerNavSlug]
  )

  const onCreateView = useCallback(
    (name: string, data: ViewDataJSON) => {
      dispatch(createViewReducer(projectViewRows(views), { name, data }, buildCtx()))
    },
    [views, buildCtx, dispatch]
  )

  const onDeleteView = useCallback(
    (id: string) => {
      dispatch(deleteViewReducer(projectViewRows(views), { id }, buildCtx()))
    },
    [views, buildCtx, dispatch]
  )

  const onRenameView = useCallback(
    (id: string, name: string) => {
      dispatch(renameViewReducer(projectViewRows(views), { id, name }, buildCtx()))
    },
    [views, buildCtx, dispatch]
  )

  const onDuplicateView = useCallback(
    (sourceId: string) => {
      dispatch(duplicateViewReducer(projectViewRows(views), { sourceId }, buildCtx()))
    },
    [views, buildCtx, dispatch]
  )

  const onUpdateView = useCallback(
    (id: string, updates: Partial<ViewDataJSON>) => {
      dispatch(updateViewConfigReducer(projectViewRows(views), { id, updates }, buildCtx()))
    },
    [views, buildCtx, dispatch]
  )

  const onReorderViews = useCallback(
    (viewIds: readonly string[]) => {
      dispatch(reorderViewsReducer(projectViewRows(views), { viewIds }, buildCtx()))
    },
    [views, buildCtx, dispatch]
  )

  return useMemo(
    () => ({
      onCreateView,
      onDeleteView,
      onRenameView,
      onDuplicateView,
      onUpdateView,
      onReorderViews,
    }),
    [onCreateView, onDeleteView, onRenameView, onDuplicateView, onUpdateView, onReorderViews]
  )
}
