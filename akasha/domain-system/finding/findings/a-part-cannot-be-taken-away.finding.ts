import type { Finding } from "../finding.page-type.ts"

export const aPartCannotBeTakenAway = {
  id: "01a04efb-ef23-7571-98ff-e42551927481",
  pageTypeSlug: "finding",
  slug: "a-part-cannot-be-taken-away",
  domainSlug: "domain/command-system",
  claim:
    "A page named among another page's parts cannot be removed at all, because unnaming it and taking it away are two changes and each one is refused on its own.",
  evidence:
    "Taking `page-slug` away while `domain` still named it was refused by `relation-resolves`: `akasha/domain-system/domain/domain.page-type.ts — states `part-slugs`, and no `relation-property` carries the slug `page-slug``. Dropping the name first was refused by `domain-is-named-by-a-parent`: `akasha/domain-system/domain/properties/page-slug.relation-property.ts — no page names `relation-property/page-slug` among its parts`. Both refusals are correct on the change they were handed, and together they close every order. Neither check is at fault: each reads the change as one whole and each would pass if the removal and the unnaming arrived together, since `domain-is-named-by-a-parent` passes over a page the change takes away and `relation-resolves` would read the parent's new body. What cannot happen is the arrival. `akasha write` carries bodies and `akasha remove` carries paths, and no command carries both, so the one change that would land is not sayable. The glass was broken once here, on the unnaming, because an orphaned page resolves and a dangling name does not, and the removal then landed under every check. Recorded rather than fixed because the fix is a command shape — one call taking `--file-path` with a body and `--file-path` without one, gated as a single change — and that is the command system's call, not a check's.",
} as const satisfies Finding
