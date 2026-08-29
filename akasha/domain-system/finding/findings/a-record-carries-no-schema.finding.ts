import type { Finding } from "../finding.page-type.ts"

export const aRecordCarriesNoSchema = {
  id: "01a04d4d-b0e5-7e50-bef2-6bf0fc797bf2",
  pageTypeSlug: "finding",
  slug: "a-record-carries-no-schema",
  domainSlug: "domain/domain-system",
  claim:
    "A property of kind record states nothing about its fields, so the two records the corpus has are unreadable to any check, and the schema index that landed to close the property gap did not close this one.",
  evidence:
    "Of the six kinds, text carries max and a name format, number carries max, relation carries a target page type, and list carries an entry slug and a max. File carries nothing and record carries nothing. There are two records now. Directive is where rule and principle keep their prose, and invariant, made a record today, is what every design, condition and intent entry in the corpus is. Their fields — a directive's name, act, warrant and aids, an invariant's kind and statement — are declared in TypeScript and nowhere in the page data. Nothing reading pages can tell a warrant from a name, hold an act to its hundred characters or an aid to its fifty, or count the aids. The compiler holds the shape for a value written in the folder and holds nothing for a value read back out of a body, which is what a check is handed. The prediction this finding made has been borne out. It said a schema entry per property slug carrying kind, target page type and entry slug would file directive as a record and stop. That entry landed, and `schema/page-property-type/slug/directive.jsonl` reads `{\"kind\":\"record\",\"targetPageTypeSlug\":null,\"entrySlug\":null}`. The fields stayed dark, and while the work was going on the kind that holds the corpus's rules spread to a second property. Measured today the values are within their limits, so this is a capability that is absent rather than a defect that is live.",
} as const satisfies Finding
