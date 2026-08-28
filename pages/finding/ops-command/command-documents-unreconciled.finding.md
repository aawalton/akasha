---
id: 93249ed6-489f-54af-b2d1-a0c8a0f02417
slug: command-documents-unreconciled
page-type-slug: finding
title: "Command documents unreconciled"
domain-slug: page-type/ops-command
---

# Claim

Nothing checks the command documents against the set of files that actually declare a command. A dropped declaration would leave its command document standing and orphaned — `domains/commands/ops-instructions-glossary.md` would still say the verb exists — and the gate that refuses the dropped declaration is the only site naming it, so it reports nothing about the document left behind.

# Evidence

Raised by the reviewer seat `claude-refusal-archivist-flex-4-review-instructions` on 2026-08-14, while reading `refusals/command-declaration-dropped.md`. Its report is at `~/agents/claude-refusal-archivist-flex-4-review-instructions/review-command-declaration-dropped.md`.

It found this while establishing what the gate does reach: `tools/gates/command-kept.ts` is the only site naming the refusal's slug, and it drove that gate against real subjects — a stripped declaration on a live tool fails and prints the document filled, the body as it stands passes, a non-command file is not-applicable.

I did not search for a check over the two sets myself, and an absence found by one seat's search is the claim most sensitive to how narrowly the search was drawn.

Not measured: whether any command document is orphaned today. The claim is about what nothing would catch, not about a state observed.
