---
id: ecd2a9f8-868a-531c-8e00-6373d87b689b
slug: directory-rule-stated-twice
page-type-slug: finding
title: "Directory rule stated twice"
domain-slug: domain/global
---

# Claim

The rule mapping a directory to a seat axis is stated twice in live code, and the two are free to disagree.

# Evidence

`tools/lib/seat-resolve.ts` holds the mapping in `DIRECTORY`. `tools/lib/identity-vocabulary.ts` states it a second time, keying the role, persona and task axes on `relPath.startsWith("roles/")` and its two siblings.

On 2026-08-05 the nesting of every `domain-slug:` document under `domains/` moved those directories. `DIRECTORY` was narrowed with the rest of the sweep; the copy in `identity-vocabulary.ts` was not, because no schema claim and no entry in `DIRECTORY` reaches it. `bun test tools/` went to 62 failing tests on main and the sweeping seat repaired it at `f826f260`.

Two further sites open `${root}/personas/${persona}.md` directly and broke the same way: `tools/lib/compose-seat-name.ts` and `tools/lib/seat-name.ts`.

Reported by the seat that ran the sweep, which named the duplication as worth a finding and declined to file one inside its own pass. The duplication and the three sites are its reading; that `bun test tools/` is green on main now is mine, run after `f826f260`.
