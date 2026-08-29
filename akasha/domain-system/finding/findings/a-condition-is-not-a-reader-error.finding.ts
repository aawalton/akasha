import type { Finding } from "../finding.page-type.ts"

export const aConditionIsNotAReaderError = {
  id: "01a04d6b-361e-7030-9d52-54b22a8918a7",
  pageTypeSlug: "finding",
  slug: "a-condition-is-not-a-reader-error",
  domainSlug: "domain/domain-system",
  claim:
    "The four invariant kinds each name a way a reader gets a line wrong, and about half the conditions in the corpus are not got wrong by anyone, so they carry a kind that says nothing true of them.",
  evidence:
    "Departure, absence, constraint and gap are each defined by what a reader would otherwise do: undo it, add it, ask for the impossible, rely on it. Design entries fit, because a design entry exists only where a reader would get it wrong. Conditions were given the same four when the kind landed, and three of the seven do not fit any: `No two pages carry one id`, `No two pages of one page type carry one slug`, and `The index holds every page`. A reader does not get these wrong. They are guarantees a reader should rely on, kept true by the indexer, and relying on them is correct rather than a mistake. All seven were assigned departure, which is the residual, so the three carry a label that reads as a decision a reader would not guess when they are the opposite: exactly what a reader would guess, held true on purpose. The kinds were also drafted for design alone, on design's own page, before condition and intent shared them. Two ways out. Condition takes no kind, on the ground that what it needs stated is what keeps it true rather than what a reader misses. Or a fifth kind names a guarantee, and the vocabulary stops being about reader error only. Recorded rather than fixed because it is a line in domain-system either way, and the owner ruled on intent without ruling on condition.",
} as const satisfies Finding
