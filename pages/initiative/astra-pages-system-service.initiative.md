---
id: 01a045eb-de54-7000-ad40-b14b04a693fb
page-type-slug: initiative
slug: astra-pages-system-service
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- Every write originating off the workstation goes through the pages system service.
- There is one path into page storage, and no writer reaches the store beneath it.
- Every write is admitted by one rule, decided by the page being written and who is writing it, never by which route the write arrived on or which fields it happens to name.
- Every write the service accepts carries who made it, and a write naming nobody is refused rather than recorded.
- No write the service accepts leaves a row pointing at a page held by somebody else, whatever field carries the reference.

# Notes

Opened 2026-08-27 on Alan's ruling that off-workstation reads and writes go through a successor to the page query service. The read half is closed; the write half is open and its shape is Alan's.

**There is no read service to build.** Each pod's init container clones akasha, so `pages/` stands on its own filesystem and reads come off it. That becomes true for each app at its next deploy, and redeploying six user-facing apps is Alan's call. The read half is not deferred or blocked; it is not wanted.

**What holds `@shared/pages-query` in place is the core, not a service.** The in-process repoint at `tools/lib/page-query-client.ts:81` landed on Alan's ruling: "you can repoint for now, and then we can migrate onto the new clean core once it can support the case." Migration is blocked by `pages-system/query/`'s `Query` lacking `offset`, `count-by` and an object `where` — `sort-by`, `descending`, `limit`, `function` and `target` have since landed — and closing that gap belongs to the core. A caller still on that package reaches the dead port, resolving the cluster origin as a constant.

**The predecessor was never cluster-resident.** It was a workstation service wearing a cluster alias that `ops service install` composes at `tools/lib/service-cluster-reach.ts:33-79`. Off-workstation page access has always meant the cluster phoning the workstation over HTTP, so cluster reach is not a thing a write service has to invent. What is built here must not become the third alias left standing and advertising ready.

**The intents above came off four findings that closed unfixed** when their Postgres substrate was deleted under them: `cross-owner-relation-writes-unguarded`, `unattributed-write-clears-user-content`, `owner-guard-misses-unset-writes` and `raw-sql-upsert-bypasses-owner-guard`. Four sightings of one failure: the guard sat on a route, a layer or a payload field rather than on the store, so a write by another door, or omitting that field, was admitted unchecked. Two riders stand outside that unity — that a writer may write is not a record that they did, and admitting a write says nothing about whether what it says is sound.

**The referential rule wants measuring before its form is chosen, and that was never done.** Enumerate the cross-owner references that exist, then choose between universal, universal-with-exemptions and opt-in. The one measurement taken says universal is nearly free: 975 references across four tenant relations, cross-owner rows in exactly one of them, 12 of 22 on `temper-task.character` and every one of those the incident, 953 clean across the other three.

**Held by somebody else does not mean held by another name.** The rule as proposed exempted a sentinel holder standing for a page the system shares. Name whatever plays that part before building the rule, or a rule with no carve-out refuses legitimate writes. A test naming no path is a false global claim: every test of these intents names the path it holds.

**One of the four is live today, unchanged in shape.** The writer beneath the guarded layer was raw SQL then; it is `tools/lib/page-rows-write.ts` now, outside the layer this service is built on, appending straight to disk through `appendFileSync`, with owner and actor and writer appearing nowhere in it.

**Per-row ownership must not be carried forward.** No domain page names an owner or a user id, so a property phrased as cross-owner has nothing to bind to on a file-backed page. **Whether a sidecar is recoverable the way git makes a file recoverable is open, and it is the question that matters** — ownership concentrates in rows rather than disappearing, the one measured incident being twelve of Alan's rows pointed at a throwaway account's pages within a minute, invisibly and unrecoverably. The referential intent is worth more here than the other three.

**Two of the store's answers cannot cross a wire, and that is the sharpest constraint on the design.** `rowsIn` at `pages-system/read/rows.ts:116` and `rowPagesIn` at `read/row-pages.ts:112` return lazy iterables giving a fresh walk on each `[Symbol.iterator]`, because `log-line`'s 3.6M rows cost 6,924 MB materialised. A call and its answer cannot express that, so whatever is proposed says what it does about rows first.

**The open question is the write path's shape, and it is Alan's.** Does a remote write run the akasha gates against this workstation's live tree and commit here, accepting one contended lock and a single point of failure for every product write, or do product writes go to sidecar rows on a path that is not `ops write` at all? `pages-system/` does no I/O and `read/` reads and does not write, so there is no write seam beneath this to build on.

**A successor that answers a reachability failure as an empty result, or that goes away leaving something still claiming to be ready, repeats what made the predecessor worth deleting.**
