---
id: ba45fcd0-a73f-59ad-9d7a-74c59881b8e3
page-type-slug: finding
title: "Schema MD citations dead"
domain-slug: domain/global
---

# Claim

Five docblock citations in live library code name `*.schema.md` documents in the present tense, as the authority for a claim. No file of that spelling exists in any repository — the schemas are TypeScript under `tools/document/schemas/`.

# Evidence

The sites, all outside `dirty/`:

- `tools/lib/seat-resolve.ts:60` — "`schema.schema.md` rules that a kind of document IS a domain and `folder.schema.md`"
- `tools/lib/seat-resolve.ts:63` — "because, as `domain.schema.md` puts it, a file name is not what a thing is"
- `tools/lib/closure.ts:15` — "as its parent, and `schema.schema.md` is one of its own schemas"
- `tools/lib/seat-seq.ts:38` — "A seq as the corpus already types one: `initiative.schema.md` admits digits and nothing else"
- `tools/document/schemas/file-kind.ts:10` — "`schemas/file-kind.schema.md`"

`ls ~/instructions/**/*.schema.md` finds nothing. `tools/document/schemas/` holds `default.ts`, `domain.ts`, `file-kind.ts`, `finding.ts`, `folder.ts`, `initiative.ts`, `persona.ts`, `project.ts`, `ranked.ts`, `role.ts` and `task.ts`. There is no `schema.ts`.

Not repaired, and the reason is that the repair is not mechanical. `schema.schema.md` has no same-stem successor at all, so whatever it cited has moved to some other surface — `domains/schema.md` is the candidate, but naming it is a decision about which surface now carries the claim rather than a rename. The same question stands for each of the five.

Seven further files carry the spelling as test fixture paths — `tools/tests/corpus.ts`, `agent-governance.test.ts`, `domain-slug-unique.test.ts`, `principle-place.test.ts` and others. Those are shapes rather than citations and nothing turns on them.

Found from outside these files, during a perimeter pass on 2026-08-05, while checking a claim quoted from `tools/lib/seat-resolve.ts`.
