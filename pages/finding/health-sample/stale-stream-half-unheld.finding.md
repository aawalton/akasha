---
id: 9604a10c-c6af-55a6-ac49-e2ec30330656
page-type-slug: finding
title: "Stale stream half unheld"
domain-slug: page-type/health-sample
---

# Claim

The other half of the defect Alan reported on 2026-08-10 — his cardio reading stale because the sample stream had not posted for hours — is held by nobody, while the half beside it has a project.

# Evidence

Alan logged a strength session and reported that his activity circle did not move. Two independent causes were found in the reading, not one.

The first is that the circle sums nothing: it reads active calories out of the HealthKit samples and nothing `ops exercise` writes reaches it. That has a project, 18498, dispatched on 2026-08-10.

The second is that on the day he reported it, the sample stream had last posted hours before the session, so the cardio term was stale on its own account. 18498's Notes record this and correctly place it outside that project's scope: it belongs to the iOS App Intent that posts samples rather than to the seam that reads them.

Nothing holds it. Eighty-one open project rows were read on 2026-08-10 and none names the sample stream, the App Intent or a stale posting window. The findings already standing under `alanwalton-app` are about seam-script residue and an import warranted by a retired seam, neither of which is this.

Where it was written down is the problem. A project document is deleted when the project completes, so the only record of this observation goes with 18498 when 18498 closes — and the seat that closes it will have been told, correctly, that this was never its to chase.

What it costs: 18498 makes the activity circle sum both pillars, and Alan will still see a reading that does not move on any day the stream is quiet. He would report the same symptom a second time against a circle that had just been repaired, which is the case `domains/readouts.md` states he should never be the instrument for.
