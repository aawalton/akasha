---
page-type-slug: finding
id: 8974b285-a521-5ee1-8e6e-84505b62a4db
title: "Three seat-stated snapshot tests assert a reading chain the corpus no longer prints"
domain-slug: page-type/seat
---

# Claim

Three snapshot tests in `tools/tests/seat-stated.on-demand.test.ts` fail against a corpus where domain pages stand under `pages/domain/`. All three compare `statedLines` byte-for-byte against a literal expected list, and the reading chain those lines print has changed underneath them.

# Evidence

`bun test tools/tests/seat-stated.on-demand.test.ts` fails 3 of its tests. The received lines carry seven chain entries the expected list does not — `pages/domain/domain-principle.md`, `pages/domain/domain-rule.md`, `page-types/domain.md`, `pages/domain/domain-directive.md`, `pages/domain/domain-dictionary.md`, `pages/domain/domain-shape.md` and `pages/domain/domain-system.md` — and two further lines, `errand — none stated` and `account aawalton`.

The failing assertions are on `statedLines`, which reads a seat's stated attributes and the reading chain behind each. Nothing in the turn-state or turn-pending path reaches it.

The commits that moved these pages are `1f387e9a5` (domain pages stand under pages/domain), `f51125675` (task pages) and `c78a6443a` (persona pages), with `6bb8d1e64` renaming tokens across four files.

A snapshot of a reading chain changes whenever the corpus's parentage does, so this assertion breaks while nothing is wrong.
