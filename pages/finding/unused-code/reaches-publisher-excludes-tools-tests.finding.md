---
id: 58ad6193-503d-56f0-9358-266c2b163f55
page-type-slug: finding
title: "The reaches publisher filters instructions tests out wholesale, reporting a reached module dead with confidence"
domain-slug: domain/unused-code
---

# Claim

The reaches publisher `check-ast-unused` reads filters `tools/tests/` out of its results wholesale, so a code-repo module reached only from an instructions-repo test is reported dead with full confidence — and a plain literal path string is missed just as completely as a dynamic one.

# Evidence

Measured 2026-08-17 on #19388 at `09678d7c`, off `main`. Caught by a ruling, not by an instrument, and only after the deletion was committed.

`packages/agents/cli/src/agent/proxy-seats.ts` was reported as three exports "not reached from any entry" and deleted at `852c2ff`. It is reached twice. `tools/tests/proxy-seats-arm.ts:33` loads it by path and calls `resolveLiveProxySeats` at `:41`. `tools/tests/proxy-seats-standing.on-demand.test.ts:55-56` reaches both functions through `codeModule(SOURCE)`, where `SOURCE` is a plain literal string — not a template. And `proxy-seats-recording.test.ts:217` says in its own words that no SQL is driven in the gated test and the query "is held only by the on-demand arm", so the arm is load-bearing rather than scaffolding.

The cause is one line: `tools/lib/code-reaches.ts:188` filters every path starting with `tools/tests/` out of the published reaches. Both sites sit there. The publisher returned 950 refs with this module absent, and it would have done so for the literal string alone.

That matters because the publisher is where an agent is sent to answer "is this reached?" — it is the published answer named in `pages/finding/agent-harness/cross-repo-reach-invisible-to-importer-sweep.finding.md` for the blind spot that finding records. On this class it returns a clean zero, so the one recommended remedy fails silently.

Restoring the module and running `bun tools/tests/proxy-seats-arm.ts` exits 0 over its full vector set. Execution settled in seconds what two instruments had answered wrongly.

Set beside `own-test-shields-a-dead-module`, this is one instrument wrong in both directions: that one leaves dead code standing and costs a reader, this one deletes live code and costs a deploy. Neither reports itself, and both print the same confident line.

Not measured: how many code-repo modules are reached only from `tools/tests/`, or whether the exclusion is deliberate.
