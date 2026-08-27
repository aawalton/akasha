---
id: b1653600-293c-5538-9b3b-b902eb5a26ff
page-type-slug: finding
title: "Set voice writes under a committed spec"
domain-slug: domain/alanwalton-app
---

# Claim

`ops persona set-voice` writes a persona's data-tier `voice*` fields with no check for a committed `<slug>.voice.ts`, and `resolveVoiceSpec` returns any committed spec without reading the page — so the write succeeds, reports success, and changes nothing at resolution.

# Evidence

`packages/alanwalton/personas/cli/src/persona/voice-resolve.ts` resolves file tier first: `const fileSpec = await getVoiceSpec(slug); if (fileSpec !== undefined) return fileSpec`, above the page read. Its header states "FILE OVERRIDE WINS ... returned untouched, no page read, no object-store fetch".

`packages/alanwalton/personas/cli/src/persona/set-voice.ts` never calls `getVoiceSpec`. `rg -n "getVoiceSpec|committed|voice-manifest|fragment"` over that file returns two hits and both are prose: line 3 in the docblock and line 41 in the `--help` description, each saying "the no-committed-*.voice.ts path". The verb does enforce its other invariants at the write boundary — lines 198-212 throw `DataError` on a lane/source mismatch, on designed-without-instruct and on real-with-instruct — so the absent guard sits beside three present ones.

`ops enforcement list` reports 232 mechanisms and the only persona one is `check-persona-seam`, scoped in its own comment to the `persona-specs` directory rather than to voice.

16 personas carry a committed `<slug>.voice.ts` under `packages/alanwalton/personas/core/src/voice-specs/`, so the population the silent write can land on is not empty.
