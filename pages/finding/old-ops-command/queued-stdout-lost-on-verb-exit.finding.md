---
id: 4af7ff2b-da38-5fbb-9118-0adc3c342c32
slug: queued-stdout-lost-on-verb-exit
page-type-slug: finding
title: "Queued stdout lost on verb exit"
domain-slug: page-type/old-ops-command
---

# Claim

A verb that writes volume to stdout and then exits through `process.exit()` loses whatever is still queued, the verdict line included, so a bad verdict is the output most likely to be dropped.

# Evidence

Measured 2026-08-14 on the #19139 branch, against `packages/shared/cli-core/src/verdict-channel-probe.script.ts`, which writes N lines to stdout and then takes the `process.exit(n)` path every failing `ops` verb takes.

Twelve runs of the probe at 200 filler lines plus one verdict, read through a pipe: ten delivered the lot and ended on `VERDICT: FAIL`; two truncated mid-stream, at 166 and 144 lines, ending on a filler line with the verdict absent entirely. So the loss is not a miscount at the tail — the stream stops wherever the pipe buffer happened to be, and everything after it goes, including the claim the channel exists to carry. A separate run under the slow-suite gate lost exactly one line, so the truncation point varies from near-complete to a quarter short.

Nothing here is currently reachable through a shipped verb. The channel's design puts one line on stdout and nothing else, so no queue builds and there is nothing to drop; the volume above was synthetic. What is unmeasured is whether any verb writes a body to stdout by another route, and whether the same loss reaches stderr, which findings ride.

The assertion that caught this has been deleted rather than repaired: it failed about a quarter of the time on pipe-buffer timing, and `tests.md` Removal covers it independently, since the one-line design already makes the case impossible. It replaces an earlier finding on the `code-harness` domain that read the same failure as a threshold moving with load and reporting a scheduler, which was wrong about the mechanism.
