---
id: aa6f017d-4a3f-59c5-98a5-9a326c491c28
page-type-slug: finding
title: "Books verbs print a progress line no help block declares"
domain-slug: domain/ops-cli
---

# Claim

`ops books seed` and `ops books word-count` each write a progress line to stderr that neither help block mentions — `Seeding the book page type…` and `Recomputing book word counts…`. Both help blocks describe only what reaches stdout, and both lines are printed under `--json` as well, so a caller told it is getting a JSON envelope also gets prose it was never told about.

# Evidence

Measured 2026-08-13 while moving the `books` namespace under `domains/tasks/ops/move-command-bodies.md`, landed at c5a9589ca. The lines were carried across unchanged; this records the surface, not a change to it.

What the help blocks say. `ops books seed` declares "Idempotent get-or-create: re-running creates only what is missing" and one flag, `--json`, "Emit a JSON envelope instead of TSV lines". `ops books word-count` declares the recount and the same flag. Neither names stderr, and neither `exits` list mentions output at all.

What the runs produced. Four invocations captured against the live database before any change: `ops books seed` and `ops books seed --json` each wrote 30 bytes to stderr alongside 85 and 97 bytes of stdout; `ops books word-count` and `ops books word-count --json` each wrote 32 bytes to stderr alongside 202 and 732 bytes of stdout. The stderr byte count does not move between the TSV and JSON arms, because the `console.error` stands before the branch that picks between them.

The two siblings that do not do this. `ops litrpg seed` runs the same shape of idempotent ensure and writes nothing to stderr; `ops litrpg next` and `ops litrpg now-reading` likewise. So within the four namespaces moved together, the progress line is the `books` pair's habit rather than a convention.

Not measured: whether any caller redirects these verbs' stderr, or whether the right repair is to declare the line or to drop it. Changing it while moving the body was refused — a repair made there cannot be told from the move.
