import type { Finding } from "../finding.page-type.ts"

export const everyWorldMechanicPageImportsItsTypeFromOneFolderTooHigh = {
  id: "01a06582-a4a3-71ef-9135-68135770fef4",
  pageTypeSlug: "finding",
  slug: "every-world-mechanic-page-imports-its-type-from-one-folder-too-high",
  domainSlug: "domain/akasha-migration",
  claim:
    "Every one of the 9,321 pages under `akasha/story/world-mechanics/*/pages/` names its page type through a relative path one folder too high, so not one of those imports reaches a file.",
  evidence:
    "`classes/pages/acolyte/acolyte.world-class.ts` imports `../../../world-class.page-type.ts`, which comes out at `akasha/story/world-mechanics/world-class.page-type.ts`, where no file is; the page type it wants is `classes/world-class.page-type.ts`, two levels up rather than three. The flat `conditions/pages/battlefield-of-the-silent.world-condition.ts` imports `../../world-condition.page-type.ts` and misses by the same one level, so depth is not what varies. Resolving the first import of all 9,321 page files under the twenty `world-mechanics/*/pages` folders against the disk answers 0 reached and 9,321 missed. A page landed the same evening at `akasha/story/world-characters/pages/adetr-steelfur.world-character.ts` imports `../world-character.page-type.ts` and does reach its type, so what is wrong belongs to the mechanics folders rather than to the page grammar. That page passed 36 checks at its gate, so no check judges whether a page's import reaches the page type it names.",
} as const satisfies Finding
