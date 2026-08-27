---
id: cbc4cdd1-15ee-553e-9958-4ab3468d4f11
slug: declaration-outruns-evidence
page-type-slug: finding
title: "Declaration outruns evidence"
domain-slug: page-type/domain
---

# Claim

A domain declared from a count of a word's occurrences, rather than from an inventory of its senses, can contradict the Rules that use the word — and every gate passes, because no check reads a Definition against the prose depending on it.

# Evidence

`pages/domain/land.domain.md` was declared on 2026-08-06 as "a change joining `main` through the merge queue", from evidence that counted the word across the corpus without separating its senses. Every gate passed, and `run-checks` reported nothing.

`domains/jargon.md` states that a word declared as a domain carries that one sense on every document using it. Against that, the declaration contradicted three Rules from the moment it landed:

- `domains/agent-harness.md:48`, Composed Outside — "Compose every body outside the repo it lands in and put it through the command that gates it."
- `domains/role.md:68`, Adjacent Repair — "Land the repair you find, whoever owns the document it sits on."
- `domains/role.md:74`, Horizontal Change — "Land a change that spans the instructions repo yourself, in one pass, rather than dispatching it."

All three concern the instructions repo, which has no merge queue and no `main` to join, so their binding condition could not be met. Six Rules use the word and the declaration reached two. Eight of nine Definition bullets carrying `land` used a sense outside it. `tools/lib/verb.ts` exports `land`, `Landing` and `landRename` to eight modules — this repo's own write path, named for the ruled-out sense.

A sense inventory run afterwards found it, and only because Alan asked whether one had been run. The checks measure a document against its schema and its links; none reads a Definition against the prose depending on the word.

A second instance was caught before landing the same day. `wake` was proposed as "a stopped seat starting again" from an inventory that enumerated eleven senses and never asked what else already named them. `ops seat revive` held that act, with a CLI verb and a persisted `revived_at` column.
