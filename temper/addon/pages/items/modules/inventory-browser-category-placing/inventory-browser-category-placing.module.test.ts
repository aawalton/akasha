import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  type CategoryPageRow,
  placedCategories,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-category-placing/inventory-browser-category-placing.module.code.ts"
import { temperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.ts"

const HAND_WRITTEN: readonly (readonly [string, readonly string[]])[] = [
  ["All", []],
  ["Weapons", ["All", "One-Handed", "Two-Handed", "Bow", "Destruction Staff", "Healing Staff"]],
  ["Armor", ["All", "Heavy", "Medium", "Light", "Clothing", "Shield"]],
  ["Jewelry", ["All", "Necklace", "Ring"]],
  [
    "Consumables",
    [
      "All",
      "Food",
      "Drink",
      "Recipe",
      "Potion",
      "Poison",
      "Motif",
      "Master Writ",
      "Container",
      "Repair",
      "Crown Item",
      "Misc",
    ],
  ],
  [
    "Materials",
    [
      "All",
      "Blacksmithing",
      "Clothing",
      "Woodworking",
      "Jewelry",
      "Alchemy",
      "Enchanting",
      "Provisioning",
      "Style",
      "Traits",
      "Furnishing",
    ],
  ],
  ["Furnishings", []],
  ["Companion", ["All", "Weapons", "Armor", "Jewelry", "Shield"]],
  [
    "Miscellaneous",
    [
      "All",
      "Appearance",
      "Glyphs",
      "Soul Gem",
      "Siege",
      "Tools",
      "Trophy",
      "Bait",
      "Stolen",
      "Junk",
      "Scribing",
      "Collectibles",
    ],
  ],
]

function pagesInCheckout(pageTypeSlug: string, limit: number) {
  const answered = asking(akashaRoot(), { pageTypeSlug, limit } as never)
  if ("refused" in answered) throw new Error(answered.refused)
  return answered.rows.map(asPage)
}

async function pageRows(): Promise<readonly CategoryPageRow[]> {
  const pages = pagesInCheckout(temperBrowserCategory.slug, 2500)
  return pages.map((page) => ({
    slug: page.slug ?? "",
    ...(page.title === null ? {} : { title: page.title }),
    displayOrder: Number(page.displayOrder),
    ...(typeof page.parent === "string" ? { parent: page.parent } : {}),
  }))
}

test("the category pages place the categories and subfilters the browser labelled by hand", async () => {
  const placed = placedCategories(await pageRows())
  expect(placed.map((one) => [one.label, one.subfilters.map((sub) => sub.label)])).toEqual(
    HAND_WRITTEN.map(([label, subs]) => [label, [...subs]])
  )
})

test("categories and subfilters go by display order whatever order the pages come in", () => {
  const placed = placedCategories([
    { slug: "b-two", title: "Two", displayOrder: 2, parent: "temper-browser-category/b" },
    { slug: "b", title: "B", displayOrder: 2 },
    { slug: "a", title: "A", displayOrder: 1 },
    { slug: "b-one", title: "One", displayOrder: 1, parent: "temper-browser-category/b" },
  ])
  expect(placed).toEqual([
    { slug: "a", label: "A", subfilters: [] },
    {
      slug: "b",
      label: "B",
      subfilters: [
        { slug: "b-one", label: "One" },
        { slug: "b-two", label: "Two" },
      ],
    },
  ])
})
