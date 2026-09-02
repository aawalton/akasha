import type { Finding } from "../finding.page-type.ts"

export const twoPageTypesUnderTemperWorldAreNeitherPlacesNorPeople = {
  id: "01a05fc7-f922-77b0-8297-c8401ce4691e",
  pageTypeSlug: "finding",
  slug: "two-page-types-under-temper-world-are-neither-places-nor-people",
  domainSlug: "domain/temper-world",
  claim:
    "`temper-catalog-domain` and `temper-source-category` are filed under a domain defined as the places of Tamriel and the people who live in them, and neither is a place or a person. The grouping was mine and it was wrong.",
  evidence:
    "`temper-catalog-domain` carries capture bookkeeping — `api-version`, `manifest-api-version`, `captured-at`, and which version a generator last ran for — which is about the mirroring rather than about the game. `temper-source-category` names the groups a character's stat sources fall into, which reaches across gear, skills and effects rather than sitting in any of them. Both fit `temper-catalog` itself, defined as what the game holds mirrored. Moving them means carrying their property pages out of `temper-world/properties/` with them, so it is left until the clusters running in parallel have settled rather than done while they are landing.",
} as const satisfies Finding
