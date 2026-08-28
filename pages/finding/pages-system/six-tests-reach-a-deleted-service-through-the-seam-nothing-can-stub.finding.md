---
id: 01a046df-f3c4-7000-8ba0-b18712b0b141
slug: six-tests-reach-a-deleted-service-through-the-seam-nothing-can-stub
page-type-slug: finding
title: "Six tests reach a deleted service through the seam nothing can stub"
domain-slug: domain/pages-system
---

# Claim

Six tests in `shared/pages-access/src/file-view-relation.unit.test.ts` fail, every one of them by reaching for the page query service, which has been deleted and is not coming back. They are not careless about it: each hands the code under test a complete in-memory world and stubs the query seam. They escape through the one seam that has no injection point — the page type shape — and the refusal they then meet is the code behaving correctly. This is not a flake and not a defect in the tests. It is a set of tests pinned to a substrate that has been removed, and the decision is whether they follow the service to its successor's contract or die with it.

# Evidence

Measured 2026-08-27 in akasha at `55f4b4750`. Nothing here was touched.

**The six**, declared with `it(` under two describes at lines 144 and 203 of `shared/pages-access/src/file-view-relation.unit.test.ts`:

Under `a view whose page type is file-backed` —

- `draws its pages from files rather than from the rpc`
- `yields every page exactly once where the page size does not divide the population`
- `narrows by a filter the way the rpc does`
- `finds its page type by id where the view names no slug`

Under `a relation read against files` —

- `builds a page of the holder's own type from each row the service named`
- `honours a limit that stops short of what the service named`

**The origin they reach.** `http://page-query-service.page-query-service.svc.cluster.local:8787`, the constant `PAGE_QUERY_ORIGIN` at `shared/pages-query/src/index.ts:7-8`. It is an in-cluster DNS name, unreachable from a workstation, and each of the six spends about two seconds failing to connect.

**How they escape a world built to contain them.** All six pass their own dependencies — `serving(world(37))`, `serving(world(1573))`, and so on — so the page corpus and the composed query are already in memory, and `file-property-defs.ts:12-14` defines `FileAsk` and `LIVE_ASK` precisely so that seam can be replaced. The shape lookup has no such seam: `read()` at `shared/pages-access/src/file-property-defs.ts:32-38` calls `askShape(pageTypeSlug)` against the live origin with nothing to substitute, and `shapeAsked` memoises it. A test can hand in a whole world and still cannot say what shape `task` has.

**The refusal is right.** `read()` throws rather than returning an empty declaration list, and says why: an empty list `would read as a page type that declares nothing`. That is the pages-system rule about refusing where you cannot answer, kept. The failures are the correct behaviour of the code meeting a service that is gone; nothing here would be improved by making the read quieter.

**What the numbers are.** Naming the tests that cover this package gives 407 tests across 32 files, 401 pass and 6 fail. `ops tests run pages-system` reports 1,084 pass and 0 fail across 17 files and does not reach this package at all — those 17 files are under `pages-system/`, a different tree — so a green run there says nothing about these six either way.

**What the decision turns on.** These six are, so far as this reading found, the only executable statement of what a file-backed view and a file-backed relation read must do: paging that yields every page exactly once where the page size does not divide the population, a filter narrowing the way the rpc did, a page type found by id where the view names no slug. Under Ablation the old version is the only record of what the new must do, which argues for moving them onto the successor's contract rather than deleting them. Against that, they cannot be made to pass where they stand without an injection point at the shape seam that does not exist, and a permanently red test is one nobody reads. Either way the same seam is the obstacle, so whichever way this goes, `file-property-defs.ts:32-38` is where the work lands.
