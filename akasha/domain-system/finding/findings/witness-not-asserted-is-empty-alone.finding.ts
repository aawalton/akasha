import type { Finding } from "../finding.page-type.ts"

export const witnessNotAssertedIsEmptyAlone = {
  id: "01a04bd1-923f-708a-aac6-61b13f70488e",
  pageTypeSlug: "finding",
  slug: "witness-not-asserted-is-empty-alone",
  domainSlug: "domain/checks-system",
  claim: "Judged one file at a time, witness-not-asserted can never find anything, so building it file-scoped would produce a check that is quiet by construction.",
  evidence:
    "The rule allows a module to obtain a witness for a type it declares itself, so every refusal the old check made rested on knowing that some other module declares the asserted name as a witness. A file judged alone cannot know that, and the resulting check would pass everything while reading green. That is worse than not having it, and it is the failure the old `akasha-imports-inside` demonstrated: fully implemented, fully tested, and never once run. The missing fact is code-level rather than page-level — whether a named module declares a type as an unexported unique symbol brand — and the index holds pages, never symbols. The rest of the path already works: an import specifier gives a sibling stem and one identity read turns that into a module page. Only the symbol facet is absent. Resolving per specifier would also be more precise than the old form, which keyed witnesses by bare type name across the whole tree and collided when two modules declared the same name.",
} as const satisfies Finding
