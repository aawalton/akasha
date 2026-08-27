---
id: e7450491-0a3a-5834-895c-63d031f9587a
slug: twi-full-cast-parked
page-type-slug: finding
title: "Twi full cast parked"
domain-slug: domain/narrative-production
---

# Claim

The Wandering Inn full-cast narration and per-volume illustration umbrella is a well-structured but explicitly lower-priority-than-all-Royal-Road-work someday/maybe cluster, deliberately not queued so its leaf children cannot pull fleet capacity ahead of higher-priority reading work.

# Evidence

Project #13728 (domain: narrative-production, status: someday_maybe, live-on: deploy). Captured someday/maybe by aine-intake-alan-2. Carried no objective; this is its capture text, moved off the row's retired `notes` attribute on 2026-08-15.

UMBRELLA for The Wandering Inn (TWI) as the extreme-scale instance of the in-app reading/narration/illustration stack — 16M+ words, 10 volumes, huge cast. Builds on narration #13711, filler-job framework #13710, priority hierarchy #13721, auto-illustration #13720. TWI is third-party READ content, not awen-authored, so the awen cover acceptance gate does not apply.

ILLUSTRATION SIDE: same as #13720, differing only by volume (10 volumes shift visually) — child #13732.

NARRATION SIDE (the real divergence): full-cast production instead of single-narrator, three layers:
1. POV/speaker tagging — net-new, an LLM tags text by speaker/POV/dialogue-vs-narration — child #13729.
2. Dynamic persistent per-character voice — voice-design CLI exists (`ops inference voice-design`, persisted via `ops persona set-voice`); net-new is a character entity plus auto-mint-on-first-appearance — child #13730.
3. Full-cast compilation — render is one-voice-per-render today; needs per-segment speaker→character→voice resolution, a boundary-preserving segmenter, and a cache-key redesign — child #13731 (dependsOn #13729, #13730).

2026-07-01: REVIEWED → KEEP someday_maybe (aine-intake-alan, Alan-directed; Alan affirmed "leave someday maybe still, agreed"). Applies to the whole cluster (#13728 + #13729/#13730/#13731/#13732). Deliberately NOT queued (lower priority than ALL Royal Road work — queuing would let leaf children pull fleet capacity ahead of higher-priority reading work) and NOT closed (well-structured vision, real dependency shape). UN-PARK TRIGGER: when Royal Road reading work is done and TWI full-cast becomes the frontier.

Not actively worked; see also findings for children #13729, #13730, #13731, #13732.
