---
id: 0a635b57-59dd-5a9a-91ee-e25c4be98bd9
page-type-slug: finding
title: "Refusal omits its record"
domain-slug: domain/global
---

# Claim

A gate refusing an agent for something it has not read names the record it consulted only where that gate is `read-what-governs`. `read-before-write` and `read-the-schema` refuse without naming one, so a delegate reading either alone has nothing telling it which bucket it is being judged on.

# Evidence

Observed 2026-08-06 on a delegate's `ops instructions edit --dry-run` against `domains/rule.md`, taken during the verification of #17898.

Three gates refused in the same output. `read-what-governs` printed the record path in full — `/home/walton/.instruction-reads/<seat>--ac2c7873e104d90ee.json` — and named it as "a file your `Read` opens". `read-before-write` refused with "never read by this agent; the file changed 2026-08-06 12:50:34" and named no record. `read-the-schema` refused with "1 schema(s) specify this path; 0 read, 1 not" and named none either.

The case this matters in is the one that just became reachable. A delegate is now judged on a bucket of its own rather than its seat's, and its dispatching seat may have read the very file it is being refused for — that happened here, the seat having read `domains/rule.md` minutes earlier. To a delegate meeting only `read-before-write`, that refusal is indistinguishable from the record being lost.

The `owed:` line at the foot of the output names the loading command but not the bucket, so it does not close the gap on its own.
