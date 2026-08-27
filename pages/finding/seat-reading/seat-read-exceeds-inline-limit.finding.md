---
id: 2b9cc172-9afd-5419-b08a-7b0c8b006278
page-type-slug: finding
title: "A seat read too large to inline is recorded as read though its text never arrives"
domain-slug: domain/seat-reading
---

# Claim

A seat read whose documents exceed the harness's inline tool-output limit is recorded
as read while its text never reaches the agent. The record and the context disagree,
and nothing reports it: the gate is satisfied, the seat acts, and what it was required
to have read sits in a file it never opened.

`seat-reading` says one read returns every document a seat must have read. It returns
them to stdout. Whether they arrive is a question nothing asks.

# Evidence

Observed twice on 2026-08-22 in seat `ryn`, both times through the harness's Bash tool:

- `bun tools/read.ts --seat` for a seat with 13 required documents returned 55,652
  bytes. The harness wrote it to a tool-results file and showed the first 2 KB. The
  read record at `~/.instruction-reads/<agent>.json` was written in full, and the
  `hold-seat` refusal cleared.
- `bun tools/read.ts --file-path pages/domain/context-warrant-domain.md --full` for a
  12-line file returned 34.8 KB, because `--file-path` also delivers the 24 documents
  required for that path. Same outcome.

Not measured: the exact byte threshold at which the harness persists rather than
inlines; whether the native `Read` tool has the same ceiling; whether any seat has
acted on documents it was credited with but never received. The first two are
answerable; the third would need the transcripts.
