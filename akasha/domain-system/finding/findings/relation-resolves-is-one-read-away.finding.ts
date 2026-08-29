import type { Finding } from "../finding.page-type.ts"

export const relationResolvesIsOneReadAway = {
  id: "01a04bd1-923f-7844-bc44-647752ba5b30",
  pageTypeSlug: "finding",
  slug: "relation-resolves-is-one-read-away",
  domainSlug: "domain/checks-system",
  claim: "Of the four checks that did not get rebuilt, relation-resolves is the nearest to landing and is blocked by one missing lookup.",
  evidence:
    "Every other step is already index-only and cheap: whether a qualified name exists is one read of the identity file, and the line count answers the case where a name narrows to more than one page; whether an id exists is one read; and a bare name is resolved by walking down the reverse edges under the target's extends-slug, which is the reverse graph doing the job it was built for. The only step that fails is telling which of a page's keys are relations at all. That is the property schema gap. Two things to weigh when unblocking it. The indexer already computes this judgement when it files a page and answers with refusals, so the check may be better reading those than recomputing them. And index-backed resolution loses something the old tree-backed form had: a page naming a target added in the same change resolved cleanly then, and will be refused now, because the new target is in no index until after the change lands.",
} as const satisfies Finding
