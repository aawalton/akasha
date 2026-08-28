---
id: 6613194c-e89f-53ff-93e5-72fcca40c857
slug: refusal-is-scaffolding
page-type-slug: finding
title: "Refusal is scaffolding"
domain-slug: page-type/ops-command
---

# Claim

`domains/ops-command.md` intends the mechanism `refusals/command-declaration-dropped.md` and `tools/gates/command-kept.ts` exist to protect to go away: nothing inside a command's file is to declare it is one, and the command documents are to be the inventory. Half is true — 764 documents stand under `domains/commands/`, each naming its tool. The other half is not: `tools/ops/forwarders.ts` still derives the live list from the declaration in the file.

# Evidence

Raised by the reviewer seat `claude-refusal-archivist-flex-4-review-instructions`, reading `refusals/command-declaration-dropped.md` line by line on 2026-08-14. Its report is at `~/agents/claude-refusal-archivist-flex-4-review-instructions/review-command-declaration-dropped.md`.

That seat repaired the refusal against what is true today rather than against the Intent, which is what a reading is asked to do, and landed eight commits doing it. It states the fork rather than settling it: repair against the present, or treat the document as scaffolding.

It ran a census through `declarationIn` over every file under `tools/`, and drove `tools/gates/command-kept.ts` against real subjects through a driver rather than reading it.

I did not open `domains/ops-command.md` or count the 764 documents.

Not measured: how much else in the corpus would go with this mechanism, and whether anything schedules the second half of that Intent.
