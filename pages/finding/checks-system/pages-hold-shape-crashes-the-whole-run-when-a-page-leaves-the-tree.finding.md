---
id: 33ff83c9-62e3-5fe6-9997-0674ed839f5d
page-type-slug: finding
title: "pages-hold-shape crashes the whole run when a page leaves the tree"
domain-slug: domain/checks-system
---

# Claim

`tools/audits/pages-hold-shape.ts:58` reads a claimed page without guarding against the page having gone. A file deleted between the scan that listed it and the read that opens it throws `ENOENT` out of the check, ends the run at exit 1, and takes down every check batched behind it in the same invocation — those checks report nothing at all, which reads as if they were never asked for rather than as if they were cut off.

The guard for exactly this stands ten lines away in a sibling file. `tools/audits/pages-hold-properties.ts:52-58` wraps the identical `repo.read(relPath)` in try/catch and records `claims it and it left the tree while this ran`.

With a fleet of seats committing continuously, a page vanishing mid-scan is ordinary rather than exceptional.

# Evidence

Observed three times on 2026-08-28 between 04:05 and 04:16, on two different pages, without being sought.

Twice on `agent/subagent/astra--ad29e7fda141f0011.subagent.md`, deleted by another seat's commit while the check was running. The stack was `pagesHoldShape (tools/audits/pages-hold-shape.ts:58)` from `runChecks (tools/run-checks.ts:197)`, exit 1. Both runs were `bun tools/run-checks.ts` over six checks; on each the four batched after `pages-hold-shape` — `domain-edges`, `property-types-bind`, `pages-named-as-stated`, `links-resolve` — produced no verdict, and the operator had to re-run them separately to learn anything.

Once more on `agent/subagent/astra--a9bb5d77791b4c3fe.subagent.md`, caught by a hand-written reader of the same page list that does carry the guard, which reported the page gone and carried on over the remaining 59,081.

The window is between the scan and the read, not a stale index. Neither page was in the page index at the time of the crash; `claimedPages` had reached both by disk scan.

The two checks share `claimedPages` from `tools/audits/pages-hold-shape.ts` and differ only in the guard, so a page that leaves the tree mid-run is a fault in one and a recorded line in the other over the same list.

Not measured: how often this fires across a day, and whether any check other than `pages-hold-shape` reads a scanned path unguarded. Three occurrences in about forty minutes of one session is the whole sample.
