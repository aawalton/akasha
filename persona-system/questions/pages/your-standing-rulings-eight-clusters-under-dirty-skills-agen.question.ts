import type { Question } from "../question.page-type.ts"

export const yourStandingRulingsEightClustersUnderDirtySkillsAgen = {
  id: "019fbb5f-ea6f-7b19-a00c-0d9b1d1514c9",
  pageTypeSlug: "question",
  slug: "your-standing-rulings-eight-clusters-under-dirty-skills-agen",
  ask: "Your standing rulings — eight clusters under `dirty/skills/agent-harness/rulings/`, each entry carrying your words, the date and the specimen — are all in quarantine, so nothing on the clean perimeter delivers any of them. Should that corpus be ingested, and if so what ranks it?",
  askedBy: "athena",
  askedIn: "019fba68-7d7f-7283-960d-10abb0f97555",
  status: "answered",
  offered: [
    "Ingest it: build the fleet domain it needs and rank the rulings there",
    "Ingest only the perishable half (standing, direction) and leave the rest as evidence",
    "Leave the whole corpus in quarantine — it is my working surface, not the estate's",
    "Leave it, but mark the superseded standing entries in place so no seat halts on them",
  ],
  answer:
    'ALAN\'S RULING, 2026-08-02: "Sounds like an initiative to capture for rulings, parallel to the other corpus/ initiatives."\n\nYes to ingestion, and it gets its own programme rather than being folded into the general backlog.\n\nCAPTURED by athena-lead as initiatives/corpus/ruling.md, commit cc5210e4 — the tenth corpus initiative, alongside domain, file-kind, finding, folder, knowledge, principle, role, schema and task.\n\nMeasured for the capture rather than taken from this question: 8 clusters, 166 entries, 242,165 bytes — more than half the weight of the entire live markdown perimeter (442,266 bytes). claims 56 KB / 32 entries, measurement 54 KB / 43, instruments 38 KB / 23, rows 27 KB / 20, direction 24 KB / 9, surfaces 18 KB / 12, authority 14 KB / 10, standing 11 KB / 17.\n\nFive objectives. The first is standing.md\'s live hazard — a perishable ruling that cannot read as live after it lapses. The second is the "what ranks it" half of this question, left open rather than presumed: there is no `ruling` schema under tools/document/schemas/, no domain owns one, and principles-generated ranks 64 units across 11 domains with none of them a ruling. The initiative is filed under `domain: agent-harness` for now precisely because where a ruling ranks is one of the things it has to settle.\n\nNOT DONE, and deliberately: standing.md is untouched. It still frames "NO NEW WORK IS DISPATCHED" and "the budget is ten" as current, both superseded by how the fleet has run since. Editing a record of Alan\'s words to say he has released them is not a thing an agent should do to his authority surface without him — so it is the initiative\'s first objective rather than a change made in passing.',
  context: "txt",
} as const satisfies Question
