---
page-type-slug: all-about-alan-finding
id: 9f60db81-8ad4-5c37-bdd9-af1cd47a3388
slug: inference-load-has-no-architecture
title: "Inference load has no architecture"
domain-slug: domain/all-about-alan
---

# Claim

The load the solar project was told to design around is the one nobody has sized. `scope.md` records that the twelve PCs will eventually host significant inference work and requires the system to absorb that step without reworking PV, interconnection or panel. How much of the cluster goes to sustained compute is unanswered, and the range spans the project: one machine adds ~3,900 kWh a year, four ~15,600, twelve ~47,000. The all-twelve case exceeds every PV size considered here.

# Evidence

Read 2026-08-16 across the 41 files of `all-about-alan/projects/solar-power`.

The requirement, `scope.md`: "The 12 PCs will eventually host 'significant inference' workloads. The system architecture should accommodate a meaningful upward step in the computer-load line without requiring rework of the PV / interconnection / service-panel sizing."

The unanswered question, `energy-demand/computers.md`: "Flag to Alan: if any subset of the 12 are intended for sustained GPU compute … it's 24/7 at full GPU TDP, and that subset needs to be itemized." No file itemises it. `scope.md`, which resolved the other flag-loads by name, resolves this one only as "eventually".

The range, `sizing/demand.md`: "| 1 of 12 | +3,900 | | 4 of 12 … | +15,600 | | 12 of 12 | +47,000 |", then: "the *high* scenario (87,000 kWh) already covers the realistic 4-of-12 inference upside … The all-12 inference case (~120k kWh/yr) blows past every PV size considered here — flag it as a separate architecture if it materializes."

Recorded again in `sizing/recommendation.md`: "**All-12-PCs-inference workload** — would push demand to ~120,000 kWh/yr … flag for a future re-architecture." `computers.md` prices the same corner independently at "**~84,000 kWh/yr** (one of these alone is comparable to the entire rest of the house)".

What is claimed to absorb it, `sizing/topology.md`: "Hybrid string + optimizers handles this by expanding the AC-side capacity at the inverter." That covers the panel and the inverter; the array is not covered by it.

Not measured: I did not ask Alan what the machines are for, and nothing here records an answer. I read only this thread and the second-passport thread, not the rest of `all-about-alan`.
