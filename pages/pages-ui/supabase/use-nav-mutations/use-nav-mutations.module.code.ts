"use client"

import { createPage } from "@akasha/pages-access/create"
import { getPages } from "@akasha/pages-access/get"
import { patchPage } from "@akasha/pages-access/patch"
import { DEFAULT_ICON_NAME } from "@akasha/pages-core/icon"
import { useOptimisticCreatePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-create-page"
import { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { useSupabase } from "@akasha/supabase-rr/supabase-provider"
import { useCallback } from "react"

const NAV_SLUG = "nav"
const VIEW_SLUG = "view"

export function slugFromName(name: string): string {
  const stem = name
    .replace(/&/g, "and")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
  return stem === "" ? "nav" : stem
}

async function freeNavSlug(name: string, appId: string): Promise<string> {
  const stem = slugFromName(name)
  const { rows } = await getPages({
    pageTypeSlug: NAV_SLUG,
    where: [{ key: "app", eq: appId }],
    select: ["slug"],
    limit: 500,
  })
  const taken = new Set(rows.map((r) => r.slug).filter((s): s is string => typeof s === "string"))
  if (!taken.has(stem)) return stem
  for (let n = 2; ; n += 1) {
    const candidate = `${stem}-${n}`
    if (!taken.has(candidate)) return candidate
  }
}

export function useNavMutations(appId: string) {
  const client = useSupabase()

  const runCreate = useOptimisticCreatePage((args) => createPage(args))
  const runPatch = useOptimisticPatchPage((args) => patchPage(args))

  const reorderNavs = useCallback(
    async (pageIds: readonly string[]): Promise<void> => {
      for (let i = 0; i < pageIds.length; i++) {
        const pageId = pageIds[i]
        if (pageId == null) continue
        await runPatch({
          pageTypeSlug: NAV_SLUG,
          where: [{ key: "id", eq: pageId }],
          set: { sortOrder: i },
        })
      }
    },
    [runPatch]
  )

  const setNavParent = useCallback(
    async (pageId: string, parentId: string | null): Promise<void> => {
      await runPatch({
        pageTypeSlug: NAV_SLUG,
        where: [{ key: "id", eq: pageId }],
        set: { parentId },
      })

      const { rows } = await getPages({
        pageTypeSlug: NAV_SLUG,
        where:
          parentId === null
            ? [{ key: "parentId", isNull: true }]
            : [{ key: "parentId", eq: parentId }],
        select: ["id"],
        limit: 200,
      })
      const siblingCount = rows.filter((r) => r.id !== pageId).length

      await runPatch({
        pageTypeSlug: NAV_SLUG,
        where: [{ key: "id", eq: pageId }],
        set: { sortOrder: siblingCount },
      })
    },
    [client, runPatch]
  )

  const setNavIcon = useCallback(
    async (pageId: string, icon: string): Promise<void> => {
      await runPatch({
        pageTypeSlug: NAV_SLUG,
        where: [{ key: "id", eq: pageId }],
        set: { icon },
      })
    },
    [runPatch]
  )

  const createNav = useCallback(
    async (name: string): Promise<{ pageId: string }> => {
      const { data: sessionData } = await client.auth.getSession()
      const userId = sessionData.session?.user.id
      if (userId == null) throw new Error("createNav requires an authenticated user")

      const { rows: existing } = await getPages({
        pageTypeSlug: NAV_SLUG,
        where: [{ key: "app", eq: appId }],
        select: ["id"],
        limit: 200,
      })
      const nextSortOrder = existing.length
      const navSlug = await freeNavSlug(name, appId)

      const created = await runCreate({
        pageTypeSlug: NAV_SLUG,
        properties: {
          userId,
          title: name,
          slug: navSlug,
          icon: DEFAULT_ICON_NAME,
          sortOrder: nextSortOrder,
          app: appId,
        },
        select: ["id"],
      })
      const pageId = created.id
      if (typeof pageId !== "string") {
        throw new Error("createNav: createPage did not return an id")
      }

      const { rows: ownerViews } = await getPages({
        pageTypeSlug: VIEW_SLUG,
        where: [{ key: "owner", eq: pageId }],
        select: ["id"],
        limit: 50,
      })
      if (ownerViews.length === 0) {
        await runCreate({
          pageTypeSlug: VIEW_SLUG,
          properties: {
            userId,
            title: "List",
            slug: `${navSlug}-list`,
            owner: pageId,
            config: {},
            sort_order: 0,
          },
          select: ["id"],
        })
      }

      return { pageId } satisfies { pageId: string }
    },
    [client, runCreate, appId]
  )

  return {
    reorderNavs,
    setNavParent,
    setNavIcon,
    createNav,
  }
}
