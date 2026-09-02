"use client"

import { ITEM_CATEGORY_TREE } from "@akasha/temper-items-core/item-category-tree-data"
import {
  ALL_CATEGORIES_ID,
  ALL_CATEGORIES_NODE,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  getNodeChildren,
  getNodePath,
} from "@akasha/temper-items-rules-core/item-category-tree-utils"
import { useMemo } from "react"
import { CategoryBadgeSelect } from "../rule-card-category-row/rule-card-category-row.module.code.tsx"

export function RuleCategoryFilterSelect({
  ruleCategory,
  onRuleCategoryChange,
}: {
  ruleCategory: string
  onRuleCategoryChange: (id: string) => void
}) {
  const path = useMemo(
    () =>
      ruleCategory !== "" && ruleCategory !== ALL_CATEGORIES_ID
        ? getNodePath(ruleCategory, ITEM_CATEGORY_TREE)
        : ruleCategory === ALL_CATEGORIES_ID
          ? [{ id: ALL_CATEGORIES_ID, name: ALL_CATEGORIES_NODE.name }]
          : [],
    [ruleCategory]
  )

  const deepestChildren = useMemo(() => {
    if (ruleCategory === "") return []
    const deepestId =
      ruleCategory === ALL_CATEGORIES_ID ? undefined : (path[path.length - 1]?.id ?? undefined)
    return getNodeChildren(deepestId, ITEM_CATEGORY_TREE)
  }, [ruleCategory, path])

  const l0Children = useMemo(() => getNodeChildren(undefined, ITEM_CATEGORY_TREE), [])

  if (ruleCategory === "") {
    return (
      <div className="flex flex-wrap items-center gap-1.5">
        <CategoryBadgeSelect
          depth={0}
          selectedId={undefined}
          options={[ALL_CATEGORIES_NODE, ...l0Children]}
          onSelect={(id) => onRuleCategoryChange(id === ALL_CATEGORIES_ID ? "" : id)}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {path.map((node, depth) => {
        const parent = depth > 0 ? path[depth - 1] : undefined
        const treeChildren = getNodeChildren(parent?.id, ITEM_CATEGORY_TREE)
        const allOption = parent
          ? { id: parent.id, name: `All ${parent.name}` }
          : ALL_CATEGORIES_NODE
        const siblings = [allOption, ...treeChildren]
        return (
          <CategoryBadgeSelect
            key={depth}
            depth={depth}
            selectedId={node.id}
            options={siblings}
            onSelect={(id) => onRuleCategoryChange(id === ALL_CATEGORIES_ID ? "" : id)}
          />
        )
      })}

      {deepestChildren.length > 0 &&
        (() => {
          const deepest = path[path.length - 1]
          if (deepest === undefined) return null
          const allName =
            deepest.id === ALL_CATEGORIES_ID ? ALL_CATEGORIES_NODE.name : `All ${deepest.name}`
          return (
            <CategoryBadgeSelect
              depth={path.length}
              selectedId={deepest.id}
              options={[{ id: deepest.id, name: allName }, ...deepestChildren]}
              onSelect={(id) => onRuleCategoryChange(id)}
            />
          )
        })()}
    </div>
  )
}
