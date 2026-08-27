---
id: 82b27717-ee43-506b-8c08-121971e8f91f
slug: twi-pov-tagging-parked
page-type-slug: finding
title: "Twi pov tagging parked"
domain-slug: domain/narrative-production
---

# Claim

Speaker/POV/dialogue-vs-narration tagging for The Wandering Inn's full-cast narration is net-new work parked as someday/maybe under the TWI umbrella, blocked behind higher-priority Royal Road reading work rather than by any technical gate.

# Evidence

Project #13729 (domain: narrative-production, status: someday_maybe, live-on: deploy). Captured someday/maybe by aine-intake-alan-2. Carried no objective; this is its capture text, moved off the row's retired `notes` attribute on 2026-08-15.

Child of TWI umbrella #13728 (someday/maybe). Net-new: tag chapter text by speaker/point-of-view/dialogue-vs-narration. Today's segmenter (formatForSpeech, voice/core/src/voice/speech.ts) is speaker-agnostic plain segmentation. An LLM would attribute each segment to a speaker/POV (another bulk-LLM filler-job consumer). Output = per-segment speaker labels that the full-cast compiler (#13731) consumes. Builds on narration #13711 and framework #13710.

The umbrella #13728's review history applies to this child directly: 2026-07-01T14:14:02.026Z REVIEWED → KEEP someday_maybe (aine-intake-alan, Alan-directed review; Alan affirmed "leave someday maybe still, agreed"), covering the whole cluster (#13728 plus #13729/#13730/#13731/#13732). Deliberately not queued — lower priority than all Royal Road work — and not closed, since the dependency shape (this child feeds #13731) is thought through. UN-PARK trigger: when the higher-priority Royal Road reading work is done and TWI full-cast becomes the frontier.

Filed as a finding because this project is not being actively worked; see also the separate findings filed for the umbrella #13728 and siblings #13730, #13731, #13732.
