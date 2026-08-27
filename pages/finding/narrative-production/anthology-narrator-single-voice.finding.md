---
id: 511795d3-4be9-53bb-8a18-50903c4d8acd
page-type-slug: finding
title: "Anthology narrator single voice"
domain-slug: domain/narrative-production
---

# Claim

Narration voice on an anthology's `authored-story` row is declared once, at story granularity, via a single `narrator` slug — correct for a continuous narrative where one voice reads the whole book, and wrong for any anthology whose chapters differ in who is speaking or who is being read.

# Evidence

Project #17348, domain `narrative-production`. Captured from Alan's note on the Mari persona page's `alanNotes`: "chapter-specific narrator overrides." Surfaced by the define run on #17344, which read it, judged it out of scope there, and routed it here rather than absorbing it — that call stands, it serves the audio rail, not the trial record.

Instance: the `Close Range` anthology (`close-range`) is a persona-scene anthology, one chapter per persona, each a different subject. Its `authored-story` row carries `narrator: mari`, a voiced persona slug that resolves correctly for one chapter and is wrong for every other chapter.

End state envisioned: a chapter can declare the voice it is narrated in, a story-level voice remains the default for chapters that declare none, and `story prerender-audio` resolves per chapter.

What is already built (this is arousal's ranked gap #2 — adopt the existing rail rather than building one): `story prerender-audio` exists and renders persona-voiced narration per chapter or per story off the story-chapter `mediaConfig`; `bun ops persona set-voice` authors voices and `resolveVoiceSpec` reassembles the spec at runtime.

Known blocked, separately: chapter covers. `story prerender-image` requires a `story-chapter-image` row carrying a `prompt`, and the #17344 define run found no surviving command that creates one. Same ranked gap, different state of readiness.

Not this: multi-voice narration within one chapter (a subject's own dialogue in her own voice against a narrator in another) is a further step.

Bound: a capture, not a commitment — it went through none of the define acts. Whether the override belongs on the chapter row, on `mediaConfig`, or somewhere the rail already reads is exactly what a definition pass would settle. Row carried no objective; moved off the row's retired `notes` attribute on 2026-08-15.
