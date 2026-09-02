import type { Finding } from "../finding.page-type.ts"

export const theTributeCategoryNameIsTitleCasedRatherThanRead = {
  id: "01a06162-02c3-7001-b3d8-b48dcbc63529",
  pageTypeSlug: "finding",
  slug: "the-tribute-category-name-is-title-cased-rather-than-read",
  domainSlug: "domain/temper",
  claim:
    "The tribute patrons' `categoryName` is recovered by title-casing a kebab slug rather than read off the page holding the name. All twelve patrons say `Patrons`, which is also the title of collectibles category 2, and the recreation holds no relation between the two.",
  evidence:
    '`temper/player-completion/src/generated/tribute-data.generated.ts` gives each patron a `categoryName`, and all twelve say `Patrons`. `collectibles-data.generated.ts` names category index 2 `Patrons` and holds the twelve patron collectibles beneath it, each reached by the `collectibleId` its patron states.\n\nThe pages landed at `akasha/temper/temper-catalog/temper-pursuits/tribute-patrons/pages/` state `category: "patrons"`, because `akasha/temper/temper-things/properties/category.text-property.ts` sets `nameFormatSlug: "name-format/lower-kebab-case"` and refuses `Patrons`.\n\n`akasha/temper/temper-addon-generators/temper-tribute/temper-tribute.module.code.ts` builds the emitted name back in `titledFrom`, which upper-cases the first letter of each hyphen-separated word.\n\nThat reproduces the bytes today because `patrons` is the only value the table holds. A category whose game name is not one capitalised word per hyphen would emit wrongly, and no check would refuse it.\n\nWhat the recreation lost is the relation. The shape that keeps it is the patron page naming the collectible category page and the generator reading that page\'s title, which waits on the collectible categories landing.',
} as const satisfies Finding
