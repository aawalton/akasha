---
id: 75ab8524-613a-5e97-955e-448d3d3489c1
page-type-slug: ops-command
title: "Ops inference capabilities"
slug: ops-inference-capabilities
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/inference/capabilities.ts
path: inference capabilities
---

# Definition

- **Ops inference capabilities** — the host's image services, and the image tools that exist only inside their environment.

# Help

List the macbook's image capabilities — the declared HTTP pool services (image-gen / image-edit-*) AND the env-local `mflux-*` batch CLIs (generate, train, …) that ship transitively with the `mflux` pip dep but appear on no PATH and in no repo file. The mflux surface is live-queried from the host over SSH, so it never drifts as `mflux` upgrades. Read-only. (Upscaling is no longer an mflux batch CLI — it moved to the SeedVR2 CUDA route, `ops inference upscale` / `@infra/upscale`, which runs the cluster RTX 3080 Ti by default with a `--host workstation` opt-in; see #14548/#14626.)
