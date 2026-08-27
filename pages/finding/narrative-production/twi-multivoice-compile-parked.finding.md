---
id: adca37c0-78ca-5bcb-8d35-e2f755669581
page-type-slug: finding
title: "Twi multivoice compile parked"
domain-slug: domain/narrative-production
---

# Claim

Multi-voice full-cast chapter-audio compilation for The Wandering Inn is net-new work — today's render path is one-voice-per-render — parked as someday/maybe under the TWI umbrella, dependent on siblings #13729 and #13730 landing first, and blocked by priority rather than by a technical gate.

# Evidence

Project #13731 (domain: narrative-production, status: someday_maybe, live-on: deploy). Captured someday/maybe by aine-intake-alan-2. Carried no objective; this is its capture text, moved off the row's retired `notes` attribute on 2026-08-15.

Child of TWI umbrella #13728 (someday/maybe). Net-new multi-voice compilation. Today renderAndCacheMedia is one-voice-per-render (segment→WAV→concat loop fixed to one spec; cache key per (pageId,medium,variant)). Needed: per-segment speaker→character→voice resolution, a speaker-boundary-preserving segmenter (or formatForMultiVoiceSpeech), a render loop parameterized by voice per segment (loop already sequential, so low lift there), and a cache-key redesign for multi-voice renditions. Compiles the full-cast chapter audio. dependsOn the POV-tagging child #13729 and the character-voice child #13730.

The umbrella #13728's review history applies to this child directly: 2026-07-01T14:14:02.026Z REVIEWED → KEEP someday_maybe (aine-intake-alan, Alan-directed review; Alan affirmed "leave someday maybe still, agreed"), covering the whole cluster (#13728 plus #13729/#13730/#13731/#13732). Deliberately not queued — lower priority than all Royal Road work — and not closed, since the dependency shape (this child needs #13729 and #13730) is thought through. UN-PARK trigger: when the higher-priority Royal Road reading work is done and TWI full-cast becomes the frontier.

Filed as a finding because this project is not being actively worked; see also the separate findings filed for the umbrella #13728 and siblings #13729, #13730, #13732.
