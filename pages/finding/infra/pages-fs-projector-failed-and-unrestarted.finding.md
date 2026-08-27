---
id: 68e5e3fe-18b9-560e-8589-c6bd078f376a
slug: pages-fs-projector-failed-and-unrestarted
page-type-slug: finding
title: "Pages fs projector failed and unrestarted"
domain-slug: domain/global
---

# Claim

`pages-fs-projector.service` is present and has stood in `failed` since 07:23:46 on 2026-08-13, so the read-only `.pages-mirror/` projection into every live checkout has gone unmaintained since. `Restart=always` never fired, because the unit was stopped rather than crashed: it overran its stop timeout, was SIGABRTed and dumped core. An existing infra finding records that stop-timeout mechanism but states this unit had since been removed, which no longer holds.

# Evidence

Measured 2026-08-13, about sixteen hours after the failure, by the seat moving the `misc-a` command bodies — which reached it while proving `ops pages-mirror run`, not by looking for it.

`systemctl --user show pages-fs-projector.service` answers `ActiveState=failed`, `SubState=failed`, `ExecMainStatus=6`, `NRestarts=0`. The journal ends with `Main process exited, code=dumped, status=6/ABRT`, then `Failed with result 'timeout'`, then `Stopped`. The unit had run 5d 1h 43min and consumed 13h 44min of CPU before that.

`NRestarts=0` is the part worth reading twice. `Restart=always` restarts a service that dies; this one was asked to stop and would not, so systemd escalated and the unit ended in a state nothing brings it out of. A daemon whose whole purpose is a continuously refreshed projection is therefore off, and the only surface saying so is a `systemctl` call nobody makes.

Run by hand from a shell, `ops pages-mirror run` does not exit on a SIGTERM to its wrapper: across two separate runs the `bun` child was still alive sixteen seconds later and had to be taken with SIGKILL by pid. This is the same overrun systemd hit. The verb's own help says "On SIGTERM/SIGINT it drains and exits 0 so `Restart=always` fires only on a real crash", so the declared behaviour and the observed behaviour disagree.

Not measured: whether the mirrors are actually stale on disk, what stopped the unit at 07:23:46, and whether a plain `systemctl --user restart` brings it back. Nothing was restarted — the seat that found this had no warrant to act on infra.
