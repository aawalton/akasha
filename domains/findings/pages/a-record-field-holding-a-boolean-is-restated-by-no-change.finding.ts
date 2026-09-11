import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aRecordFieldHoldingABooleanIsRestatedByNoChange = {
  id: "01a08e5d-97cf-7095-b986-175cdb4dd75b",
  type: "finding",
  slug: "a-record-field-holding-a-boolean-is-restated-by-no-change",
  domain: "domain/change",
  claim:
    "`change-mechanical-file-content/change-property-record-field` reaches a field holding text and no other field, so a record field holding a boolean or a number is restated by no mechanical change. A page type's declaration list is records of exactly that shape: `required`, `many`, `secret` and `uncommitted` all hold booleans, and `maxCount` and `maxLength` hold numbers. Narrowing a declaration from optional to required is therefore done by `change-agent/change-file` over the whole line, which is an authored passage rather than a field named by key, and which a second agent's reformatting of that line breaks.",
  evidence:
    "`changes/mechanical/file-content/change/change-property-record-field/change-property-record-field.change-mechanical-file-content.code.ts` reads the field with `textsOf(one).get(named.field)` and refuses with ``that record states no text under `${named.field}` `` where that answers nothing. Drafting `change-property-record-field` over `pages/file-properties/file-property.page-type.ts` with `key: properties`, `where: pageProperty`, `is: text-property/extensions`, `field: required`, `to: true` refused with exactly that line on 2026-09-10. The same call with `field: pageProperty` would have worked, because that field holds text. The declaration was narrowed by `change-agent/change-file` instead, replacing the whole line, and landed as 15d157b180fc. The change stating a record field into a page, `change-mechanical-file-content/add-page-property`, already reads a value of any shape through `valueIn`, which parses text, numbers, booleans, null, lists and records; the restating change reads only a string literal.",
} as const satisfies Finding
