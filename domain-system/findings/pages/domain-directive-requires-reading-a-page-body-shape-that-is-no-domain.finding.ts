import type { Finding } from "../finding.page-type.ts"

export const domainDirectiveRequiresReadingAPageBodyShapeThatIsNoDomain = {
  id: "01a06114-93cd-72e8-a807-a31143b72dd7",
  pageTypeSlug: "finding",
  slug: "domain-directive-requires-reading-a-page-body-shape-that-is-no-domain",
  domainSlug: "workspace-package/domain-system",
  claim:
    "`pages/domain/domain-directive.domain.md` names `page-body-shape/domain` in `required-reading-slugs`, a property whose `target-slug` is `domain`. `page-body-shape` extends `page`, so that address can never resolve. It is the one genuinely unresolvable relation left in the markdown tree once the migration's shadow is subtracted, and it was written deliberately, so it remains unrepaired.",
  evidence:
    "Of the 2530 relations `relations-resolve` cannot resolve, 2529 name something that exists and is only out of the checker's reach. This one names something that exists and is of the wrong kind.\n\n`pages/page-property-definition/domain-required-reading-slugs.page-property-definition.md` states `type: list(relation-address, max 20)` and `target-slug: domain`. `pages/page-type/page-body-shape.page-type.md` states `extends-slug: page` and `body-shape-slug: template`; its chain reads `[page-body-shape > page]` and never reaches `domain`. The two sibling entries on the same page, `page-body-section/domain-principle` and `page-body-section/domain-rule`, do resolve, because `page-body-section` states `extends-slug: domain`.\n\nIt is the only `page-body-shape/` address anywhere in the markdown tree, so no family is behind it.\n\nCommit dc72dafdc9 of 2026-08-28 added the line, and its message says why: prose had spelled the lengths a third time and disagreed, so the prose came out and required reading was pointed at the shape that enforces them. Deleting the entry would restore exactly the rot that commit removed.\n\nThe call taken in Alan's absence is to leave it. The two repairs available are to widen `required-reading-slugs` past `domain` or to re-parent `page-body-shape` onto it, and both are decisions about what required reading means rather than repairs to a broken page.",
} as const satisfies Finding
