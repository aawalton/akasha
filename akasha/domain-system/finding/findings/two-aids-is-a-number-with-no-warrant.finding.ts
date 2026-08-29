import type { Finding } from "../finding.page-type.ts"

export const twoAidsIsANumberWithNoWarrant = {
  id: "01a04d4f-b2a2-7000-8c70-25ef32a88aee",
  pageTypeSlug: "finding",
  slug: "two-aids-is-a-number-with-no-warrant",
  domainSlug: "domain/domain-system",
  claim:
    "A directive's aids are fixed at exactly two by the type with no line saying why, and six of the seven directives written pair two aids of one polarity, which is not the ruling for or against that an aid is defined as.",
  evidence:
    "An aid is defined as a ruling on one act a reader is about to take, for or against, and the directive type states aids as a pair, so every directive has two because it cannot have one or three. Read the seven. Answer Or Refuse, Fail Closed, Alan Approves and Zero At Landing each pair two refusals. Resolve When Found pairs two narrowings. Every Changed Line pairs two loosenings, both saying when the act is lighter than it reads. Only one of the seven sets a permission against a refusal. Accrete And Ablate is the case worth looking at closely: `The new is not done while it has findings` and `The new is not done while the old exists` are one sentence with the tail swapped, which is what writing to a fixed arity looks like when only one aid was to hand. So the pair is not carrying the for and the against the definition names, and either the definition is describing something the corpus does not do or the arity is asking for something authors do not have. No design entry anywhere states why two, so a reader meets the number as a fact about the type with no reason attached. It also sits against a line in akasha-type, that a page's type is derived from the page's value; this is the one place in the corpus where the type is imposed on the value instead. Recorded rather than fixed because the choice between loosening the arity and rewriting what an aid is is a changed line either way.",
} as const satisfies Finding
