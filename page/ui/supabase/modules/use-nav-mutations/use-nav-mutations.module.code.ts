"use client"

import { createPage } from "akasha/page/access/modules/create/create.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { DEFAULT_ICON_NAME } from "akasha/page/core/modules/icon/icon.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { useOptimisticCreatePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-create-page/use-optimistic-create-page.module.code.ts"
import { useOptimisticPatchPage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import { useCallback } from "react"

const NAV_SLUG = "nav"
const VIEW_SLUG = "view"

function slugFromName(name: string): string {
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

export function useNavMutations(app: string) {
  const accountId = useUserId()

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
      const parentSlug = await navSlugOfId(parentId)
      const navParent = parentSlug === null ? null : namedAs(NAV_SLUG, parentSlug, null)
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
    [runPatch]
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
      if (accountId === null) {
        throw new Error("createNav requires an authenticated user")
      }

      const { rows: existing } = await getPages({
        pageTypeSlug: NAV_SLUG,
        where: [{ key: "app", eq: app }],
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
          app,
        },
        select: ["id"],
      })
      const pageId = created.id
      if (typeof pageId !== "string") {
        throw new Error("createNav: createPage did not return an id")
      }

      const navAt = namedAs(NAV_SLUG, navSlug, null)
      const { rows: itsViews } = await getPages({
        pageTypeSlug: VIEW_SLUG,
        where: [{ key: "nav", eq: navAt }],
        select: ["id"],
        limit: 50,
      })
      if (itsViews.length === 0) {
        await runCreate({
          pageTypeSlug: VIEW_SLUG,
          properties: {
            title: "List",
            slug: `${navSlug}-list`,
            nav: navAt,
            viewPlace: 0,
          },
          select: ["id"],
        })
      }

      return { pageId } satisfies { pageId: string }
    },
    [accountId, runCreate, app]
  )

  return {
    reorderNavs,
    setNavParent,
    setNavIcon,
    createNav,
  }
}
