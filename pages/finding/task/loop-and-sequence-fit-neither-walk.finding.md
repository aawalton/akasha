---
id: 0552156c-3eb3-5bcc-b8d1-b1c5b25853b9
page-type-slug: finding
title: "Loop and sequence fit neither walk"
domain-slug: page-type/task
---

# Claim

Two tasks of the same shape file their stages under different headings, and neither heading describes what either actually does. The schema gives `# Loop` a meaning that, read literally, sends the seat back to stage 1 after it has handed back.

# Evidence

`domains/tasks/archivist/ingest-instructions.md:11` is `# Loop`. `domains/tasks/archivist/review-instructions.md:11` and `domains/tasks/archivist/review-perimeter.md:11` are `# Sequence`.

`tools/document/schemas/task.ts:42-43`: "Under `# Sequence` the stages run once and the work is finished; under `# Loop` the seat returns to the first once the last is done."

Both archivist walks iterate bottom-to-top over slices and both run once to the end. Read literally, `# Loop` sends the ingest seat back to stage 1 after **Hand**; only stage 4's **Return** bullet marks where the cycle actually closes.

The real shape of both is stages 1 to 4 looping with the last stage running once. Neither heading expresses that, and `task.ts:45-46` records that the schema cannot say it either: "`# Sequence` and `# Loop` are one required choice, and `HeadingMatch` has no disjunction to say so: each stands optional here and a task carrying neither is admitted."

So the disagreement is between two documents and a vocabulary with no third term, rather than an error in either file. The reading picked neither heading.

Raised by the `review-instructions` reading of `domains/tasks/archivist/ingest-instructions.md` on 2026-08-06.
