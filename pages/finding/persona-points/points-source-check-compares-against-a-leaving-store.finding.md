---
id: 7bfa3c8a-c9b7-522e-9b26-179de37a3802
slug: points-source-check-compares-against-a-leaving-store
page-type-slug: finding
title: "The points-source check compares against a store that is leaving"
domain-slug: domain/persona-points
---

# Claim

`ops persona points-source check` reads a deleted package and compares persona documents against persona rows, so it refuses to run at all and its comparison has lost one of its two sides.

# Evidence

Measured 2026-08-19, finishing `personas-backed-by-files`.

The command exits 70 before doing anything: `tools/commands/persona/points-source/check.ts:9` names `@shared/instructions-corpus`, which was deleted from the code repository at `32f9a49eb3`. `code-paths-resolve` reports it as one of three references standing nowhere. It has been broken since that commit and nothing else reported it.

Its stated job is to "read every persona's points-source document against her persona row and report every disagreement about her green day points". That premise is gone. Her green day points now stand in her own document, her source rule stands in `domains/persona-points-sources/<her>-points-source.md`, and the row keys are the copy waiting to be deleted. The document is no longer being checked against an authority; it is being checked against its own shadow.

The check still has a job on the file side, and it is the one the old comparison was really doing: a points-source document says "5,000 of them is a green day" in prose, and `green-day-points: 5000` stands in the persona's frontmatter, and nothing holds those two together. Both sides are now files this command can read directly, `ops` running on the workstation.

Its sibling `ops persona points-source apply` was removed rather than repaired: it corrected persona rows to match documents, and with the recipe leaving the row it had no work left.

Not measured: whether the prose and the frontmatter currently agree for all 40 personas. The check has not run since the package went.
