import type { Finding } from "../finding.page-type.ts"

export const aRecordCarriesNoSchema = {
  id: "01a04d4d-b0e5-7e50-bef2-6bf0fc797bf2",
  pageTypeSlug: "finding",
  slug: "a-record-carries-no-schema",
  domainSlug: "domain/domain-system",
  claim:
    "A property of kind record states nothing about its fields, so the directive holding every rule in the corpus is unreadable to any check, and the index schema entry proposed to close the property gap would not close this one.",
  evidence:
    "Of the six kinds, text carries max and a name format, number carries max, relation carries a target page type, and list carries an entry slug and a max. File carries nothing and record carries nothing. Directive is the only record, and it is where rule and principle keep their prose, so the four fields it holds are declared in TypeScript and nowhere in the page data. Nothing reading pages can tell a warrant from a name, hold an act to its hundred characters or an aid to its fifty, or count the aids. The compiler holds the shape for a value written in the folder and holds nothing for a value read back out of a body, which is what a check is handed. This bears on a proposal already accepted in another domain. The-index-answers-no-property-schema calls for a schema entry per property slug carrying kind, target page type and entry slug, and calls it the smallest change that unblocks the most. That covers text, relation and list. Record has no target and no entry, so the entry would file directive as a record and stop, and the fields would stay dark after the work landed. Measured today the values are within their limits, so this is a capability that is absent rather than a defect that is live. Recorded because the gap belongs to domain-system, the property that suffers is domain-system's own, and the fix that is being planned for it is being planned in data-system by people not watching this.",
} as const satisfies Finding
