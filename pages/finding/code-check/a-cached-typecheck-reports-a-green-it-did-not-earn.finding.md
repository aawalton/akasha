---
id: c6b91b1e-d1fc-5212-aaa9-953ea84ae9ab
slug: a-cached-typecheck-reports-a-green-it-did-not-earn
page-type-slug: finding
title: "A cached typecheck reports a green it did not earn"
domain-slug: domain/global
---

# Claim

A per-package typecheck can report a green verdict off a stale `tsbuildinfo`, so the check passes while the code it claims to have checked does not compile. Staging CI caught what the local verdict hid during #17988's `axis` rename, which means the local verdict and the real one came apart with nothing between them saying so.

# Evidence

REPORTED BY THE #17988 SEAT at hand-back on 2026-08-06, and recorded here rather than verified by me: the seat is retired and the observation would go with it. Treat it as a report to reproduce rather than a measured fact.

WHAT IT SAID. During the `axis` to `slot` rename across the code repo, a per-package typecheck passed off a cached `tsbuildinfo` while the tree it described had moved underneath it. The failure it hid was caught later by staging CI, which does not share the cache. The seat's own remedy was to clear the cache before believing the verdict.

WHY IT IS WORTH A READING RATHER THAN A SHRUG. A rename is exactly the change this fails on. It moves identifiers across many files without changing behaviour, so the compiler is the only thing that can see a miss, and a cached green is indistinguishable from a real one at the moment it is read. The seat reported the same shape three separate times on this project for help text — a surface that reports success without having looked — and this is that shape in the verdict channel rather than in prose.

WHAT WOULD SETTLE IT. Whether the local per-package typecheck can be made to report a green over a tree it did not read, by touching a file and re-running without clearing the cache. The per-package typecheck stands here as `bunx @typescript/native-preview -b` run per workspace at `tools/lib/check-workflow/check-configs-typecheck.ts:18` — build mode, which reads and writes a `tsbuildinfo`, with nothing clearing it first; the buildinfo write site is `tools/lib/typecheck-run.ts:113`. That is one reproduction and it decides whether this is a caching hazard everyone must remember or a defect the check should close by construction.

WHAT IS NOT CLAIMED. Which package, which invocation, and whether the repo-wide typecheck shares the hazard. The seat named none of those and I did not reproduce it.
