---
id: ec08b11e-b3cf-5282-a824-bfc52367aeb8
page-type-slug: finding
title: "Eval report under an instruction glob"
domain-slug: domain/monarch
---

# Claim

`domains/monarch.md` declares `instructions-path: monarch/**`, which makes every file in that tree an instruction path — including `monarch/eval/README.md`, 174 lines of evaluation report that binds no reader.

# Evidence

`monarch/eval/README.md` opens "What this measures, and what it deliberately refuses to report" and runs to 174 lines: what the evaluation asked, why it publishes no headline accuracy figure, and what `score.ts` prints. It records a measurement taken on a day. It directs nobody.

`domains/domain.md` binds Path Globs — declare a path glob only where the domain's area is that set of files, because a glob invented to fill a key governs everything it matches and carries onto every domain above. `monarch/**` reaches the categorization rules, which are the domain's material, and reaches this too.

`domains/memory.md` defines memory as a set of documents for incomplete work and says a memory document is deleted when its purpose is complete. An evaluation report is that shape rather than an instruction's, so the question is whether it belongs in the memory repo, in the code it describes, or nowhere once its initiative closed.

Found while surveying instruction text standing outside a schema, 2026-08-09. It was reported to me as unbounded instruction; reading it is what showed it is not instruction at all. Not judged: whether the glob should narrow or the file should move.
