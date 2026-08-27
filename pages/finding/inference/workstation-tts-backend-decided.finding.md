---
id: 1456eee8-ff48-5c24-b522-81a3bfe42ad7
slug: workstation-tts-backend-decided
page-type-slug: finding
title: "Workstation tts backend decided"
domain-slug: domain/inference
---

# Claim

A workstation TTS backend for narration was designed against a written go-live choreography and a three-guarantee GPU lock contract with sophia, with the backend decided as PyTorch-8bit over a GGUF fork on measured VRAM headroom, but the container was not yet built or made live.

# Evidence

Project #15582 (domain: inference), status someday_maybe, live-on: deploy. Carried no `# Objective`; these notes are the observation.

Forked from #15573 scope 2 (worker's stop was correct: unverified GPU code touching sophia's live zimage path, needs a live-GPU window). SPEC = packages/infra/inference/docs/workstation-tts.md (on main): llama.cpp GGUF 8B-in-8GB quant, /v1/audio/speech continuation-mode prefix semantics (#15102 prosody contract), load->render->UNLOAD around zimage's 12.47GB resident model, cross-process GPU lock (sophia coordination required — echo pinged her), drainer-owned model lifecycle, containerized like zimage for #15580 teardown.

GO-LIVE CHOREOGRAPHY (from #15573's verdict note, order load-bearing): container live+verified -> MOSS_TTS_BASE_URL on filler-drain.service -> EAR-CHECK GATE (pause after first rendered chapter/narrator, evidence to echo) -> enqueue Violet Hour ch1 (019f699f-4fec-7ca1-bdfe-59222d7bfd88, narrator=ione) at negative priority -> only then echo enables systemctl. Ear-check order: ione's chapter first, then erin's TWI ch759.

SOPHIA'S LOCK CONTRACT (2026-07-16, written, diff review waived if encoded verbatim): (1) zimage waits at most one in-flight TTS unit+unload, TTS never starts new work while zimage waits (cadence ~6 sequential renders/~63s each). (2) WAIT-AND-LOG never timeout-and-error, no retry on her path. (3) BYTE-IDENTICAL no-TTS path. ECHO'S RULING: chapter-long lock (~1hr) breaches (1) ~60x, so lock is SEGMENT-granular, worst-case delay = one segment + unload. Anything awkward routes back through echo; #15580 teardown must restore zimage byte-identical.

BACKEND DECISION (echo, decide-by-default, 2026-07-16): PyTorch-8bit PRIMARY, GGUF fork skipped (kept as documented speed option). Measurement (nvidia-smi, zimage live): card 16303 MiB total, zimage 11830 MiB resident, desktop ~417 MiB (falsifying #15573's "~5GB desktop" estimate), driver 445 MiB, free 3277 MiB. Usable after zimage evicted: ~14.4 GB.
