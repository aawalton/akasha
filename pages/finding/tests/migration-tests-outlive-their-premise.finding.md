---
id: faa389d6-1099-5c86-80eb-d9579f92f458
slug: migration-tests-outlive-their-premise
page-type-slug: finding
title: "Migration tests outlive their premise"
domain-slug: domain/global
---

# Claim

The test proving `read-the-schema` levies both registries rather than one is pinned to `finding`, a kind that has both only until its typed schema retires. Completing that migration makes the test's own premise false, and it fails rather than reporting that it has nothing left to measure. Every case naming a mid-migration kind by name has the same horizon.

# Evidence

Measured on 2026-08-13 by applying the `finding` schema retirement inside a copy of the repository under `/var/tmp` and running the whole suite against it.

```
(fail) a path both registries specify, which every kind mid-migration is > owes the typed schema and the page type, a fallback dropping whichever it did not pick
 6181 pass, 3 fail
```

The other two failures in that run are artifacts of the copy rather than of the retirement: `read-seat-name.test.ts` and `bridge-calls-fit.test.ts` both read live state, and both pass against the live repository, 41 pass and 0 fail.

The case asserts the gate names `tools/document/schemas/finding.ts` and `page-types/finding.md` together. Retire the first and only one specification remains, so the union has nothing to be a union of. The gate is still correct — it accumulates whatever specifies the path — but the case can no longer show it.

`theme` is the only other kind carrying both today, so repointing there buys one migration. `tools/tests/repo-agrees.test.ts` carries the same horizon from the other side and its author recorded it: its two `findings/role/x.md` cases resolve through the typed arm today and will start resolving through the page-type arm with no edit, so they will stop testing the typed arm without anything saying so.

The durable shape is a fixture declaring both a typed schema and a page type over one path, which `tools/tests/corpus.ts` already supports through `installPages` and which no case reaching for a live kind by name can have.
