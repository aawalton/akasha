---
id: 8ea06002-b4f2-5a0d-8653-0f40a35cf95f
slug: in-game-readiness-gated-on-reboot
page-type-slug: finding
title: "In game readiness gated on reboot"
domain-slug: domain/temper
---

# Claim

Temper's in-game readiness audit (Child B of Milestone 1, project #15869) is gated on Nimue's agent-control engine, which itself waits on a node-03 uinput cluster reboot that was not yet scheduled as of 2026-07-24, and the web half of Milestone 1 was reported complete by 2026-07-25.

# Evidence

Project #15872, domain `temper`, status `someday_maybe` — Child B of M1 umbrella #15869. Gated on Nimue's agent-control engine landing (in-flight, deploying as a cluster container); held un-dispatched until the gate clears, ember syncing Nimue on timing + drive interface. Audits chat output + in-addon readiness, same coverage-map-first find/fix/verify loop as Child A.

In-game engine dependency intel from Nimue (2026-07-24): driven through her agent-control engine. Gate sequence, in order, Nimue pinging ember as each clears: (1) cluster uinput node-03 reboot to load the kmod — deployed live on node-03, but the node reboot still pending (devops-run, safe-by-checklist, announced window, not yet scheduled) — the immediate gate; (2) S4a, login persists on the expendable account, needs a one-time tempereso login from Alan; (3) S5, cold-to-in-world automation (launcher/patcher/login in a container) — the genuine critical-path risk; (4) S6, per-addon load-smoke — the in-game audit surface. Nimue's read: in-game is the later, riskier half; web-first is right.

Drive interface (not built yet, Nimue designing it to this audit's need): an ops-style CLI verb taking an addon/addon-set, driving deploy → `/reloadui` → per-addon load-smoke verdict, machine-readable pass/fail. Verdict = TemperErrors zero-fresh-keyed-on-post-deploy-build-id + UI-present + SavedVariables round-trip. Owed by ember once past web half: the surface-set + verdict shape.

Accelerator noted, not to sequence around: Nimue assessing whether the workstation spine (ydotool + SavedVariables read-back) bridges the audit sooner than the cluster rig — runs on Alan's machine, so she'd weigh it with him first; assume the cluster timeline unless it firms up.

Hand-off (2026-07-25, ember): web half of M1 complete (8/8 batches + keyboard; #15871/#15869), unblocking design of the in-game audit; build/test stays gated on the cluster rig.

No `# Objective` — captured, undefined.
