---
id: eee6b41b-7b0f-5139-b486-3e030d5fba5a
slug: command-domains-doubled-the-vocabulary
page-type-slug: finding
title: "Command domains doubled the vocabulary"
domain-slug: domain/domain-system
---

# Claim

Moving the ops verbs has nearly doubled the domain vocabulary, and 45% of it is now command documents that no seat can ever be bound to.

# Evidence

Measured on the live tree, 2026-08-13, part-way through the migration:

- 1,128 documents declare `domain-slug:`.
- 511 of them stand under `domains/commands/`, one per ops verb.
- So the vocabulary was 617 before this migration and is 45% command documents now, with roughly fifty verbs still to land.

A command domain is not a kind a seat is bound to. No seat is spawned with domain `ops-chess-evaluate`. They exist to be the inventory of commands and to carry each verb's Definition.

Anything enumerating `declared.domain` therefore does roughly twice the work it did, for names that cannot be minted.

The first place this showed is `tools/tests/read-seat-name.test.ts`, whose slowest test is a triple cross product over persona x domain x role. At 41 personas and 14 roles that is 42 x 1128 x 14 = 663,264 compositions, against 362,796 before the migration — an 83% rise, and still climbing.

That test fails on a 5,000ms per-test timeout rather than on a wrong answer. flex-44 proved it pre-existing at `1398588a1~1`, failing identically at 5,136ms. It passes alone at 5.5s for the file and tips over only when several seats run suites at once. Three seats reported it independently as noise in their runs, each having to establish for itself that it was not their doing.

The test is not the finding. The finding is that the domain vocabulary doubled and the cross product is the first thing to notice, so whatever else enumerates domains has the same rise and has not been looked at.

Not repaired. Narrowing what the test walks would change what it covers, and which domains are seat-bindable is not settled anywhere — that is the decision underneath this, and it is unmade rather than made and forgotten.
