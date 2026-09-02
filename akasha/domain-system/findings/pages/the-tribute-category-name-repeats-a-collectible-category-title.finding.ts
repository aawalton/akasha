import type { Finding } from "../finding.page-type.ts"

export const theTributeCategoryNameRepeatsACollectibleCategoryTitle = {
  id: "01a0617b-1824-7001-8465-21ac8f96f086",
  pageTypeSlug: "finding",
  slug: "the-tribute-category-name-repeats-a-collectible-category-title",
  domainSlug: "domain/temper",
  claim:
    "`generateTemperTribute` builds the `categoryName` column of `tribute-data.generated.ts` by title-casing the kebab `category` a patron page states, and all twelve rows come out `Patrons`. The collectibles catalog now holds a `temper-collectible-category` page slugged `patrons` and titled `Patrons`, whose one subcategory holds those same twelve collectibles. One name is written twice with no relation between the two pages, so retitling the category page leaves the tribute column as it was.",
  evidence:
    'Measured on 2026-09-02 while landing the collectibles catalog as pages.\n\n`akasha/temper/temper-addon-generators/temper-tribute/temper-tribute.module.code.ts` holds `titledFrom`, which splits a slug at hyphens and upper-cases the first letter of each word, and `patronOf` calls it on `held.category`. Every one of the twelve pages under `akasha/temper/temper-catalog/temper-pursuits/tribute-patrons/pages` states `category: "patrons"`, and every one of the twelve rows of `tribute-data.generated.ts` carries `categoryName: "Patrons"`.\n\n`akasha/temper/temper-catalog/temper-pursuits/collectible-categories/pages/patrons.temper-collectible-category.ts` states `title: "Patrons"` and `esoCategoryIndex: 2`. Its one subcategory page `patrons-general` carries 12 rows, and their `esoCollectibleId` values are exactly the twelve the patron pages state.\n\n`category` is `text-property/category`, name format `lower-kebab-case`, declared by `temper-thing`. A value naming a page and a value naming none are alike to it, so the tie cannot be judged. A relation property targeting `page-type/temper-collectible-category` would reach the page, and the generator would read the title rather than rebuild it.\n\nTitle-casing a slug is not the game\'s name in general. The two agree here only because `Patrons` is one word with no punctuation. The sibling category titled `Non-Combat Pets` comes back from its slug as `Non Combat Pets`, and `Guar & Kagoutis` as `Guar Kagoutis`.',
} as const satisfies Finding
