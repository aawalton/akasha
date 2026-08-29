import type { Finding } from "../domain-system/finding/finding.page-type.ts"

export const theIndexAnswersNoPropertySchema = {
  id: "01a04bd1-923e-76f1-b810-78d81a549fde",
  pageTypeSlug: "finding",
  slug: "the-index-answers-no-property-schema",
  domainSlug: "domain/data-system",
  claim: "A check cannot learn what kind a property is in one index read, and that single gap blocks three of the four checks that did not get rebuilt.",
  evidence:
    "A page's own value is readable, but telling `extendsSlug: \"page-type/domain\"` from `definition: \"a bounded area of concern\"` needs the property's kind, and kind is text, so nothing indexes it. `targetPageTypeSlug` and `entrySlug` are relations and are indexed, but filed under the target, so going from a property to what it may name means trying every page type. The existing way to get this is `knownIn`, which lists two whole identity directories and loads every page in them out of the tree — a walk, which `index.domain.ts` forbids of an answer and `check.page-type.ts` forbids of a check. One new index file fixes it: a schema entry per property slug carrying kind, target page type and entry slug, reachable in one read. It costs nothing per change and turns the lookup into O(1). This is the smallest change that unblocks the most, and it belongs to data-system rather than to checks.",
} as const satisfies Finding
