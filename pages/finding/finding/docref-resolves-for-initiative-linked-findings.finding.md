---
id: c7c6118f-1ec7-53e2-8e13-ff0acbdfd3c1
page-type-slug: finding
title: "Docref resolves for initiative linked findings"
domain-slug: page-type/finding
---

# Claim

Alan approved letting a finding name an initiative instead of a project; vera ruled the frontmatter `docref` type in `tools/document/types.ts` — declared but resolving nothing — should be made to resolve where it is written for a new `initiative:` key on `tools/document/schemas/finding.ts`, rather than adding a separate check beside it, given `domains/finding.md` (`53e99f24`) and `tasks/review-findings.md` (`58108398`) already landed the governing document and task and should not be re-opened.

# Evidence

Project #17547, domain `finding`. Created by `athena-lead`. Alan approved: "findings should be able to list an initiative instead of a project, a matching exit makes sense, approved." What began as one optional key became schema-language work once vera ruled how it must be validated. Measured firsthand 2026-08-02; re-derivable.

**Already settled.** `domains/finding.md` (`53e99f24`, ryn) carries four exits, window at two widths: "a row where the work is created, an initiative where the programme is running and the row is not yet." `tasks/review-findings.md` (`58108398`) carries the third hand-off exit. Vera's ruling: `docref` resolves rather than gaining a check beside it — `tools/document/types.ts` declares `{ type: "docref"; to: DocumentRef }` whose member `resolve` resolves nothing.

**Four acts.** (1) `docref` resolves in frontmatter only, via a lookup where it is written, not a filesystem reach in the checker (`content.ts:8` discards `kind`/`href`); `check.ts:162` takes `check(doc, schema, resolve)`. Callers to thread: `tools/gates/document-conforms.ts:125`, `tools/checks/documents-conform.ts:34`, `tools/document/check.ts:34`, `tools/document/content.ts:38`. (2) Optional `initiative:` key on `tools/document/schemas/finding.ts` — no frontmatter `docref` key exists today; `schemas/initiative.ts` declares only `domain` and `project-seqs`; `domain` is not unique (four rows name `agent-harness`). (3) `tools/rm.ts` extends `[references]` reach to frontmatter, else the rest guarantees only at write time.

**Two live traps (vera's).** Pending set: landing a finding and its initiative together leaves none on disk — resolver answers from the tree the call would produce (`subject.pending`, `tools/lib/gate.ts:69`, used by `gates/domain-slug-unique.ts:45`). Materialized root: `document-conforms` runs its checker in a temp directory with only `.ts` files — a resolver rooted at cwd reports every markdown target missing when a schema change lands; the real root must thread through.

Capture ended right after "Why this is not merely tidy" — not preserved here.
