---
id: 25a2763f-cb2d-5659-b7b9-beba202bc514
slug: interval-rejection-unchecked
page-type-slug: finding
title: "Interval rejection unchecked"
domain-slug: domain/agent-fleet
---

# Claim

Nothing checks that a fire-and-forget interval adopts its own rejection, and one agent seat has already been killed by one that did not. `guardTick` in `packages/agents/supervisor/src/supervisor-guard-tick.ts` is the helper for it and is used by three of the four live per-agent monitors; no check requires it, so a fourth monitor written as `setInterval(() => void tick(), ms)` with no `catch` is fatal to the whole seat on the first transient read failure and green everywhere.

# Evidence

The failure mode is stated on the helper. `supervisor-guard-tick.ts:3-11`: every per-agent monitor is a fire-and-forget interval whose tick reaches the DB or a REST endpoint; during a transient blip that read throws, "a floating rejection out of the void'd tick becomes an unhandled rejection — which Bun turns into process death, killing the whole agent seat. That is exactly how worker-15214 died: `getProjectBindingBySeq` → `getPage` threw an HTTP 502 in a monitor's tick, whose `try/finally` had no `catch` to adopt it."

Adoption is by convention. `grep -rn guardTick packages/agents` outside `dist` and tests finds three call sites: `supervisor-proxy-liveness.ts:135`, `supervisor-deferred-restart.ts:375` and `supervisor-credentials.ts:312`. The fourth live monitor is guarded a different way — `supervisor-limit-resume.ts:145` wraps its body in `try/catch` and its `setInterval(() => void tick(), …)` at :152 is bare. Both are safe; nothing makes either shape the required one.

The nearest check is about a different property. `packages/infra/checks/src/checks/check-supervisor-daemon-bounded-tick.ts` enforces that a hand-rolled polling daemon bounds its per-tick work so a wedged tick cannot freeze a watchdog. It says nothing about whether a rejection escapes, so its green covers this class entirely.

What makes it worth an instrument rather than a habit: the failure is total and remote from its cause. The seat dies, the monitor that threw is not the work the seat was doing, and the transient 502 that caused it is gone by the time anybody looks. A guarded tick and an unguarded one are one character apart in review.

Found ingesting `dirty/knowledge/per-agent-monitors.md`, whose section on this was cut — the source's own enumeration of which monitors are wrapped had gone stale, which is the shape a convention takes when nothing measures it.
