---
id: 4b6dc06b-10f8-5f8b-b08f-829576bb09e2
slug: vocabulary-rebuilt-per-run
page-type-slug: finding
title: "Vocabulary rebuilt per run"
domain-slug: domain/global
---

# Claim

The `words-read` gate rebuilds the whole instructions vocabulary from disk on every run, so its cost rises with the corpus and it recently crossed the ceiling it was held to. Raising that ceiling could not be landed through the gate, because the file carrying the constant is itself gated by it — the fix was refused by the thing it fixes.

# Evidence

Measured 2026-08-15, over about thirty runs of `edit.ts`, `write.ts` and `file-finding.ts` across both repositories.

`tools/gates/words-read.ts` calls `vocabularyOf(root)` on every invocation. That function globs every markdown file under the repository root, reads each one and parses its front matter, with no cache anywhere in the path — about 2,900 files. The gate runs once per file in a write, so a five-file change rebuilds the whole vocabulary five times.

What it measured through the evening, against the 0.50 second ceiling then standing: 0.19 to 0.44 on small documents, 0.51 to 0.59 on files with a large vocabulary reach. Readings on one payload rose from 0.53 to 0.59 across the session as documents were added. Every file now reports about 1,250 words within reach.

The deadlock. `GATE_CEILING_MS` stands in `tools/run-gates.ts`, which the gate set judges like any other file. Eight consecutive attempts to raise it were refused by `band` for `words-read` at 0.57 to 0.59, and the finding recording this was refused four times for the same reason. Alan authorised a shell write outside the gate, and the constant was handed back through `write.ts` afterwards, which is how it landed.

Nothing else was over. Every other gate passed on every run, the whole run measured 0.60 to 0.74 seconds of CPU against a 10.00 ceiling, and the clock stayed under 1.00 against 5.00. One gate against one of its own ceilings closed both repositories to one seat.

Not measured: whether the runtime tracks file count, total bytes, or vocabulary reach. The three moved together as the corpus grew and nothing separated them. Not measured either: how many other files sit above the old ceiling — two were met by accident and no sweep was run.
