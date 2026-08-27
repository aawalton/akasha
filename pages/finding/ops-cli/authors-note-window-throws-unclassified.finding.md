---
id: 6214a60c-1e12-50cd-b80a-539da61ffccd
page-type-slug: finding
title: "Authors note window throws unclassified"
domain-slug: domain/ops-cli
---

# Claim

`ops awen authors-note-window` throws a bare `Error` when a chapter has no page, so the dispatcher classifies a data condition as exit 70 — an unhandled defect — where every neighbouring verb reaches for `dataError` and exit 2.

# Evidence

`tools/commands/awen/authors-note-window.ts:117` throws `new Error(...)` for a chapter carrying no page. The dispatcher has no classification for a bare `Error`, so it falls to exit 70, whose declared meaning across every `ops` verb is "unclassified error: the verb threw something the CLI could not classify, so nothing is established about what went wrong — not a caller mistake, and not a failure this verb knows how to have. An unhandled defect."

A chapter with no page is none of those things. It is a data condition the verb knows how to have and can describe, which is what `dataError` and exit 2 are for, and what the neighbouring verbs under `tools/commands/awen/` use for the same shape of condition.

The cost is not the wrong number. Exit 70 is the code an operator is told establishes nothing, so a caller meeting it is directed away from the input and toward a defect hunt. It also puts a routine data condition into whatever population counts unclassified failures, where it reads as the CLI having thrown something nobody understands.

Found while porting `packages/alanwalton/awen/ingest/src/authors-note-window.unit.test.ts` into this repository under 19040's blocking set. The port deliberately asserts "refuses and writes no window" rather than pinning the exit code, so nothing standing here cements the current behaviour and the repair costs no test change.

This is not filed against 19011 or 19014 and should not be repaired inside their tree. 19011's third objective is that every verb answers exactly as it does today, and an exit code is an answer — a deliberate behaviour change inside the one tree whose whole claim is that nothing changed is the kind of thing that makes a clean comparison unreadable afterwards. It wants its own commit, where it can be seen for what it is.
