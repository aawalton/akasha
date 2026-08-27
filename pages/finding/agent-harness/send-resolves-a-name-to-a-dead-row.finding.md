---
id: 8a7e87dd-8367-577d-a83a-3457642f618e
slug: send-resolves-a-name-to-a-dead-row
page-type-slug: finding
title: "Send resolves a name to a dead row"
domain-slug: domain/agent-harness
---

# Claim

One persona holds two seat rows with the same persona and role, and `ops seat send` picks between them by exact name with no preference for the live one. Sending to `athena` enqueued to a dead row while `athena-lead` was live, exit 0, and the dead-inbox refusal that fires elsewhere did not fire.

# Evidence

Measured 2026-08-02, first-hand, costing two handoff messages.

`ops seat send athena --content-file <f>` returned exit 0 and `019fc367-… 019f9d68-… pending dead`. `dead` prints in the enqueue line itself, so it reads as one more column rather than a refusal.

The two rows, by `ops seat whoami --agent-id`:

    019f9d68-…  name=athena       role=lead  domain=agent-harness  persona=athena   (dead)
    019fbe77-…  name=athena-lead  role=lead  domain=unknown        persona=athena   (live)

`ops seat alive` proves `athena` dead (absent from /proc, no live pid, no heartbeat) and `athena-lead` live. `019fbe77` had messaged me minutes earlier, so the live seat was reachable and already in the conversation.

Note which is better identified: the DEAD row resolves a domain, the LIVE one stamps `unknown`. A sender comparing the two would take the dead one for the real seat.

`ops seat delivery` cannot report the loss. On the misrouted id: `VERDICT: UNKNOWN — not-yet/unclaimed — offered and not taken, and nothing yet proves the seat had its chance`, with `reachability: dead` beneath. The two halves disagree and nothing reconciles them — the vocabulary reserves proven loss for `lost`, so a recipient the same command just proved dead still reads as indeterminate. Re-sent to `athena-lead`: `VERDICT: PASS — injected/injection — the channel woke the seat`.

The refusal exists and did not fire. Earlier the same day `ops seat send worker-17525-build` was refused: "non-wake-armed standing seat whose current holder is provably dead; refusing to enqueue to a dead inbox." Whatever conditions it spared the case with a live alternative one name off.

Nothing in the estate caught it; Alan did, by asking whether athena was live under another name.

NOT the same as `seat-name-authorities-disagree`; a classify pass should keep them apart. That claim is two parsers disagreeing at bind time over which name shapes resolve axes. This is send-time resolution, and reconciling those parsers leaves both rows standing and `send` still picking by exact string.
