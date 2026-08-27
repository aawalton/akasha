---
id: 8fd7ddb2-91f3-5515-aa55-ebb6a374712f
page-type-slug: finding
title: "Stamp survives a small rewrite"
domain-slug: domain/global
---

# Claim

A `reviewed-at:` stamp goes on attesting to a body that has since been rewritten, where the rewrite moved fewer characters than the staleness threshold. A path rename is the shape that does this: tiny in characters, total in meaning, and the exact fault a reading is run to catch.

# Evidence

`refusals/hook-unprobed.md` on 2026-08-11. A reviewer read it, repaired the path it named to `tools/lib/hook-probe.ts`, and stamped `reviewed-at: 2026-08-10`. At 05:00:32 the next day, `5aba2348b` rewrote that body to name three files instead — the probe file had been split into `hook-probes-typescript.ts`, `hook-probes-shell.ts` and `hook-probes-artifact.ts`. The stamp did not move.

`tools/stale-reviews.ts` measures characters moved since the commit that wrote the record, against a threshold of 1000, and does not name this document. Its own help says why time cannot be the measure — a sweep adding one frontmatter key dates a hundred files today and moves nothing a reader would recognise. The converse is what this finding is: a rewrite that moves almost nothing and changes what the document says.

The document is currently correct, so nothing is wrong with the corpus today. What is wrong is the record: it reports a reading of text that is no longer there, and reports it in the direction that hides work rather than inventing it. Nothing distinguishes that from a document genuinely read as it stands.

Both halves of the pair matter and neither is reachable from the other. The reviewer's repair was superseded by a hand that had no reason to know a reading had happened; the stamp survived a hand that had no reason to know a stamp was there.
