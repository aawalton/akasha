---
id: f1ebce5b-3967-5115-bc01-efe0e6daed64
page-type-slug: ops-command
title: "Ops inference upscale"
slug: ops-inference-upscale
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/inference/upscale.ts
path: inference upscale
---

# Definition

- **Ops inference upscale** — one image upscaled by SeedVR2, on the cluster GPU unless the caller asks for the workstation.

# Help

Upscale an image with SeedVR2 v2.5 — the skin-realism recipe that replaced the macbook MLX path (#14548). By DEFAULT runs on the cluster RTX 3080 Ti (node-06) as an on-demand k8s Job (#14626): stages the source into the SeaweedFS `upscale` bucket, creates a one-shot GPU Job that runs the one-step SeedVR2 v2.5 upscale (7B mixed-FP8, color_correction=lab, stage-1 clean — no SRPO) and self-reaps, then reads the result back — no idle GPU is held. `--host workstation` runs the same recipe on the local RTX 5080 podman container instead (fast when Alan's box is idle; requires the stage-1 weights provisioned once via `infra/upscale/bin/upscale-provision.sh seedvr2`). Either way records an `inference-run` row (host `cluster-3080ti` / `workstation`).
