---
id: a74853c1-f600-5ab7-9196-23148508602f
slug: enumerated-kinds-uncompared
page-type-slug: finding
title: "Enumerated kinds uncompared"
domain-slug: page-type/domain
---

# Claim

A domain enumerating its child kinds in prose holds a hand-written copy of a set the corpus already composes, and nothing compares the two. `domains/seat-assignment.md` named its fourth kind `project-seq`, a spelling no document declares, while `bun tools/glossary.ts --domain seat-assignment` composes `seat-assignment-project`. The drift stood in a live document until a reading happened to reach that line.

# Evidence

Repaired at commit `c953d44ec` by a dispatched reading of `domains/seat-assignment.md` on 2026-08-08, which reported the old spelling standing on that line and nowhere else under `domains/`, and reported that none of the checks compares a parent's enumerated kinds against the children the corpus composes.

Verified here: `tools/checks/` holds nineteen checks, of which `domain-edges.ts` and `terms-in-reach.ts` are the two whose text mentions domain edges, glossary or parents.

Not measured: I did not read those two checks line by line, so what they do cover is taken from the reading rather than from their code. Whether an instrument is owed at all is untouched — the enumeration itself earns its place, a seat booted into this domain getting the ancestors and no child.
