"use client"

import type { AppNavItem } from "@akasha/design-layout/nav-types"
import { IconPicker } from "@akasha/design-patterns/icon-picker"
import { Icon } from "@akasha/design-patterns/lucide-icon"
import { triggerSafeNode } from "@akasha/design-primitives/trigger-safe-node"
import type { PageCondition, PageWhere } from "@akasha/pages-core/page-types"
import { expandDateMentions } from "@akasha/pages-core/view/expand-date-mentions"
import { useNavMutations } from "@akasha/pages-ui/supabase/use-nav-mutations"
import { usePagesSupabase } from "@akasha/pages-ui/supabase/use-pages"
import { NavCountBadge } from "@akasha/pages-ui-components/nav-count-badge"
import { parseShowCountBadge } from "@akasha/pages-ui-components/nav-count-badge-decider"
import { NavItemActions } from "@akasha/pages-ui-components/nav-item-actions"
import { buildPageHref } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { Plus } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { z } from "zod"

const NAV_SLUG = toPageTypeSlug("nav")
const NAV_ITEM_LIMIT = 200
const NEW_PAGE_TITLE = "New Page"

const MobilePinOrderSchema = z.number().nullable().optional()

interface PrimaryNavItemsResult {
  items: readonly AppNavItem[]
  onReorder: (pageIds: readonly string[]) => void
  onSetParent: (childPageId: string, parentPageId: string | null) => void
  dynamicItemIds: readonly string[]
  rootItemIds: Set<string>
  childItemIds: Set<string>
  childrenByParentId: Map<string, string[]>
  navReady: boolean
}

interface UseAppNavItemsArgs {
  appId: string
  appSlug?: string
  primaryItems: readonly AppNavItem[]
  initialRows?: ReadonlyArray<Record<string, unknown>>
}

export function useAppNavItems({
  appId,
  appSlug,
  primaryItems,
  initialRows,
}: UseAppNavItemsArgs): PrimaryNavItemsResult {
  const navWhere = useMemo<PageWhere>(() => {
    const named: PageCondition[] = [{ key: "app", eq: appId }]
    if (appSlug != null && appSlug !== "") named.push({ key: "app", eq: appSlug })
    return named.length === 1 ? named : [{ or: named }]
  }, [appId, appSlug])
  const { rows: liveRows, isLoading } = usePagesSupabase({
    pageTypeSlug: NAV_SLUG,
    where: navWhere,
    limit: NAV_ITEM_LIMIT,
  })

  const navItemPages: ReadonlyArray<Record<string, unknown>> = isLoading
    ? (initialRows ?? [])
    : liveRows

  const navReady = initialRows != null || !isLoading

  const { createNav, reorderNavs, setNavIcon, setNavParent } = useNavMutations(appSlug ?? appId)

  const handleAddPage = useCallback(() => {
    createNav(NEW_PAGE_TITLE).catch(console.error)
  }, [createNav])

  const addPageItem = useMemo<AppNavItem>(
    () => ({
      id: "add-view-page",
      label: "Add Page",
      shortLabel: "Add",
      onClick: handleAddPage,
      iconSlot: (
        <span className="inline-flex shrink-0 items-center rounded p-0.5 text-current">
          <Plus className="h-5 w-5" />
        </span>
      ),
    }),
    [handleAddPage]
  )

  const [optimisticIcons, setOptimisticIcons] = useState<Map<string, string> | null>(null)

  const handleIconChange = useCallback(
    (pageId: string, iconName: string) => {
      setOptimisticIcons((prev) => {
        const next = new Map(prev ?? [])
        next.set(pageId, iconName)
        return next
      })
      setNavIcon(pageId, iconName).catch(console.error)
    },
    [setNavIcon]
  )

  const [optimisticOrder, setOptimisticOrder] = useState<readonly string[] | null>(null)
  const optimisticRef = useRef(optimisticOrder)
  optimisticRef.current = optimisticOrder

  const [optimisticParents, setOptimisticParents] = useState<Map<string, string | null> | null>(
    null
  )

  const onReorder = useCallback(
    (pageIds: readonly string[]) => {
      setOptimisticOrder(pageIds)
      reorderNavs(pageIds).then(() => {
        if (optimisticRef.current === pageIds) {
          setOptimisticOrder(null)
        }
      })
    },
    [reorderNavs]
  )

  const onSetParent = useCallback(
    (childPageId: string, parentPageId: string | null) => {
      setOptimisticParents((prev) => {
        const next = new Map(prev ?? [])
        next.set(childPageId, parentPageId)
        return next
      })
      setNavParent(childPageId, parentPageId)
        .then(() => {
          setOptimisticParents((prev) => {
            if (!prev) return null
            const next = new Map(prev)
            next.delete(childPageId)
            return next.size === 0 ? null : next
          })
        })
        .catch(() => {
          setOptimisticParents((prev) => {
            if (!prev) return null
            const next = new Map(prev)
            next.delete(childPageId)
            return next.size === 0 ? null : next
          })
        })
    },
    [setNavParent]
  )

  const { items, dynamicItemIds, rootItemIds, childItemIds, childrenByParentId } = useMemo(() => {
    type NavPage = (typeof navItemPages)[number] & { id: string }
    const pages = navItemPages.filter((p): p is NavPage => typeof p.id === "string")

    const sorted = [...pages].sort((a, b) => {
      const aOrder = typeof a.sortOrder === "number" ? a.sortOrder : Number.POSITIVE_INFINITY
      const bOrder = typeof b.sortOrder === "number" ? b.sortOrder : Number.POSITIVE_INFINITY
      return aOrder - bOrder
    })

    const getEffectiveParentId = (page: (typeof sorted)[number]): string | null => {
      if (optimisticParents?.has(page.id)) {
        return optimisticParents.get(page.id) ?? null
      }
      const raw = page.parentId
      if (typeof raw === "string") return raw
      if (typeof raw === "object" && raw !== null && "id" in raw) {
        const { id } = raw
        return typeof id === "string" ? id : null
      }
      return null
    }

    const pageIdSet = new Set(sorted.map((p) => p.id))
    const roots = sorted.filter((p) => {
      const pid = getEffectiveParentId(p)
      return pid === null || !pageIdSet.has(pid)
    })
    const childrenByParent = new Map<string, typeof sorted>()
    for (const page of sorted) {
      const pid = getEffectiveParentId(page)
      if (pid !== null && pageIdSet.has(pid)) {
        const existing = childrenByParent.get(pid) ?? []
        existing.push(page)
        childrenByParent.set(pid, existing)
      }
    }

    const orderedRoots = optimisticOrder
      ? [
          ...optimisticOrder
            .map((id) => roots.find((p) => p.id === id))
            .filter((p): p is (typeof roots)[number] => p != null),
          ...roots.filter((p) => !optimisticOrder.includes(p.id)),
        ]
      : roots

    const toNavItem = (page: (typeof sorted)[number]): AppNavItem => {
      const serverIcon = typeof page.icon === "string" ? page.icon : null
      const rawIcon = optimisticIcons?.get(page.id) ?? serverIcon
      const href = buildPageHref({
        pageTypeSlug: NAV_SLUG,
        slug: typeof page.slug === "string" ? page.slug : null,
        fallbackSlugSource: typeof page.title === "string" ? page.title : null,
        id: page.id,
      })
      const mobilePinOrder = MobilePinOrderSchema.parse(page.mobilePinOrder)
      const showCountBadge = parseShowCountBadge(page.showCountBadge)
      return {
        id: `view-${page.id}`,
        label: expandDateMentions(String(page.title ?? "Untitled")),
        shortLabel: expandDateMentions(String(page.title ?? "Untitled")),
        href,
        activePrefix: href,
        iconSlot: (
          <IconPicker value={rawIcon} onChange={(name) => handleIconChange(page.id, name)} />
        ),
        iconStatic: triggerSafeNode(<Icon name={rawIcon} className="h-5 w-5 shrink-0" />),
        trailing: (
          <>
            {showCountBadge && (
              <NavCountBadge
                navItemId={page.id}
                navItemSlug={typeof page.slug === "string" ? page.slug : undefined}
              />
            )}
            <NavItemActions pageId={page.id} href={href} />
          </>
        ),
        ...(typeof mobilePinOrder === "number" ? { mobilePinOrder } : {}),
      }
    }

    const dynamicItems: AppNavItem[] = []
    const childIds = new Set<string>()
    for (const page of orderedRoots) {
      const childPages = childrenByParent.get(page.id)
      const childNavItems = childPages?.map(toNavItem) ?? []
      const parentNavItem: AppNavItem = {
        ...toNavItem(page),
        ...(childNavItems.length > 0 ? { children: childNavItems } : {}),
      }
      dynamicItems.push(parentNavItem)
      for (const childItem of childNavItems) {
        dynamicItems.push(childItem)
        childIds.add(childItem.id)
      }
    }

    const ids = dynamicItems.map((item) => item.id)
    const rootIds = new Set(orderedRoots.map((page) => `view-${page.id}`))

    const childrenByParentViewId = new Map<string, string[]>()
    for (const [parentPageId, children] of childrenByParent) {
      childrenByParentViewId.set(
        `view-${parentPageId}`,
        children.map((c) => `view-${c.id}`)
      )
    }

    return {
      items: [...primaryItems, ...dynamicItems, addPageItem],
      dynamicItemIds: ids,
      rootItemIds: rootIds,
      childItemIds: childIds,
      childrenByParentId: childrenByParentViewId,
    }
  }, [
    navItemPages,
    optimisticOrder,
    optimisticParents,
    optimisticIcons,
    handleIconChange,
    addPageItem,
    primaryItems,
  ])

  useEffect(() => {
    setOptimisticIcons((prev) => {
      if (!prev || prev.size === 0) return prev
      const next = new Map(prev)
      for (const page of navItemPages) {
        const id = typeof page.id === "string" ? page.id : null
        if (id == null) continue
        const pending = next.get(id)
        if (pending != null && page.icon === pending) next.delete(id)
      }
      if (next.size === prev.size) return prev
      return next.size === 0 ? null : next
    })
  }, [navItemPages])

  return {
    items,
    onReorder,
    onSetParent,
    dynamicItemIds,
    rootItemIds,
    childItemIds,
    childrenByParentId,
    navReady,
  }
}
