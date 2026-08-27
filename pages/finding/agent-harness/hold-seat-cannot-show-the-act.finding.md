---
id: 83ed2c93-98fa-5f6c-900b-2ba76e3851b6
slug: hold-seat-cannot-show-the-act
page-type-slug: finding
title: "Hold seat cannot show the act"
domain-slug: domain/agent-harness
---

# Claim

A landing can pass every gate while `tools/hooks/hold-seat.ts` cannot show the act went through it. On three commits to the instructions repo on 2026-08-13 the hook fired and warned that its last firing named neither `tools/edit.ts` nor an `ops` command ending `edit`, so the write it was guarding could not be shown to have passed the gate it guards. All three commits reached the remote.

# Evidence

Observed by the seat that read `domains/lists/idle-live-seat.md` on 2026-08-13 under `review-instructions`, which recorded the warning rather than diagnosing it, and relayed here rather than re-derived: I did not open the hook or reproduce the warning.

Three landings on one document is the whole of the population seen. Nothing here measures whether other seats in the same sweep saw it, whether it fires on every landing, or whether any write has actually reached the repo without passing the gate.
