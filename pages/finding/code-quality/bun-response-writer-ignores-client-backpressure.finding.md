---
id: c3b70f81-91a5-51f3-9caa-87cf0f92acbc
slug: bun-response-writer-ignores-client-backpressure
page-type-slug: finding
title: "Bun response writer ignores client backpressure"
domain-slug: domain/code-quality
---

# Claim

Bun's HTTP response writer does not propagate a slow client's backpressure to an upstream `fetch` body, so a route returning `new Response(upstream.body)` holds the whole upstream object in heap rather than any bounded buffer. Interposing a pull-based `ReadableStream` does not change it, so the queue that grows is not the stream's. The only bound such a route has is the number of bytes it agrees to put in one response.

# Evidence

Measured 2026-08-05 on Bun 1.3.14, reproducing the atlas OOM kills of #17887.

A proxy (`new Response((await fetch(UP)).body)`) in front of a local upstream emitting 1 MiB chunks as fast as taken, read by one `curl --limit-rate 200k`. Proxy RSS from `process.memoryUsage.rss()`:

```
baseline 45 MiB   t+1s 1378   t+2s 1865   t+3s 3925   t+5s 4755   t+8s 5716 MiB
```

It buffered the whole 4 GiB body for a client that had taken ~1.6 MiB. Re-run with a pull-based `ReadableStream` between the upstream reader and the `Response`, RSS reached 8.3 GiB.

Bounding the response bounds the process: same harness, upstream capped at 8 MiB, six concurrent `--limit-rate 100k` clients, RSS went 46.4 → 169.6 MiB and stayed flat. Overhead is ~2.5x the payload per in-flight response, so a cap of N costs ~2.5N per concurrent slow reader — a per-request bound, which concurrency multiplies.

The kernel agrees on the consequence. `{job="node-kernel"}` in Loki over the seven days to 2026-08-05 records five OOM kills of the atlas container, `constraint=CONSTRAINT_MEMCG` on the container's OWN cgroup, anonymous rss at death within 0.05% of the same value each time: 259048, 259156, 258920, 259072, 259044 kB against a 256Mi limit — heap, not page cache. The pod's sibling `code-sync` container peaked at 1105, 765, 758, 736 and 704 MiB on pods that were NOT killed, and 22–475 MiB on the five that were.

`rg 'new Response\(.*\.body'` over `packages/` outside `node_modules` returns twelve sites: five app `server.ts` boundaries, `shared/pages/ui/src/media/serve-media.ts:270`, two `alanwalton/web` media routes, two `infra/auth-proxy` cores, `infra/inference` traffic-cop, and the basemap route (bounded by #17887). `serve-media.ts:197` passes `range: null` to read a whole object.

Not measured: whether any site other than the basemap route has been sent a request large enough to matter, or whether a Bun release after 1.3.14 behaves differently.
