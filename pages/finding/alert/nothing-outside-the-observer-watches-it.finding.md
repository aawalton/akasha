---
id: 8753838a-cbf4-5bab-b733-957854d7942a
page-type-slug: finding
title: "Nothing outside the observer watches it"
domain-slug: page-type/alert
---

# Claim

Once #19177 deploys, every alert in the fleet reaches a person only through the workstation's alert observer, and nothing outside that daemon watches whether it is sweeping. Its guards are inside it — a systemd restart, and a push to Alan after ten failed sweeps — so a process that dies without failing a sweep, or a workstation that is off, produces no signal. Events are durable and replay from the cursor, so the failure is delay rather than loss; nothing bounds how long.

# Evidence

Before #19177, a firing site resolved a persona and wrote into a mailbox. After it, a firing site records `alert.condition.fired` or `alert.condition.cleared` and `tools/alert-observer-daemon.ts` is the only thing that turns those into a message anyone reads.

What watches what, after the deploy:

- `packages/agents/infra-alert-bridge/src/dead-path.ts` watches the OBSERVATION channel only — whether Prometheus answered and evaluated rules, proven by a firing `Watchdog`. Its own docblock says so. It says nothing about delivery, which is how the 2026-08-12 outage ran 30 hours with Prometheus healthy throughout.
- `alert-path-dead` is itself recorded as an event now, so the alert announcing a broken alert path is delivered by the observer it may be reporting on.
- The observer's guards are `Restart=always` in `tools/alert-observer.service`, and `FAILURES_BEFORE_PUSH = 10` in the daemon, which pushes to Alan's phone directly — the right escape hatch, since every seat that would escalate is downstream, and it fires only on sweeps that ran and failed.

Nothing reads `public.events` for `alert.condition.*` rows whose seq is behind the observer's cursor, and nothing reports the cursor standing still.

Measured healthy at the time of filing: the service had been up 1h14m, the cursor had advanced twice, and both batches delivered — `read 2 ... sent` at 10:26 and `read 3 ... sent` at 11:04, to a seat resolved from the condition. So this is a gap in what is watched rather than a fault in what runs.

This is the live half of #18972, whose criteria 2 and 3 were written against the recipient model #19177 replaced.
