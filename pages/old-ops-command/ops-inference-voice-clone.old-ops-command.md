---
id: 91a0cd7b-f8e2-5011-b55c-c6ac5d3de89d
page-type-slug: old-ops-command
title: "Ops inference voice-clone"
slug: ops-inference-voice-clone
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/inference/voice-clone.ts
path: inference voice-clone
---

# Definition

- **Ops inference voice-clone** — a text spoken in the voice of a reference clip.

# Help

Clone a voice with the moss-tts pool service (MOSS-TTS-8B zero-shot cloning, mlx-audio): speak --text in the voice of a reference clip. With no --ref-audio it uses the deploy-provisioned reference; a custom --ref-audio local WAV is scp-uploaded to the macbook (the server reads ref_audio as a host path, not an upload) and requires --ref-text. Routes through the traffic cop (cold-loading the ~10.5 GB model on first use), writes the 24 kHz WAV, and records an `inference-run` row capturing the recipe (no seed — the model has none). Workstation-only — the macbook must be reachable on the tailnet.
