import {
  ITEM_CATEGORY_PRIORITY,
  ITEM_CATEGORY_TREE,
} from "@akasha/temper-items-core/item-category-tree-data"

interface UpstreamCategoryNode {
  id: string
  name: string
  filterTypes?: readonly number[]
  itemTypes?: readonly number[]
  specializedItemTypes?: readonly number[]
  traitTypeRange?: readonly [number, number]
  equipTypes?: readonly number[]
  weaponTypes?: readonly number[]
  armorTypes?: readonly number[]
  furnitureCategoryIds?: readonly number[]
  furnitureSubcategoryIds?: readonly number[]
  itemNameContains?: string
  children?: readonly UpstreamCategoryNode[]
}

export interface CategoryNode {
  parentId?: string
  childIds?: string[]
  filterTypes?: number[]
  itemTypes?: number[]
  specializedItemTypes?: number[]
  equipTypes?: number[]
  weaponTypes?: number[]
  armorTypes?: number[]
  traitTypeRange?: [number, number]
  furnitureCategoryIds?: number[]
  furnitureSubcategoryIds?: number[]
  itemNameContains?: string
}

function toMutableNumbers(src: readonly number[] | undefined): number[] | undefined {
  if (!src) return undefined
  const out: number[] = []
  for (const [i, v] of src.entries()) out[i] = v
  return out
}

function toMutableRange(src: readonly [number, number] | undefined): [number, number] | undefined {
  if (!src) return undefined
  return [src[0], src[1]]
}

function flattenTree(tree: typeof ITEM_CATEGORY_TREE): Record<string, CategoryNode> {
  const flat: Record<string, CategoryNode> = {}

  function visit(node: UpstreamCategoryNode, parentId: string | undefined): undefined {
    const children = node.children
    const childIds = children && children.length > 0 ? children.map((c) => c.id) : undefined
    const out: CategoryNode = {
      parentId,
      childIds,
      filterTypes: toMutableNumbers(node.filterTypes),
      itemTypes: toMutableNumbers(node.itemTypes),
      specializedItemTypes: toMutableNumbers(node.specializedItemTypes),
      equipTypes: toMutableNumbers(node.equipTypes),
      weaponTypes: toMutableNumbers(node.weaponTypes),
      armorTypes: toMutableNumbers(node.armorTypes),
      traitTypeRange: toMutableRange(node.traitTypeRange),
      furnitureCategoryIds: toMutableNumbers(node.furnitureCategoryIds),
      furnitureSubcategoryIds: toMutableNumbers(node.furnitureSubcategoryIds),
      itemNameContains: node.itemNameContains,
    }
    flat[node.id] = out

    if (children) {
      for (const child of children) {
        visit(child, node.id)
      }
    }
  }

  const roots: readonly UpstreamCategoryNode[] = Object.values(tree)
  for (const root of roots) {
    visit(root, undefined)
  }

  return flat
}

export const CATEGORY_TREE: Record<string, CategoryNode> = flattenTree(ITEM_CATEGORY_TREE)

export const CATEGORY_ROOTS: string[] = [...ITEM_CATEGORY_PRIORITY]
