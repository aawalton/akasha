---
id: 44ec8daf-f877-5b69-8677-e67c0b8077c4
page-type-slug: finding
title: "A correct refusal has become an alarm that cannot signal"
domain-slug: page-property-definition/seat-presence
---

# Claim

`sweep-seat-pages` exits non-zero on every run because one seats sidecar states no supervisor process, so its presence can never be read. The refusal is correct and deliberate. The consequence is not: a unit whose non-zero exit is meant to mean something has meant it continuously for over a day, so a real failure now reads exactly like the standing one.

# Evidence

Observed 2026-08-28 03:18 by seat astra.

`agent/seat/ki.seat.uncommitted.yaml` holds one line and nothing else:

```
{turn-state: {value: idle,at: 1787858354691}}
```

No supervisor process is named. `services/sweep-seat-pages.ts` reads presence as a pid paired with its own `/proc` start time, so a sidecar stating none yields `unknown` rather than `absent`, deterministically and on every run. The seat page and its sidecar are left standing, which is right.

The exit is by design and the design is sound. The file says so at its own lines 28-34: a reading that did not happen is not an absence, an unreadable presence is named uncertain, and a run that met one exits non-zero, because deleting the page of a seat an agent may still be sitting in costs more than residue named on every run. That is the pages system rule Answer Or Refuse, implemented deliberately.

What fails is downstream. The run at 03:04:35 reported `swept 13 seat page(s): 12 present, 0 absent, 1 uncertain` and exited 1. It did its whole job. `systemctl --user list-units --state=failed` shows the unit failed, alongside `monarch-poll`, `monarch-sync`, `royal-road-sync` and a `graph-service.service` that is `not-found` and failed at once. All four carry `ExecMainStatus 1`.

A finding already records that no instrument anywhere reads systemd unit state, so the signal this refusal raises is read by nobody even when it is new. A standing refusal and an unread signal compound: the first makes the alarm constant, the second means nothing was going to hear it.

Not measured: what wrote a sidecar carrying turn-state and no presence, and whether other seats sidecars can reach the same shape. Not measured: whether `ki` names a seat any agent ever occupied.