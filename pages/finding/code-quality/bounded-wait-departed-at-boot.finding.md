---
id: 2525fbb4-ed20-5d89-9dd3-5b92a11c3aa7
slug: bounded-wait-departed-at-boot
page-type-slug: finding
title: "Bounded wait departed at boot"
domain-slug: domain/code-quality
---

# Claim

Bounded Wait on `domains/code-quality.md` requires every wait to have a ceiling and to fail at that ceiling, and the boot path of `@shared/pages-ui-store` departs from both halves deliberately and with recorded reasons: its one bounded gate un-blocks and proceeds rather than failing, and a second gate is left with no ceiling at all.

# Evidence

The rule reads: "Give every wait a ceiling, and fail at that ceiling with the reason the wait was for. An unbounded wait emits nothing — neither finished nor failed, so nothing alerts and nothing retries."

`packages/shared/pages/ui-store/src/singleton.ts` departs at two points inside one function.

`boundBootGate` at line 38 has a ceiling and does not fail at it. Its docblock at :33-37 says so: "Await `gate`, but stop BLOCKING on it after `timeoutMs` … The underlying promise is NOT aborted: it keeps running so a slow-but-succeeding gate still applies its effect." At the ceiling it emits a `boot-gate-timeout` diagnostic naming the gate and elapsed bound, then resolves. It reports and proceeds where the rule says fail. `HYDRATE_GATE_TIMEOUT_MS` at :31 is 3s, "generous headroom over a healthy snapshot read (<100ms)".

`envReadyPromise`, awaited at :137, has no ceiling. The comment at :129-136 records why: it resolves on the first `configurePagesStoreAuth`, which wires the Electric URL, and "If we bypassed it on a timeout, `acquireSlug` would attach a stream with a null URL — and `attachStream` treats a null URL as a dead no-op … permanently emptying the slug." The state a ceiling would produce is permanently worse than the wait.

The rule's warrant is answered here by something the rule does not name. The comment continues: "A slow `getSession()` is instead covered by the hooks' render-degrade (they drop the skeleton to the usable empty state while this keeps waiting), so the boot never hangs on it either."

Both departures are attributed to `#15159`, so they are the outcome of a repair rather than an oversight.

Not measured: whether other waits in the estate take this shape — I looked at this boot path only. I also did not run the boot or reproduce either stall.

Read at `ecf5f9518f` on `main`, 2026-08-07.
