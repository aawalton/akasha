import type { Finding } from "../finding.page-type.ts"

export const twoAgentsQuotingOneVolatileFieldDoubtEachOtherRatherThanTheField = {
  id: "01a063e9-1186-7000-bb5e-2019c7d43c36",
  pageTypeSlug: "finding",
  slug: "two-agents-quoting-one-volatile-field-doubt-each-other-rather-than-the-field",
  domainSlug: "workspace-package/domain-system",
  claim:
    "A quotation of working memory carries no moment it was read, so two agents holding quotations that disagree cannot tell which reading is older. The reading available to each is that the other misread. The field having moved between them is the explanation neither reaches, and the cost falls on trust in the peer rather than on trust in the citation.",
  evidence:
    "Two sessions on 2026-09-02 held different texts for the third intent of `aine-checks-judge-the-change`. One read a working memory naming `valueAt(path, root)` and closing `Read from the code rather than demonstrated`. The other read a working memory naming `Answering.pageAt` and closing with a demonstration and its before-and-after answers. Both quoted what each had read. Neither quotation carried when it was read.\n\nThe disagreement was settled by one session going back to the page, which is what a citation should not need. Had neither gone back, the two texts read as one session having misquoted, since a misquotation and a superseded quotation are the same artifact.\n\nThe asymmetry is what makes the reading wrong rather than merely unavailable. The session holding the older text had no signal that a newer one existed, and the session holding the newer text had no signal that the older one had ever said something else. Each had grounds to doubt the other and none to doubt the field.\n\nA commit hash carries its own moment, so two agents naming different hashes for one path agree at once that the path moved. A quotation of a page property carries no such thing. `akasha/domain-system/initiatives/properties/working-memory.text-property.ts` names a max of 500 and one invariant, `Working memory is emptied when its intent leaves`.\n\nThe finding `a-working-memory-cited-from-an-earlier-read-names-the-state-before-the-work` holds the staleness. This one holds what the staleness costs when two agents meet over it.",
} as const satisfies Finding
