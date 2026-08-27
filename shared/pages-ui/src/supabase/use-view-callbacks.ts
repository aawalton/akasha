"use client"

import { type Json } from "../../../supabase-database/src/generated/database"
import { type CreatePageArgs, createPage } from "@shared/pages-access/create"
import { type DeletePageArgs, softDeletePage } from "@shared/pages-access/delete"
import { type PatchPageArgs, patchPage } from "@shared/pages-access/patch"
import { type Page } from "@shared/pages-core/page-types"
import { createView as createViewReducer, deleteView as deleteViewReducer, duplicateView as duplicateViewReducer, renameView as renameViewReducer, reorderViews as reorderViewsReducer, updateViewConfig as updateViewConfigReducer } from "@shared/pages-core/view-state/reducers"
import { type ViewEffect, type ViewRow } from "@shared/pages-core/view-state/types"
import { useSupabase } from "@shared/supabase-rr/provider"
import { assertNever } from "../../../utils-narrow/src/assert-never"
import { isJson } from "../../../utils-narrow/src/is-json"
import { useCallback, useMemo } from "react"
import type { ViewDataJSON } from "@shared/pages-core/schema/view-data"
import type { ViewCallbacks } from "../mutators/views"
import { useOptimisticCreatePage } from "./mutations/use-optimistic-create-page"
import { useOptimisticPatchPage } from "./mutations/use-optimistic-patch-page"
import { useOptimisticSoftDeletePage } from "./mutations/use-optimistic-soft-delete-page"
import type { PageWithProperties } from "./types"
import { useSetPropertyOptimistic } from "./use-set-property-optimistic"

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
  const client = useSupabase()

  const boundCreate = useCallback(
    (args: CreatePageArgs): Promise<Page> => createPage(args),
    [client]
  )
  const boundPatch = useCallback(
    (args: PatchPageArgs): Promise<Page | null> => patchPage(args),
    [client]
  )
  const boundSoftDelete = useCallback(
    (args: DeletePageArgs): Promise<Page | null> => softDeletePage(args),
    [client]
  )

  const createPageFn = useOptimisticCreatePage(boundCreate)
  const patchPageFn = useOptimisticPatchPage(boundPatch)
  const softDeleteFn = useOptimisticSoftDeletePage(boundSoftDelete)
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
            await softDeleteFn({
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
    [createPageFn, softDeleteFn, setProperty, patchPageFn, userId]
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
