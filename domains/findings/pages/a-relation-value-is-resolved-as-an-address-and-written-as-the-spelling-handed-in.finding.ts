import type { Finding } from "../finding.page-type.types.ts"

export const aRelationValueIsResolvedAsAnAddressAndWrittenAsTheSpellingHandedIn = {
  id: "01a08898-7a11-78e6-8d14-68fc7f61fc6e",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-relation-value-is-resolved-as-an-address-and-written-as-the-spelling-handed-in",
  domain: "change-agent-file-content",
  claim:
    "`add-property-value` and `add-property-values` resolve a relation value to a page before working out any body, and then write the spelling the caller handed in rather than the page they resolved it to. Two spellings reaching one page — the bare `my-projects` and the qualified `alan-book/my-projects` — are written as two different strings, and a reader comparing strings sees only one of them. `sections-of-the-book-above` reads `partOfCollections` raw and tests `.includes(book)` against the bare slug, so the qualified spelling passes the act's resolution, passes the act's duplicate guard, and leaves the shape refusing anyway. The duplicate guard compares exact text, so a page already carrying one spelling takes the other as a new value and ends up naming one page twice under one key, with nothing refused.",
  evidence:
    "Found by the lane flattening `alan/books` rather than by the act's author. That report gave the qualified form in its worked example; the lane read the mechanical change before copying it and wrote the bare slug instead. Had they followed the example, 140 pages would each have taken a value that resolves, passes every check the act runs, and leaves `sections-of-the-book-above` refusing all 140 — a landing that looks clean and mends nothing. The behaviour is older than the plural act: `change-mechanical-file-content/add-property-value` splices `given.value` through `withValue` unchanged, and its duplicate test is `each.text === given.value`. The plural act's own tests hold that verbatim write in place without naming it as a hazard. This is the Ubiquitous Naming warrant playing out inside one property: a second spelling reads as a second thing. Two ways to settle it — write the address the value resolved to rather than the spelling, which changes what every caller gets, or refuse a value whose page is already named under that key by another spelling, which only refuses more.",
} as const satisfies Finding
