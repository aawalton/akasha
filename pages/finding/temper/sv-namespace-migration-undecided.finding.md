---
id: ab063806-b810-5164-9888-05880fc0563d
slug: sv-namespace-migration-undecided
page-type-slug: finding
title: "Sv namespace migration undecided"
domain-slug: domain/temper
---

# Claim

Whether to migrate Temper's SavedVariables namespaces at all, versus keeping the legacy keys as a permanent KEEP_NAME_EXCEPTIONS class, has never been decided — migration value is purely internal naming coherence while the cost is the fleet's highest-risk operation class, and the question was gated on the ~7/23 #14987 reconciliation, which these notes do not record as having happened.

# Evidence

Project #15685 (domain: temper), status someday_maybe, live-on: deploy. Carried no `# Objective`; the notes below are the observation.

Carved from #14325 at engagement close (silos 1-4 fingerprint eradication COMPLETE; SV — SavedVariables — names deliberately byte-locked throughout).

SCOPE QUESTION FIRST (define-front): whether migrating SV namespaces is worth doing AT ALL vs the legacy keys joining the permanent KEEP_NAME_EXCEPTIONS class — migration value is purely internal naming coherence (SV keys are invisible in-game), cost is the fleet's highest-risk op class (SavedVariables data migration: append-migration carry-over, character-data loss on a miss).

GATE: do NOT execute before the ~7/23 #14987 reconciliation — a migration whose in-game carry-over cannot be observed rides entirely on assumed-play, which is backwards for a data-loss-class op; and the reconciliation should first confirm silos 1-4 behave.

Candidate keys: TemperPotionMaker_SavedVariables, WritWorthyVars, TemperMasterWritInventoryMarker_SavedVariables (see #14325 silo notes for byte-lock context + protections).

If the define-front verdict is permanent-KEEP: document in the residue manifest exceptions + close.
