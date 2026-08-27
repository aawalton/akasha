---
id: 7b02c2f0-e0b8-56cd-a021-ffc35588eff0
page-type-slug: finding
title: "Check ast unused workspace audit blocker dissolved"
domain-slug: domain/global
---

# Claim

Project #18561's four objectives to audit the code-check workspaces `check-ast-unused` reaches but does not judge sit undefined only because the question that looked like it set the project's size — whether the stricter or the more permissive default glob reading was right, costing roughly 1,030 or 484 violations — was dissolved rather than answered: no single default is right, since curated workspaces already state their own globs and uncurated ones need the same, not a global choice.

# Evidence

Project #18561 (status `awaiting_lead_definition`, `live-on: deploy`, domain `code-check`, initiative `code-check`). Objectives, all unchecked: (1) every workspace in the graph declares its own entry and project globs, as curated ones already do; (2) every workspace `check-ast-unused` reaches has had its own exports judged, not counted as analysed while asked nothing; (3) the pending list goes empty rather than reinterpreted, so its count stops reading as coverage while membership changes meaning underneath it; (4) each batch lands with what it finds already repaired, not admitted through a ratchet or exemption.

The unit is the workspace, not the violation — the whole of what this definition changes. As several hundred export judgments the work has no natural seam; as workspaces it is one shape repeated: read what a package exposes, state its globs beside the ones already there, repair what that turns up, commit. Batches are sized by however many a seat can carry.

Split from #18416, whose seat held this half rather than landing it; the hold is upheld by `dalla-lead`. #18416 widened the population to the workspaces the run set out to analyse and made the cache carry the context it was built under, but the rule against freezing findings into a list to land a widening forbade landing that population change with anything still pending, so it landed at zero and this audit waits — the rule working, not a shortfall.

What `pendingCuration` means changed though its membership did not: was "invisible to the graph," now "in the graph and not yet audited." This project empties it.

Figures above (1,030 vs 484) were taken 2026-08-10 against a live config; re-measure from `ast-unused.config.json` before sizing batches rather than trusting them.

Not in tree #18682: that tree carries the check audit's repairs landing as one deploy; this is curation whose batches each land on their own.
