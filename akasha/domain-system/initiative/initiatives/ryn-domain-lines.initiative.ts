import type { Initiative } from "../initiative.page-type.ts"

export const rynDomainLines = {
  id: "01a053a7-4bd2-7a2f-a7e4-d6b7ed099c7a",
  pageTypeSlug: "initiative",
  slug: "ryn-domain-lines",
  domainSlug: "domain/domain-system",
  personaSlug: "ryn",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every way a directive fails is named on the directive kind it fails as.",
    },
    {
      invariantKind: "gap",
      statement: "Every way an invariant fails is named on the invariant kind it fails as.",
    },
    {
      invariantKind: "gap",
      statement:
        "The directives and invariants standing under akasha total fewer than 15,000 characters.",
    },
    {
      invariantKind: "gap",
      statement: "Alan has reviewed every directive and invariant standing under akasha.",
    },
  ],
  notes: [
    "The kind pages come first. Until each directive kind and each invariant kind names how an entry of that kind fails, nothing tells a reader which of the entries standing today should go, and the count falls by taste rather than by a standard. The count comes second, because it is that standard applied and counted. Alan's reading comes last, because reading an entry on its way out spends him on nothing, so what reaches him is what survived.",
    "The count is taken across the akasha folder alone. `Measure The Whole Repo` on akasha-migration forbids that for a rule's reach, and this narrowing is a deliberate exception to it rather than a reading of it. The old system holds around 92,000 characters of the same doctrine across 720 domain pages, and that doctrine migrates in, so the ceiling can be blown by migration doing its work rather than by anyone writing badly. Whoever meets that files a finding rather than treating the count as failed.",
    "At the start the akasha folder held 1472 invariants and 22 directives: 148,843 characters of statement, name, act, warrant and aid. 15,000 is a tenth of that, rounded. An entry is an object carrying `invariantKind` or `directiveKind`, and its characters are its prose fields alone, so the count is reproducible.",
    "`An agent writes a domain's lines as well as Alan would.` stood as a gap on the domain page type and goes in this same landing, ruled impossible rather than merely unmet. Alan's reading here is the work that gap hoped to make unnecessary. When these intents are met the reading intent is deleted rather than returned to a domain, because `Every Changed Line` already covers every line written after.",
  ],
} as const satisfies Initiative
