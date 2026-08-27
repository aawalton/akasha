---
id: f72d7865-e4f7-5199-bfa8-4c7eb21da960
slug: filler-drain-psi-gate-retired
page-type-slug: finding
title: "Filler drain psi gate retired"
domain-slug: domain/code-quality
---

# Claim

Two comments in the supervisor describe the host memory admission gate as "the 8 GB floor + PSI gate". The gate has no PSI leg. `memory-guard.ts`, the decider both comments name, records that an independent sustained-PSI leg was retired after false-refusing twice with 20–30 GB free, and states "MemAvailable alone decides". A reader of the filler-drain path is told PSI can refuse a filler job, and it cannot.

# Evidence

The authority, `packages/shared/utils/system/src/memory-guard.ts`, in the docblock directly above `assessSpawnAdmission`:

> History: the gate's proxy legs have a trajectory of false-refusing with abundant RAM and being walked back — a bare SwapFree floor, then a PSI-corroborated swap branch, a 16 GB then 12 GB then 8 GB near-floor ceiling, and finally an independent sustained-PSI leg that false-refused twice at PSI 0.61%/0.97% with 20–30 GB free (ordinary reclaim churn, not thrash). All of them are retired here; MemAvailable alone decides. PSI and SwapFree remain *displayed* by the read verb as diagnostic context, but no longer gate.

The same file says it twice more: the `MemPressureStats` docblock notes the decider "does not read any PSI value", and `readMemPressureStats` notes the "gate no longer reads PSI, so a missing PSI file never affects admission".

The two that contradict it, both naming `readHostMemoryPressure` — the same function:

- `packages/agents/supervisor/src/filler-drain-tick.ts:20` — "host-memory-admits — `readHostMemoryPressure` (the 8 GB floor + PSI gate, identical to the agent-spawn admission gate)".
- `packages/agents/supervisor/src/supervisor-filler-drain-decide.ts:31` — "`memoryAllows` — `readHostMemoryPressure(\"filler job\").decision.allow`, the same 8 GB-floor + PSI gate the agent-spawn admission enforces."

Confirmed against the running verb: `ops system memory-pressure` printed `PRESSURE no` with `reason  host: 18.5 GB MemAvailable (>8 GB)` while `PSI_some avg60=0.12` and `PSI_full avg60=0.08` were non-zero. The reason line names MemAvailable and the floor and nothing else.

The stale reading is the dangerous direction here rather than the harmless one: PSI legs were retired because they false-REFUSED, so a reader who believes PSI still gates will read an ordinary-churn PSI figure as an explanation for a refusal that never happened, or hold back a filler job the gate would have admitted.
