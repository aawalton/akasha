---
id: 145ba265-40a5-50ca-8b92-9d59374231e6
slug: gpu-container-tools-repeat-one-unstated-shape
page-type-slug: finding
title: "GPU container tools repeat one unstated shape"
domain-slug: domain/ops-namespace
---

# Claim

Two namespaces carry the same container-tool shape verb for verb, and nothing states the shape, so each one is written out again from scratch.

# Evidence

Measured 2026-08-15, running `review-command` on the `wan` namespace.

`wan` holds `up`, `down`, `provision`, `smoke`, `generate`, `extend`, `frames` and `score`. `zimage` holds `up`, `down`, `provision`, `smoke`, `generate` and `bakeoff`. The five names they share are the whole lifecycle of a local GPU container: build and start it, stop it, download its weights, prove the GPU path, use it.

The bodies match as well as the names do. Both `up` verbs build a `<tool>:local` image if absent and start a loopback-only rootless podman container. Both `provision` verbs pull weights into a host volume idempotently and print a skip line per file. Both read a `<TOOL>_IMAGE`, `<TOOL>_HOME` and `<TOOL>_PORT` environment variable with the same defaults pattern. Both talk to ComfyUI on a loopback port.

Both also repeat the same VRAM constraint in help prose rather than reading it from anywhere: `wan generate` says "one GPU workload at a time, never alongside ai-toolkit training", `wan extend` says it shorter, and `zimage bakeoff` says "one GPU workload at a time on the 16 GB card". `packages/infra/upscale/bin/upscale-seedvr2.sh` opens with a fourth wording of it. That half has a home as of this run — `domains/infra.md` now carries it — but nothing carried it before, and each author wrote it again.

A third tool, `upscale`, runs the same container pattern from a shell script with no namespace at all.

Not measured: whether the two `up` bodies could share one implementation, or only one document. The finding is about the missing document.
