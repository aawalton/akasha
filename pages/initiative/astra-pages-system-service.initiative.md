---
id: 01a045eb-de54-7000-ad40-b14b04a693fb
page-type-slug: initiative
slug: astra-pages-system-service
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- Every read and every write originating off the workstation goes through the pages system service.
- There is one path into page storage, and no writer reaches the store beneath it.
- Every write is admitted by one rule, decided by the page being written and who is writing it, never by which route the write arrived on or which fields it happens to name.
- Every write the service accepts carries who made it, and a write naming nobody is refused rather than recorded.
- No write the service accepts leaves a row pointing at a page held by somebody else, whatever field carries the reference.

# Notes

Opened 2026-08-27 as a placeholder, on Alan's ruling: off-workstation reads and writes go through a pages system service, which is not the page query service but its successor. Nothing is being built here yet. Intents past the first are settled with him one at a time.

**Two files wait on this service.** `services/daily-tracking-points.ts:41` and `services/great-courses-sync.ts:38` each set `PAGE_QUERY_ORIGIN` from `pageQueryOrigin()` so that `@shared/pages-query`, the off-workstation HTTP package, has somewhere to reach. Nothing answers on that origin. They are the first real customers here.

**Every other caller was repointed in process at `58e35244e`**, on Alan's ruling: "you can repoint for now, and then we can migrate onto the new clean core once it can support the case." `tools/lib/page-query-client.ts` keeps its export surface and answers through `page-query-answer.ts` and `page-query-landing.ts` rather than over HTTP. That is an interim with a stated end, not a resting place.

**The page query service is gone, not down.** `pages/workstation-service/page-query-service.workstation-service.md` was deleted at `620c77034` and `7411bbd8c`, taking `port: 8787` with it. `pageQueryOrigin()` at `tools/lib/page-query-client.ts:40-44` now answers the stated environment variable and refuses plainly otherwise, so a caller fails where it is rather than reaching a dead port.

**`tools/lib/daily-tracking/tracking-modules.ts` cannot be edited a little.** It forwards thirteen names it does not declare, and `export-declared-here` judges a changed file whole rather than by its changed lines — a byte-identical copy with one comment appended at the end is still refused. So the first write to that file dissolves the barrel, across the seventeen files under `tools/lib/daily-tracking/` that take a forwarded name.

**Three packages reach `@shared/pages-query` with no asker to hand in.** `collections/exercises/src/pages/access.ts:94`, `alanwalton/health-samples-access/src/select.ts:1` and `alanwalton/health-samples-day/src/wake-day.ts:1` each call `askComposed` at the point of use, so a caller cannot route them anywhere. `shared/pages-access/src/{file-read,file-write,file-property-defs,file-write-backing,file-relation}.ts` reach it the same way, under `upsertPage`. A workstation run of `services/daily-tracking-points.ts` goes through all four.

**Where an asker is already taken, the in-process one satisfies it.** `readouts/ask-here.ts` answers off the checkouts on this machine through `page-query-answer.ts`, and is a `readouts/readout-resolver.ts` `Ask`. `readouts/session-readings.ts` `readSessionPages(ask?)`, `readouts/activity-reading.ts` `cardioReading(day, span, readSamples)` and `readouts/stoplight-mean-points.ts` `readStoplightMeanForDay({ ask })` each take one. Reaching those directly is what keeps `@shared/status-bar-access/readings` and `readouts/ask-over-http.ts` — both of which build an HTTP asker — out of a run that never leaves the workstation.

**Four intents above came off four findings that closed without being fixed**, their Postgres substrate having been deleted under them: `cross-owner-relation-writes-unguarded`, `unattributed-write-clears-user-content`, `owner-guard-misses-unset-writes` and `raw-sql-upsert-bypasses-owner-guard`. They are four sightings of one failure — the guard was attached to something other than the store, to a route or a layer or a field in the payload, so anything arriving by another door or omitting that field was admitted unchecked. Two riders do not follow from that unity and so stand on their own: knowing a writer may write does not record that they did, and admitting a write says nothing about whether what it says is sound.

**One of the four is live today, unchanged in shape.** A writer reaching the store beneath the guarded layer was raw SQL then; it is `tools/lib/page-rows-write.ts` now, outside the layer this service is being built on. Nothing about that one was repaired by the substrate going.

**What went with the substrate, and must not be carried forward.** Per-row ownership: no domain page names an owner or a user id anywhere, so a property phrased as cross-owner has nothing to bind to for a file-backed page. Row-level security as the thing that hid the harm: a wrong relation in a file shows up in a grep and a diff, where in the old world rows rendered blank and nobody saw it for a minute or a month. Opt-in versioning as the recovery story: git gives every file-backed page unconditional history. **Whether a sidecar is recoverable the same way is open, and it is the question that matters** — the file is not the whole page, and rows are where this bites.

**Ownership concentrates in rows rather than disappearing.** Data a product collects at runtime stays a row, and the one measured incident was a product's tenant data, not authored files: twelve of Alan's rows pointed at a throwaway account's pages within a minute, invisibly and unrecoverably. A file-backed answer does not reach that case, and this service is what stands in front of it for products. So the referential intent is worth more here than the other three, not less.

**Six web apps cannot read a property definition at all, and that is what the successor restores first.** `shared/pages-access/src/file-property-defs.ts` reaches `@shared/pages-query`, which resolves the cluster origin as a constant; that ClusterIP answers nothing, having no pods and no EndpointSlice behind it. Verified from inside a running pod: `wget: can't connect to remote host (10.100.134.88): Connection refused`. The call throws rather than returning stale or partial data, which is the better of the two failures but is still every property definition unreadable off the workstation.

**The old service was a hop, not an implementation.** `services/page-query-service.ts:9-23` imported `tools/lib/page-query.ts`, `page-query-answer.ts` and `page-query-landing.ts` — the same modules a command calls directly. The successor inherits no logic that lived only there.

**The successor holds no store of its own.** Alan's intent on the parent names the service inside the clean set — "`pages-system/` holds a clean, cohesive and comprehensive set of features answering everything callers need of the pages system, including indexing, caching, queries, and a cluster-reachable pages system service" — so the service is a skin over `pages-system/`, and this initiative has one job rather than two. A store reached only through the service would be a competing implementation, which the parent's second intent forbids.

**The successor's own reach is the other open question**, and between them they are why this is a placeholder rather than a plan: `pages-system/` is pure and does no I/O, `pages-system/store/` reads and does not write, and the row writers are still `tools/lib/page-rows-write.ts`.
