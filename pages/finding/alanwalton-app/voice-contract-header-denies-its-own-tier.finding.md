---
id: 27d4bcae-4db2-5be4-9715-d32ad7f9f8e3
slug: voice-contract-header-denies-its-own-tier
page-type-slug: finding
title: "Voice contract header denies its own tier"
domain-slug: domain/alanwalton-app
---

# Claim

The header of the module every voice author reads first denies the storage tier that carries most voiced personas: `packages/alanwalton/personas/core/src/voice-spec.ts` lines 6-7 state that "a persona voice is **code, not a data row**, under IaC", while the data tier it denies is fully implemented, shipping, and reached by 24 persona pages.

# Evidence

Read in `~/code` on 2026-08-08 while emptying `dirty/code/packages-alanwalton-personas-docs-voice-separation.md` and its sibling `-voice-storage-tiers.md`.

`voice-spec.ts:5-7` reads: "Per the ratified voice-separation design (see `personas/docs/voice-separation.md` § \"Durable storage of voice specs + centroids\"), a persona voice is **code, not a data row**, under IaC." The section it cites for that reading says the opposite — "two tiers: a *simple* voice = persona-page data + object-store binaries (`ops persona set-voice`, zero repo touch)".

The data tier is not a plan. `personas/core/src/voice-page-data.ts` declares `PersonaVoicePageDataSchema` over nine `voice*` page fields and `buildVoiceSpecFromPageData`, ending in `VoiceSpecSchema.parse`. `personas/cli/src/persona/voice-resolve.ts` falls to the page when no committed fragment exists, fetches `voiceReferenceObject` and `voiceCentroidObject` from SeaweedFS, and assembles a spec validated exactly like a committed one. `ops persona set-voice --help` exits 0 and calls itself "the no-committed-*.voice.ts path".

The population is not small. Measured 2026-08-05: 24 pages carry `voiceReferenceObject` against 19 git-tracked `refs/*.reference.wav`, intersecting at one slug — so 23 personas reach their voice only through the tier this header denies.

Nothing is broken by it: no code reads a comment. `voice-spec.ts` is where `VoiceSpec` itself is declared, so the header is what an author of a new voice meets first.

Two standing findings opened before filing, neither of them this claim: `pages/finding/alanwalton-app/set-voice-writes-under-a-committed-spec.finding.md` (the verb does not guard against an existing fragment) and `pages/finding/alanwalton-app/template-docblock-predates-its-own-siblings.finding.md` (a stale "next wave" line in `stub-example.voice.ts`). A third, on the durability of the S3 copies, was carried off by #17866.
