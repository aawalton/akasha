import type { Finding } from "../finding.page-type.ts"

export const temperIdIsDroppedWhereItOnlyRestatedTheSlug = {
  id: "01a05fc7-f921-7cc5-883c-88cd85d293f6",
  pageTypeSlug: "finding",
  slug: "temper-id-is-dropped-where-it-only-restated-the-slug",
  domainSlug: "domain/temper",
  claim:
    "The recreated alliances carry no `temper-id`, because on every source page its value was the slug character for character. A reader outside akasha that took `temperId` off an alliance must now take the slug instead.",
  evidence:
    "All four pages under `pages/temper-alliance/` state a `temper-id` equal to their own slug: `aldmeri-dominion`, `daggerfall-covenant`, `ebonheart-pact` and the fourth alike. In akasha a page is reached by its slug, so a property restating the slug is a second name for one fact and was not recreated. What is lost is only the spelling: any caller wanting the value reads `slug`. The same key may appear on other temper page types where it is not the slug, and there it is a real property rather than duplication, so this finding covers the alliances alone.",
} as const satisfies Finding
