"use client"

import { type CreatePageArgs, createPage } from "@akasha/pages-access/create"
import { type DeletePageArgs, deletePage } from "@akasha/pages-access/delete"
import { type PatchPageArgs, patchPage } from "@akasha/pages-access/patch"
import type { Page } from "@akasha/pages-core/page-types"
import type { ViewDataJSON } from "@akasha/pages-core/schema/view-data"
import {
  createView as createViewReducer,
  deleteView as deleteViewReducer,
  duplicateView as duplicateViewReducer,
  renameView as renameViewReducer,
  reorderViews as reorderViewsReducer,
  updateViewConfig as updateViewConfigReducer,
} from "@akasha/pages-core/view-state/reducers"
import type { ViewEffect, ViewRow } from "@akasha/pages-core/view-state/types"
import type { ViewCallbacks } from "@akasha/pages-ui/mutators/view-callbacks"
import { useOptimisticCreatePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-create-page"
import { useOptimisticDeletePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-delete-page"
import { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
import { useSetPropertyOptimistic } from "@akasha/pages-ui/supabase/use-set-property-optimistic"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { isJson } from "@akasha/utils-narrow/is-json"
import type { Json } from "@akasha/utils-narrow/json-value"
import { useCallback, useMemo } from "react"

const VIEW_PAGE_TYPE_SLUG = "view"

function projectViewRows(views: readonly PageWithProperties[]): readonly ViewRow[] {
  return views.map((v) => ({
    _id: v._id,
    properties: v.properties satisfies Record<string, unknown>,
  }))
}

export function useSupabaseViewCallbacks({
  userId,
  ownerNavItemId,
  views,
}: {
  userId: string
  ownerNavItemId: string
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
            const initial: Record<string, Json> = { userId }
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

  const buildCtx = useCallback(
    () => ({
      newPageId: crypto.randomUUID(),
      ownerNavItemId,
    }),
    [ownerNavItemId]
  )

  const onCreateView = useCallback(
    async (name: string, data: ViewDataJSON) => {
      const effects = createViewReducer(projectViewRows(views), { name, data }, buildCtx())
      await dispatchEffects(effects)
    },
    [views, buildCtx, dispatchEffects]
  )

  const onDeleteView = useCallback(
    (id: string) => {
      const effects = deleteViewReducer(projectViewRows(views), { id }, buildCtx())
      void dispatchEffects(effects)
    },
    [views, buildCtx, dispatchEffects]
  )

  const onRenameView = useCallback(
    (id: string, name: string) => {
      const effects = renameViewReducer(projectViewRows(views), { id, name }, buildCtx())
      void dispatchEffects(effects)
    },
    [views, buildCtx, dispatchEffects]
  )

  const onDuplicateView = useCallback(
    async (sourceId: string) => {
      const effects = duplicateViewReducer(projectViewRows(views), { sourceId }, buildCtx())
      await dispatchEffects(effects)
    },
    [views, buildCtx, dispatchEffects]
  )

  const onUpdateView = useCallback(
    (id: string, updates: Partial<ViewDataJSON>) => {
      const effects = updateViewConfigReducer(projectViewRows(views), { id, updates }, buildCtx())
      void dispatchEffects(effects)
    },
    [views, buildCtx, dispatchEffects]
  )

  const onReorderViews = useCallback(
    (viewIds: readonly string[]) => {
      const effects = reorderViewsReducer(projectViewRows(views), { viewIds }, buildCtx())
      void dispatchEffects(effects)
    },
    [views, buildCtx, dispatchEffects]
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
