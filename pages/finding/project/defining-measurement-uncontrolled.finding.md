---
id: 6a2da116-0879-56ca-b62e-578f77d08ff6
page-type-slug: finding
title: "Defining measurement uncontrolled"
domain-slug: barred-meaning/project
---

# Claim

The measurement that establishes a project's premise is checked by nothing, while everything downstream is checked against IT — so a wrong premise yields a project that succeeds. `domains/tasks/lead/define-project.md` requires each criterion to name a settling instrument, and asks nothing about the number a criterion states or about what that number is a fact ABOUT.

# Evidence

Ruled 2026-07-28. It stands only in `dirty/skills/agent-harness/rulings/measurement.md`, which is quarantined and queued for its own removal, so this is filed to outlive that sweep. Two instances in one session, both committed in the act of defining and neither caught by the agent who took them.

The first: a drainage figure taken against `message_at`, a column then NULL on all 47,161 rows, returned "0 of 248 targets ever drained" — clean, plausible, total. `null > null` is false, so the comparison yielded an empty filter rather than an error. It was caught only because a positive control on the same query shape also returned an impossible zero. That column is still NULL on every row, re-measured 2026-08-07 and filed separately under the `database` domain.

The second: its replacement, "10 of 248 drained after their backlog began", written into a success criterion as its numeric bound. All ten targets were dead, their reads 25 to 92 days old. "Read something since its backlog began" is a fact about the past; "will drain" is a claim about the future. It was the exact defect that project existed to fix, committed in the measurement that defined it, and was caught at validation before dispatch rather than by anything in the definition.

Live state checked 2026-08-07. `domains/instrument.md` carries Negative Control — "make an instrument fail before you trust it" — which is about building an instrument and says nothing about which measurements are least checked. `define-project.md:23` requires each criterion name a settling instrument; `:24` requires an end state rather than a method. The four `build-*` tasks each require the taking seat to ground the objective and correct any criterion no instrument can settle, which supplies part of what this ruling said was missing but cannot reach a past-fact criterion, because an instrument settles that one perfectly.
