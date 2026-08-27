---
id: 4f59dc94-96b7-5d71-aeff-72453bd4cb61
page-type-slug: finding
title: "Compact resume deferred notice null"
domain-slug: domain/agent-runtime
---

# Claim

`supervisor-compact-resume.integration.test.ts`'s live-acceptance case fails on untouched `origin/main`: a headless seat whose row is held by another layer is not woken, but the deferred notice that is supposed to say so on the row reads null.

# Evidence

Measured on an untouched `origin/main` checkout at e43ae8c621b52916e8a756e9c4552742d9cf1c3a, through `ops worktree ephemeral`: the case "compact_self resume driver — live acceptance (#17059) > a headless seat whose row is held by another layer is NOT woken, and says so on the row" fails at `supervisor-compact-resume.integration.test.ts:240` with `expect(received).not.toBeNull()`, received null. One case in the file passes and one fails. The same failure appears on #18946's branch, so it is standing rather than introduced.

The assertion is the file's own negative control. Its comment at line 237 reads "On the untouched base this marker is absent, which is the state a stalled seat is in — so the assertion that fails there is this one" — so the case is written to distinguish a seat told why it was not woken from one left silent, and what it currently reports is the silent state.

`readDeferredNotice(agentId)` returning null is the whole of what was observed. Whether the notice is never written, written under another key, or reaped before the read is not established here.

The suite is `integration`, so CI's `{unit, property, component}` set never runs it; branch CI for #18946 passed over 124 of 124 steps with this red standing.
