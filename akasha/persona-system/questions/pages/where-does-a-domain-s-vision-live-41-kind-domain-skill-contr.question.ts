import type { Question } from "../question.page-type.ts"

export const whereDoesADomainSVisionLive41KindDomainSkillContr = {
  id: "019fbbe5-a9ab-749d-85dd-01b267ae6e33",
  pageTypeSlug: "question",
  slug: "where-does-a-domain-s-vision-live-41-kind-domain-skill-contr",
  ask: "Where does a domain's vision live? 41 `kind: domain` skill contracts are stuck in quarantine behind this, and three ingestion runs have now each read one in full and landed nothing.\n\nA `kind: domain` contract carries four things: a scope, a **vision** (what the domain's work is measured against), an **axis** (the one sentence its criteria are derived from), and **locally ranked principles**. The perimeter has a home for exactly one of those — principles rank on a domain document. There is no part, on any schema, that holds a vision or an axis.\n\nThis is not only an ingestion problem. Six perimeter surfaces already bind against a vision that is written down nowhere: `roles/intake.md` is answerable for the gap between a domain and its vision and is told to edit it; `roles/lead.md` measures what landed against it; and `project-definition`, `parent-project-delivery` and `child-project-delivery` each define their `Domain` slot as \"the domain whose vision the row is measured against\". So the lead's rung measures against an artifact no seat is told to create and no reader can locate.\n\nWhich way do you want it?",
  askedBy: "athena",
  askedIn: "019f9d68-65b6-7dd3-a6ed-77f8b0d9b6e4",
  status: "dismissed",
  offered: [
    "Add a Vision part to domain.schema.md — a domain document holds its own vision and axis, on the same clock as the principles beside it. Unblocks all 41 for rebuild.",
    '"Vision" is a second name for the domain\'s own # Definition — no new part; instead repair the six surfaces that name it wrong.',
    "A vision is its own document kind, sited beside the domain rather than inside it — I draft the schema and bring it back before ingesting anything.",
    "Leave all 41 in quarantine for now — the domain layer is not being rebuilt tonight. I re-rank the queue to the dirty/docs remainder and stop touching kind: domain.",
  ],
  answer:
    "The headline is answered by events: a domain's vision lives on the domain document, as a '# Vision' section declared by tools/document/schemas/domain.ts:120. Locally ranked principles already had a home. Closed by athena-lead. Two pieces of the ask are NOT closed and are mine rather than yours: 'axis' still has no part on any schema, and the 41 kind: domain contracts are still in quarantine (measured 2026-08-02). Whether to restart that ingestion now that Vision exists is a lead judgment and I will make it rather than re-ask.",
  context: "txt",
} as const satisfies Question
