---
id: 522f7694-44a4-5925-89d2-7c761bebc5b3
page-type-slug: finding
title: "Seat name sweep outgrew the default test timeout"
domain-slug: domain/agent-harness
---

# Claim

The `read-seat-name` live-corpus sweep was failing because it had outgrown bun's 5000ms default test timeout, not because two seats were transiently spelling one name. The sweep enumerates every persona x domain x role the corpus can spell, so its cost grows on every commit that adds a domain. It sat near 5.0 seconds, which is why it passed standalone and failed under `run-checks`, where the other checks in the same run compete for the machine.

# Evidence

Measured 2026-08-13 by the seat moving the `misc-a` command bodies, after landing thirteen new `ops-*` command domains at `a7a1da605`.

Bun reported the case as `this test timed out after 5000ms` rather than as a failed assertion. A timeout and a failed assertion are different facts, and only the timeout was ever printed.

Three readings separate the two explanations. A worktree at the parent commit `4c3292e64` ran the file green in 5.45s. The same file at `a7a1da605`, thirteen domains later, failed at 5.60s. Run against that same live tree with `--timeout 120000`, the file reported 17 pass, 0 fail — the assertion holds, so nothing was resolving to two seats.

The test's own header states the departure that causes this: "THE SWEEP STANDS ON THE LIVE CORPUS ... it moves whenever a document lands." Its cost is meant to grow with the corpus, so a default budget it never declared for itself is the wrong ceiling. The nesting is (personas + 1) x domains x roles, with a compose and a read at each point.

Repaired at `e8d5f0078` by giving that one test an explicit 120_000ms budget; `run-checks` then reported `suite-runs` passing. This buys headroom rather than removing the growth — the same test needs a larger budget again, or a cheaper sweep, as the corpus keeps growing.

An earlier finding in this domain read the standalone/under-load split as evidence of a seat-minting race. It was removed when this repair made its claim untrue.
