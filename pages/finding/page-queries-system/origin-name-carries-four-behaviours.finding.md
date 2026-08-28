---
id: 095016c9-121a-5c0c-a08f-51b600d49524
page-type-slug: finding
slug: origin-name-carries-four-behaviours
title: "One name spells the query service's origin four ways, and a caller that configures nothing reaches nothing by any of them"
domain-slug: domain/page-queries-system
---

# Claim

`pageQueryOrigin` and `PAGE_QUERY_ORIGIN` name four different behaviours in this repository, and no two agree on where a caller that configures nothing should reach. One throws on purpose. One returns a cluster address that resolves and answers nothing. One returns a loopback address that answers nothing. One throws for a fourth reason: it reads the address off the service's own page, and that page was deleted. An agent that learns what the name means in one file carries the wrong meaning into the other three.

# Evidence

Read on 2026-08-27 against `31ff5657` on `main`, and run where running was possible.

**One, it refuses.** `tools/lib/page-query-client.ts:40-46`. `pageQueryOrigin()` returns `process.env.PAGE_QUERY_ORIGIN` where that is set and non-empty, and otherwise throws, saying "no page query service answers on this workstation ... only an off-workstation caller states PAGE_QUERY_ORIGIN". Its two callers, `services/daily-tracking-points.ts:41` and `services/great-courses-sync.ts:38`, each read `process.env.PAGE_QUERY_ORIGIN ??= pageQueryOrigin()`, so on this workstation the refusal is the whole of what the function does.

**Two, it dials the cluster.** `shared/pages-query/src/index.ts:42-48`, the same spelling. It takes the stated variable, then a browser origin with `/api` appended (line 46), and otherwise returns its own exported constant `PAGE_QUERY_ORIGIN` at lines 7-8, `http://page-query-service.page-query-service.svc.cluster.local:8787`. This is not a dead letter: `ask.ts:87,132,187,236,271` and `index.ts:113,175` build every URL from it, so an unconfigured caller genuinely fetches there. The name resolves on this workstation — `getent hosts` answers 10.100.134.88 — and nothing listens: `curl -m 5 .../page-types` returned 000, no answer. `pages/finding/pages-system/tests-reach-the-live-corpus-with-no-configuration.finding.md:17` records that on its own reading day the same hostname resolved and a GET answered. I checked and it no longer answers; I am recording that it changed rather than reporting that finding stale.

**Three, it dials loopback.** `readouts/ask-over-http.ts:7` exports a third `PAGE_QUERY_ORIGIN`: a plain constant, `http://127.0.0.1:8787`, with no function and no environment variable behind it. `tools/lib/daily-tracking/points-source-engine.ts:17,266` reaches it through `askOverHttp(PAGE_QUERY_ORIGIN)`, and `editor-extension/src/seat/observation-store.ts:25,153` builds its `patch-state` URL from it. `curl -m 3 http://127.0.0.1:8787/` returned 000. `tools/lib/forward-turn.sh:5` defaults the shell variable to the same loopback address, and `:50` and `:68` curl against it.

**Four, it reads a deleted page.** `tools/lib/ci-container-dispatcher/container-manifest.ts:25-30` holds a module variable `pageQueryOrigin` and a function `pageQueryOriginInCluster()`, which resolves the address from the service's own workstation-service page through `clusterOriginOf` at `tools/lib/service-cluster-reach.ts:136-139`. That page is gone, deleted at `620c77034` ("Hold page-query-service down") and `7411bbd8c` ("Remove the page-query-service workstation service: it is permanently down"); `pages/workstation-service/` carries no `page-query-service` page now. I called it: it threw `ServiceDocRefused: no service document is named 'page-query-service'`. It is reached at line 96, where the `PAGE_QUERY_ORIGIN` environment entry of every CI container is built inside `buildContainerPayload`, so a dispatch that reaches that line refuses rather than dispatching.

This is Ubiquitous Naming on `pages/domain/global.domain.md:74-82` — "Use the same name for a concept in code, data, interface and prose alike" — failing in the form its own warrant names as worse than a synonym: not a second spelling for one thing, but one spelling for four. The four meet in one place. `tools/hooks/agent-hook-local-agent-session-start.agent-hook.code.attachment.ts:11` and `tools/lib/hook-decision-record.ts:17` read `process.env.PAGE_QUERY_ORIGIN` directly, and whichever of the four last wrote it is what they get.

Not measured: whether any live CI dispatch reaches `container-manifest.ts:96` today; what the two loopback consumers do when the fetch fails, whether they degrade or fault; and whether any of the four is the one the coming service is meant to answer.
