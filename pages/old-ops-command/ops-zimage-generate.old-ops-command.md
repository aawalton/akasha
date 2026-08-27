---
id: 55373d56-e810-58c9-a217-314a771e190d
page-type-slug: old-ops-command
title: "Ops zimage generate"
slug: ops-zimage-generate
domain-parent-slug: domain/ops-zimage
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/zimage/generate.ts
path: zimage generate
---

# Definition

- **Ops zimage generate** — one image off a registered checkpoint on the workstation container, written to a named path.

# Help

Generate one image on the workstation ComfyUI container (RTX 5080) and write it to --output. Renders any registered checkpoint via --model (z-image-turbo, the house distill the macbook mflux pool also serves). The CUDA fast-path drop-in for the macbook mflux Z-Image path used by the LoRA-eval rig: it accepts the SAME flag contract mflux-generate does (--base-model / --prompt / --width / --height / --steps / --guidance / --lora-paths / --lora-scales / --seed / --output), so wiring it into the rig is a matter of pointing EVAL_GEN_BIN at a shim that execs this command — no edit to lora-eval.sh's $GEN invocation. A LoRA checkpoint passed via --lora-paths is staged into the container's loras/ volume and spliced in DiT-only for evaluation. Requires the container up (`infra/zimage/bin/zimage-up.sh`) and weights provisioned (`infra/zimage/bin/zimage-provision.sh`).
