import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import {
  type ItemCategoryRow,
  itemCategoryRootsOf,
} from "akasha/temper/items/core/modules/item-category-tree-reading/item-category-tree-reading.module.code.ts"
import type {
  ItemCategoryNode,
  ItemCategoryRoots,
} from "akasha/temper/items/core/modules/item-category-tree-types/item-category-tree-types.module.code.ts"
import { temperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.ts"

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

function flattenTree(roots: ItemCategoryRoots): Record<string, CategoryNode> {
  const flat: Record<string, CategoryNode> = {}

  function visit(node: ItemCategoryNode, parentId: string | undefined): undefined {
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

  for (const root of roots) {
    visit(root, undefined)
  }

  return flat
}

interface CompiledTree {
  readonly roots: ItemCategoryRoots
  readonly flat: Record<string, CategoryNode>
  readonly rootIds: string[]
}

function treeOfPages(this: void): CompiledTree {
  const roots = itemCategoryRootsOf($pagesOfType<ItemCategoryRow>(temperItemCategoryTree))
  return { roots, flat: flattenTree(roots), rootIds: roots.map((one) => one.id) }
}

let held: CompiledTree | undefined

function compiledTree(): CompiledTree {
  if (held === undefined) held = treeOfPages()
  return held
}

export function categoryRoots(): ItemCategoryRoots {
  return compiledTree().roots
}

export function categoryTree(): Record<string, CategoryNode> {
  return compiledTree().flat
}

export function categoryRootIds(): string[] {
  return compiledTree().rootIds
}
