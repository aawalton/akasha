---
id: e7c471ad-2bc0-51e3-be5e-a1b770a85ac2
slug: seats-die-without-writing-a-line
page-type-slug: finding
title: "Spawned seats die without writing a line and no surface reports it"
domain-slug: barred-meaning/agent-launch
---

# Claim

A spawned seat can return an agent id, appear in the roster as `advancing`, and then never advance at all — writing no transcript, no commit and no message. Nothing reports it, and the artifacts left behind do not distinguish a seat that worked from one that died.

# Evidence

Measured across #19315 on 2026-08-17. Nine developer seats were spawned in three rounds for seven children. Five died without writing a line; one wedged after committing its work but never handed back. #19320 and #19322 each died twice before landing their work on a third attempt.

The failure is not deterministic per prompt or per project: four seats spawned in one batch at the same moment, two ran to completion and two never advanced past three seconds after their row was created.

`spawn-state.json` does not discriminate. It is keyed by seat name and was stale for all four children of one batch alike — naming earlier incarnations for the two that worked and delivered as well as for the two that died. A reader treating it as forensics would draw the same conclusion about both populations.

Three separate reports read clean while two children were gone, as reported by the seat that found it: `project census` keys `stranded-child` on the parent row, which was alive; `blocked-census` requires a `blockedOn` record or an `awaiting_` status, and neither row carried one; and once the worker rows left the roster, `agent list` stopped naming them.

Not judged here: the cause. What the manager could measure ruled out the artifacts it had, and the forensics belong to whoever owns the launch path.
