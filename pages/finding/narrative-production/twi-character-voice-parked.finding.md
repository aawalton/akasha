---
id: db83b709-5a17-5875-94e2-696d4cc36c7b
page-type-slug: finding
title: "Twi character voice parked"
domain-slug: domain/narrative-production
---

# Claim

A character entity and dynamic persistent per-character voice for The Wandering Inn's full-cast narration is net-new work — no character page-type or roster exists today — parked as someday/maybe under the TWI umbrella and blocked by priority rather than by a technical gate, since the underlying voice-design plumbing already exists.

# Evidence

Project #13730 (domain: narrative-production, status: someday_maybe, live-on: deploy). Captured someday/maybe by aine-intake-alan-2. Carried no objective; this is its capture text, moved off the row's retired `notes` attribute on 2026-08-15.

Child of TWI umbrella #13728 (someday/maybe). Net-new character entity (no character page-type / roster exists today) plus dynamic persistent per-character voice. On a character's first appearance, auto-design a voice from a description via the existing `bun ops inference voice-design --instruct .. --text ..` (VoxCPM2/Qwen3-TTS), persist it via `ops persona set-voice` (voiceReferenceObject + centroid on a voice/persona row), and map it to the character so it is reused consistently across all chapters. Voice-creation plumbing exists; the character entity, the auto-mint-on-first-appearance behavior, and the character↔voice mapping are new. Feeds the full-cast compiler in sibling #13731.

The umbrella #13728's review history applies to this child directly: 2026-07-01T14:14:02.026Z REVIEWED → KEEP someday_maybe (aine-intake-alan, Alan-directed review; Alan affirmed "leave someday maybe still, agreed"), covering the whole cluster (#13728 plus #13729/#13730/#13731/#13732). Deliberately not queued — lower priority than all Royal Road work — and not closed, since the dependency shape is thought through. UN-PARK trigger: when the higher-priority Royal Road reading work is done and TWI full-cast becomes the frontier.

Filed as a finding because this project is not being actively worked; see also the separate findings filed for the umbrella #13728 and siblings #13729, #13731, #13732.
