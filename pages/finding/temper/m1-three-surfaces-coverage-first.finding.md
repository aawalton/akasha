---
id: ce50d9bc-cf76-5f7b-9982-9d1b2315a161
slug: m1-three-surfaces-coverage-first
page-type-slug: finding
title: "M1 three surfaces coverage first"
domain-slug: domain/temper
---

# Claim

Temper's Milestone 1 (its path to a first external user) requires three surfaces — web UI readiness, in-game readiness, and a personal-data-exposure floor — to each pass a coverage-first find/fix/verify loop judged against Alan's "all known issues resolved" bar, with the in-game half gated on Nimue's agent-control engine landing and Patreon, feature-requests, and the full security audit deferred to a later milestone.

# Evidence

Project #15869, domain `temper`, status `someday_maybe` — Milestone 1 umbrella, children #15871 (A), #15872 (B), #15873 (C).

Milestone: Temper's path to its first external user (one friendly user, high standards). Settled vision-level with Alan 2026-07-24 via Aine (Wealth vision-holder, agent id `019f93a6-67c0-7174-a75d-40ae007e92e4`); homed+decomposed by ember (Temper domain owner). Definition gaps to Aine; implementation/decomposition to ember; in-game gate timing to Nimue.

Success bar, Alan's words: "all known issues have been resolved" — a loop-until-dry predicate (find, fix, verify) repeated until a pass surfaces nothing new. The teeth are in coverage of the find: a shallow audit clears the bar trivially while still shipping rough, so thorough finding is the carrying work, not the fixing.

Three surfaces, all required: (1) in-game readiness, via Nimue's agent-control engine (demonstrated, deploying as a cluster container) — gated on it landing; (2) web UI readiness, via Playwright — unblocked, the critical path; (3) a data-exposure floor across both surfaces and the handover — does it carry Alan's tokens/SavedVariables/keys/identifiers. Alan's explicit worry.

Deferred to M2: Patreon, feature-requests, the full security audit — the data-floor pass is the only security piece M1 needs.

Decomposition (ember): Child A #15871 (unblocked, critical path) — coverage-map-first then find/fix/verify via Playwright, loop until dry. Child B #15872 (gated on Nimue's engine) — same loop, held un-dispatched. Child C #15873 — focused pass on the near-final handover package, sequenced late.

Known issues feeding the find-set: #15778 (sort bug); #15864 (keyboard adoption under Olwen's #15792, related, not re-homed).

Stated assumption (correct-if-wrong via Aine): user #1 = any friendly early user (TBD) at filing; #15873's later notes record David Eggertsen named likely first, Joseph Walton likely second.

No `# Objective` — captured, never defined.
