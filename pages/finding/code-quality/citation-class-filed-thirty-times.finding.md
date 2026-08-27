---
id: e428ebd5-3141-552a-a045-6c8e14751ee7
page-type-slug: finding
title: "Citation class filed thirty times"
domain-slug: domain/code-quality
---

# Claim

Thirty findings across twelve domains record one class: a citation in the code repo resolving to nothing. They arrive one instance at a time from seats emptying `dirty/`, each scoped honestly to its own source, each landing on a different domain owner who meets a local defect rather than the class. Two shapes among them will not be found the way the others were — a live ratchet keyed on quarantined paths, and a header naming a removed document by its title rather than by a path.

# Evidence

Measured rather than estimated. A search of `findings/` in the memory repo for the citation-resolves-to-nothing shape returns 30 documents under `agent-fleet`, `agent-harness`, `code-check`, `code-harness`, `code-quality`, `code-repo`, `handle-inbound`, `infra`, `instructions-harness`, `rhia`, `task` and `temper`.

Three carry counts of their own and are the ones to read first. 773 of 773 `docs/<name>.md` citations fail to resolve across 454 live source files. 375 tracked files cite a `CLAUDE.md` path where the only tracked `CLAUDE.md` left is a check fixture. And every one of the 123 entries in `prose-mechanism-restatement.ratchet.json` names a removed file, measured by a seat reading that ratchet — I confirmed 88 of those name a `CLAUDE.md` or `key-files.md` by parsing the file here.

The title-shaped class is the one no method so far reaches. A path has a shape to match; a title does not. Four instances came from one source — `_enforce_page_schema.ts`, `schema-guard-coverage.unit.test.ts`, `_enforce_page_coherence.ts`, `_enforce_declared_attributes.ts` — and twelve more files name "Property-Definition Coverage". `check-no-raw-page-versions-sql.ts:5` was repaired from a path into a bare title, moving an instance out of the findable class into this one.

Not measured: the title population. It means searching the code for each removed document's title, and that set is still draining, so a census today is wrong tomorrow. Derive it from `git log --diff-filter=D` over `dirty/` once the tree is empty.

Not judged: whether the repair is repointing, deletion, or a check refusing a citation that resolves in neither repo. Only the third stops the next author reopening it.
