---
id: 60a0871d-8f9a-5228-b71d-77a8494c4fd3
slug: dispatch-headroom-unenforced
page-type-slug: finding
title: "Dispatch headroom unenforced"
domain-slug: domain/agent-fleet
---

# Claim

The dispatch-headroom convention — fewer than 10 rows in deployment/verification and fewer than 10 in active-earlier — is not enforced anywhere: `project start`, `project claim` and `agent spawn` all take work without consulting either count, so it holds only for as long as every lead remembers and re-measures it by hand.

# Evidence

Initiative: none named. Captured [2026-07-26T01:58:31.889Z]; aine measured the counts three times that night: 23:36Z d=2 a=16 (total 18); 00:55Z d=5 a=11 (total 16); 01:55Z d=8 a=5 (total 13). Her own words: "The convention is not a machine. Nothing will stop an over-dispatch."

Two defects found:
1. The decision is distributed but the harm is serialized — four leads can each correctly see headroom and each dispatch; no individual decision is wrong but the sum overshoots into a single merge queue, and the cost lands as CI starves/wedges hours later in a different system. That night produced #16217 (fragmentation), #16249 (bind gate), #16374 (dispatcher starvation), #16375 (tier at ceiling).
2. It is a read-then-act race with no reservation — the same defect #16374 found in the CI dispatcher itself (defers without holding a reservation, so several deferred steps believe the same capacity is theirs), one layer up: a lead reads a level, acts later, holds nothing in between.
2a. The level is the wrong quantity: d=8 with five rows upstream in active-earlier means d rises with nobody dispatching. The governing quantity is level-plus-committed-inflow, not level.

Proposed shape (precedented, not designed here): the work-halt doctrine already solved this class — a flag the work-taking verbs (`project start`, `project claim`, `agent spawn`) check and refuse over at dispatch time, naming both counts and which blocked, reading the count at the act rather than before it.

Open questions, not settled: (a) level vs level+inflow — tighter gating could stall the pipeline (aine: "an empty upstream stalls the pipeline; five in active-earlier is thin"), so the gate must say "too few" as well as "too many"; (b) whose count — global across the fleet, or per-lead (stated as global, which is what makes it a race).

This row was captured and never defined — carries no objective of its own; this text is its capture, moved off the row's retired `notes` attribute on 2026-08-15.
