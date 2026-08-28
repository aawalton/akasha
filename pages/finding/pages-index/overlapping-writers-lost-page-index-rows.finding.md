---
page-type-slug: finding
title: "Overlapping writers lost page index rows"
domain-slug: domain/pages-index
---

# Claim

Until 2026-08-28 the page index had no mutual exclusion over the rows it keeps, so any two writers whose work overlapped kept only one of the two. Rows for pages that stood in git went missing from the index, and a scan of those pages then answered from what was left rather than refusing.

There were two overlapping-writer shapes, not one. A rebuild read every page for about five seconds and then wrote what it had read over the whole index, so every landing that arrived during that read was erased by the write that followed it. Separately, two landings arriving close together each read `pages.jsonl` whole, changed their own rows, and wrote the whole file back, so the second write dropped the first landing's rows whatever pages the two had in common — which could be none.

Nothing detected either case. A landing printed a line and reported success; the commit stood in git; the index went on describing a tree that had moved. The only sign was a row that was wrong until something else happened to land on the same page or a rebuild happened to run.

# Evidence

Both shapes were caught in the live index before anything was changed.

Five pages landing between 18:39:28 and 18:39:33 were absent from the index afterwards; the band matches the read phase of a rebuild running at the time, measured at 4.885s against a write phase of about 2s. Four of the five were still wrong when found, and were cleared later by an unrelated rebuild at 19:09:51 rather than by any repair.

`agent/subagent/thea--a15b6a078d8b5f7fb.subagent.md` landed at 19:32:03 and was absent from the index with no rebuild running at all. That is the landing-against-landing shape, and it is the one that showed the fault was not only in the rebuild.

Both were then reproduced on demand. A harness landing two pages concurrently through `landFiles` lost one of the two every run before the change and kept both after it. A harness landing a page while a rebuild walked lost the page when the landing fell inside the walk, and kept it at walk offsets of 100, 200, 300 and 500ms after the change; `pages.jsonl` was absent in 0 of N samples on every run.

The repair is `b4eeb9b14` (a landing that cannot update the index refuses rather than printing), `73f754517` (the index lock, covering `loadPages` to `keepPages` for every landing), `9e2fec304` (an 8s per-call budget on that lock, and ENOENT tolerance for readers running unlocked), `4ccfea56e` (the rebuild settles differentially under the lock and applies what landed during its walk, so `emptyIndex` is gone), `5462127af` and `d12f611d1` (the lock hold cut from about 1150ms to about 590ms).

Held under the lock, a landing holds it for 154 to 247ms across roughly 80 observed holds under live traffic. A dead holder does not wedge the fleet: a waiter breaks the lock and says so on stderr. A timeout refuses rather than proceeding unlocked.

Not measured: how many rows were lost before 2026-08-28. The loss leaves no trace of itself, so the only evidence is rows found missing at the moment someone looked, and nothing counts what a rebuild silently repaired.
