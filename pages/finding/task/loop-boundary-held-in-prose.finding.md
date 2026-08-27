---
id: 92b8b769-09e2-5178-b5af-2a99ea970fbb
page-type-slug: finding
title: "Loop boundary held in prose"
domain-slug: page-type/task
---

# Claim

A task that iterates and then runs a final stage once holds that boundary in prose rather than in its schema. `tools/document/schemas/task.ts` declares `Sequence` and `Loop` as separate stage sections and admits one of them. `ingest-instructions.md` iterates stages 1 to 4 and runs stage 5 once, and the only things marking where the loop closes are stage 5's name and four words in stage 4's Return bullet.

# Evidence

Reported by a review-instructions seat on `domains/tasks/archivist/ingest-instructions.md` as an observation rather than a defect — the shape is held by a sentence rather than by the schema, and it wanted that on the record.

I confirmed `task.ts` declares both `sequence` and `loop` as stage sections at lines 61-62. I did not read the choices cardinality that would prove they are mutually exclusive, so the exclusivity is the reviewer's claim rather than my measurement.

The same reviewer kept the four words on that basis: it read the three sibling Loop tasks and none carries a return bullet, so what makes this one different is precisely that stage 5 sits outside the iteration.

Not measured: how many other task documents carry a stage outside their loop, or whether the schema could express it.
