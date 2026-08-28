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

# Notes

Opened 2026-08-27 as a placeholder, on Alan's ruling: off-workstation reads and writes go through a pages system service, which is not the page query service but its successor. Nothing is being built here yet. Intents past the first are settled with him one at a time.

**Two files wait on this service.** `services/daily-tracking-points.ts:41` and `services/great-courses-sync.ts:38` each set `PAGE_QUERY_ORIGIN` from `pageQueryOrigin()` so that `@shared/pages-query`, the off-workstation HTTP package, has somewhere to reach. Nothing answers on that origin. They are the first real customers here.

**Every other caller was repointed in process at `58e35244e`**, on Alan's ruling: "you can repoint for now, and then we can migrate onto the new clean core once it can support the case." `tools/lib/page-query-client.ts` keeps its export surface and answers through `page-query-answer.ts` and `page-query-landing.ts` rather than over HTTP. That is an interim with a stated end, not a resting place.

**The page query service is gone, not down.** `pages/workstation-service/page-query-service.workstation-service.md` was deleted at `620c77034` and `7411bbd8c`, taking `port: 8787` with it. `pageQueryOrigin()` at `tools/lib/page-query-client.ts:40-44` now answers the stated environment variable and refuses plainly otherwise, so a caller fails where it is rather than reaching a dead port.

**`tools/lib/daily-tracking/tracking-modules.ts` cannot be edited a little.** It forwards thirteen names it does not declare, and `export-declared-here` judges a changed file whole rather than by its changed lines — a byte-identical copy with one comment appended at the end is still refused. So the first write to that file dissolves the barrel, across the seventeen files under `tools/lib/daily-tracking/` that take a forwarded name.

**Three packages reach `@shared/pages-query` with no asker to hand in.** `collections/exercises/src/pages/access.ts:94`, `alanwalton/health-samples-access/src/select.ts:1` and `alanwalton/health-samples-day/src/wake-day.ts:1` each call `askComposed` at the point of use, so a caller cannot route them anywhere. `shared/pages-access/src/{file-read,file-write,file-property-defs,file-write-backing,file-relation}.ts` reach it the same way, under `upsertPage`. A workstation run of `services/daily-tracking-points.ts` goes through all four.

**Where an asker is already taken, the in-process one satisfies it.** `readouts/ask-here.ts` answers off the checkouts on this machine through `page-query-answer.ts`, and is a `readouts/readout-resolver.ts` `Ask`. `readouts/session-readings.ts` `readSessionPages(ask?)`, `readouts/activity-reading.ts` `cardioReading(day, span, readSamples)` and `readouts/stoplight-mean-points.ts` `readStoplightMeanForDay({ ask })` each take one. Reaching those directly is what keeps `@shared/status-bar-access/readings` and `readouts/ask-over-http.ts` — both of which build an HTTP asker — out of a run that never leaves the workstation.

**The old service was a hop, not an implementation.** `services/page-query-service.ts:9-23` imported `tools/lib/page-query.ts`, `page-query-answer.ts` and `page-query-landing.ts` — the same modules a command calls directly. The successor inherits no logic that lived only there.

**Whether the successor holds a store of its own is unsettled**, and it wants settling before anyone builds, because it is assumed the other way once building starts. If the service is a skin over `pages-system/` then this initiative has one job; if it holds its own reach, it has two.

**The successor's own reach is the other open question**, and between them they are why this is a placeholder rather than a plan: `pages-system/` is pure and does no I/O, `pages-system/store/` reads and does not write, and the row writers are still `tools/lib/page-rows-write.ts`.
