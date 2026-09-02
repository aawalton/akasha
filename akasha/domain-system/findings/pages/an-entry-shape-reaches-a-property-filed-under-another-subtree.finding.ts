import type { Finding } from "../finding.page-type.ts"

export const anEntryShapeReachesAPropertyFiledUnderAnotherSubtree = {
  id: "01a06182-5aae-7001-9894-9056f5ba73e8",
  pageTypeSlug: "finding",
  slug: "an-entry-shape-reaches-a-property-filed-under-another-subtree",
  domainSlug: "domain/temper",
  claim:
    "`text-property/achievement-name` is now named by two entry shapes in two sub-domains, and its file sits under one of them. The reference is a slug rather than an import, so `imports-inside` cannot see it and nothing refuses the reach. Moving the file up to `temper-catalog-thing` is what `temper.domain.ts` asks for.",
  evidence:
    '`akasha/temper/temper-catalog/temper-skills/properties/achievement-name.text-property.ts` states `propertySlug: "name"` and is named among the parts of `temper-scribing-source` at `akasha/temper/temper-catalog/temper-skills/scribing-sources/temper-scribing-source.page-type.ts:23`. Its one reader was `tier-achievements.page-property-entry.ts:12`, in the same sub-domain.\n\nLanded on 2026-09-02, `akasha/temper/temper-catalog/temper-pursuits/achievement-categories/properties/achievements.page-property-entry.ts` names it too, so the 3,841 achievement rows spell their name key `name` off a property file two sub-domains away.\n\nThe alternative was a second text property meaning the same thing. `slug.text-property.ts` sets `unique: "page-type"`, so the second one could not also be slugged `achievement-name`, and akasha would carry two spellings of one concept.\n\n`akasha/temper/temper.domain.ts:131` says "A property more than one page type carries is declared by a page type above them." Read strictly it speaks of page types, and no page type carries `achievement-name` — two entry shapes name it. So the invariant does not quite reach this, and the reach is unrefused rather than allowed.\n\nWhat holds it together today is only that both `temper-scribing-source` and `temper-achievement-category` extend `temper-catalog-thing`. Moving the file to `akasha/temper/temper-catalog/temper-catalog-things/properties/` and naming it among that page type\'s parts would put the declaration above both readers. That was left undone here to keep this change inside the achievement table.',
} as const satisfies Finding
