"use client"

import { createPage } from "@akasha/pages-access/create"
import { getPages } from "@akasha/pages-access/get"
import { patchPage } from "@akasha/pages-access/patch"
import { DEFAULT_ICON_NAME } from "@akasha/pages-core/icon"
import { useOptimisticCreatePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-create-page"
import { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { useSupabase } from "akasha/alan/harness/supabase-rr/supabase-provider/supabase-provider.module.code.tsx"
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

async function freeNavSlug(name: string): Promise<string> {
  const stem = slugFromName(name)
  const { rows } = await getPages({
    pageTypeSlug: NAV_SLUG,
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

async function navSlugOfId(pageId: string | null): Promise<string | null> {
  if (pageId === null) return null
  const { rows } = await getPages({
    pageTypeSlug: NAV_SLUG,
    where: [{ key: "id", eq: pageId }],
    select: ["slug"],
    limit: 1,
  })
  const slug = rows[0]?.slug
  return typeof slug === "string" && slug !== "" ? slug : null
}

export function useNavMutations(appSlug: string) {
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
          set: { navPlace: i },
        })
      }
    },
    [runPatch]
  )

  const setNavParent = useCallback(
    async (pageId: string, parentId: string | null): Promise<void> => {
      const navParent = await navSlugOfId(parentId)
      await runPatch({
        pageTypeSlug: NAV_SLUG,
        where: [{ key: "id", eq: pageId }],
        set: { navParent },
      })

      const { rows } = await getPages({
        pageTypeSlug: NAV_SLUG,
        where:
          navParent === null
            ? [{ key: "navParent", isNull: true }]
            : [{ key: "navParent", eq: navParent }],
        select: ["id"],
        limit: 200,
      })
      const siblingCount = rows.filter((r) => r.id !== pageId).length

      await runPatch({
        pageTypeSlug: NAV_SLUG,
        where: [{ key: "id", eq: pageId }],
        set: { navPlace: siblingCount },
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
      if (sessionData.session?.user.id == null) {
        throw new Error("createNav requires an authenticated user")
      }

      const { rows: existing } = await getPages({
        pageTypeSlug: NAV_SLUG,
        where: [{ key: "appSlug", eq: appSlug }],
        select: ["id"],
        limit: 200,
      })
      const navSlug = await freeNavSlug(name)

      const created = await runCreate({
        pageTypeSlug: NAV_SLUG,
        properties: {
          title: name,
          slug: navSlug,
          icon: DEFAULT_ICON_NAME,
          navPlace: existing.length,
          appSlug,
        },
        select: ["id"],
      })
      const pageId = created.id
      if (typeof pageId !== "string") {
        throw new Error("createNav: createPage did not return an id")
      }

      const { rows: itsViews } = await getPages({
        pageTypeSlug: VIEW_SLUG,
        where: [{ key: "nav", eq: navSlug }],
        select: ["id"],
        limit: 50,
      })
      if (itsViews.length === 0) {
        await runCreate({
          pageTypeSlug: VIEW_SLUG,
          properties: {
            title: "List",
            slug: `${navSlug}-list`,
            nav: navSlug,
            viewPlace: 0,
          },
          select: ["id"],
        })
      }

      return { pageId } satisfies { pageId: string }
    },
    [client, runCreate, appSlug]
  )

  return {
    reorderNavs,
    setNavParent,
    setNavIcon,
    createNav,
  }
}
