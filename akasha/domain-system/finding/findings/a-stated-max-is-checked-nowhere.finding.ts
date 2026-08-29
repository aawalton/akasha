import type { Finding } from "../finding.page-type.ts"

export const aStatedMaxIsCheckedNowhere = {
  id: "01a04da0-85c5-7443-9de8-45b6ffa7028c",
  pageTypeSlug: "finding",
  slug: "a-stated-max-is-checked-nowhere",
  domainSlug: "domain/akasha-type",
  claim:
    "Every text property states a max and nothing measures any of them, so a value over its limit lands and stands until somebody counts it by hand.",
  evidence:
    "`max` is a property of a page property type, and the type derived from one is `string`, so a limit is data the compiler cannot carry. Akasha-type intends that a limit no type can carry is enforced by a check, and no check measures one. Three sightings inside a week, all found by counting rather than by a refusal: a 249 character statement against a max of 200 landed on the domain-is-named-by-a-parent check and stood until a pass over that page happened to measure it; two aids drafted at 55 and 59 against a max of 50 and a warrant at 110 against 100 were caught only because the same pass had just made the limit salient, and would otherwise have landed clean; and one definition of 106 against 100 stands on index.domain.ts now. The corpus reads almost clean today, which is the misleading part: it is clean because the values were mostly written short, not because anything holds them short. The check is the cheapest kind there is, one page read and one length compared per text property a page states, needing no index and no tree. It also wants the schema the index does not hold, since knowing which of a page's properties are text and what each one's max is means reading the property page today; that is the same gap the-index-answers-no-property-schema names, so the two land together or this one walks the page property types.",
} as const satisfies Finding
