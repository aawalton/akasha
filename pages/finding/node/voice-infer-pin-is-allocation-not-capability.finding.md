---
id: 7de74303-5aaf-5af2-803f-a50fbea58098
slug: voice-infer-pin-is-allocation-not-capability
page-type-slug: finding
title: "Voice infer pin is allocation not capability"
domain-slug: domain/node
---

# Claim

voice-infer's `nodeName` pin to node-02 has no honest hardware-capability attribute that reproduces it: its stated Pascal-sm_61 reason does not survive observation, and the honest >=8GiB-VRAM alternative would let it reschedule onto node-06 and permanently starve upscale. Which node loses its GPU to a resident Deployment is an allocation decision, not a hardware-capability one, so it stays a named, approved exception in `check-k8s-node-selector` pending a mechanism.

# Evidence

Source: #16060 (domain: `node`), `someday_maybe`. No objective — captured, never defined; retired 2026-08-15. Split out of #16049.

voice-infer pins to node-02 with `nodeName` (`packages/infra/voice-infer/k8s/synth.ts:103`), bypassing the scheduler. #16049 bans `nodeName` via `check-k8s-node-selector`; voice-infer is held as one recorded, allowlisted exception since no honest attribute expresses its actual requirement.

**Why #16049 could not fix it (observed):** `Containerfile.cu121:16-18` states Pascal sm_61 as the card it landed on, but torch's kernels are prebuilt in the wheel and ignore this; it affects only an nvcc source-compile, which the publish script does not do — no compute-capability requirement, only the card it landed on. Footprint: 5566 MiB resident, 2d13h uptime — eligible on {node-01, node-02, node-06} at >=8GiB. The only attribute reproducing node-02 alone is `compute-cap == 6.1`, a hostname pin under a nicer name — rejected. The honest attribute (>=8GiB VRAM) is dangerous: voice-infer holds a GPU indefinitely, so rescheduling onto node-06 would permanently starve upscale (node-06's 11.62GiB is the only fit for upscale's 6-7.2GB) — a permanent outage, worse than the bug fixed.

**The real shape:** which node loses its GPU to a resident Deployment is an allocation decision, not a capability one.

**Mechanisms weighed, none chosen:** a GPU taint on node-06 plus a toleration upscale alone carries (new cluster-wide pattern, an Alan gate); a PriorityClass letting upscale preempt voice-infer; widening to {node-01, node-02}; or leaving it pinned if genuinely static.

**Interim state owned here:** the `check-k8s-node-selector` allowlist entry exempting this file, approved by dalla; closing this row removes it.

**Domain guidance (athena's ruling #16077):** declined for Global Principles — correctness and economics limits bind at the same threshold today; "wrong" belongs in a hard constraint, "slow" in a soft preference or nothing.
