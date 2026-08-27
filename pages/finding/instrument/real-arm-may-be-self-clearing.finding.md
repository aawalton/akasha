---
id: 0269581e-d109-5388-aa66-913bc5e23066
page-type-slug: finding
title: "Real arm may be self clearing"
domain-slug: domain/instrument
---

# Claim

`hooks-delivered` may split `real` from `selfClearing` on a premise its composer does not support: a degraded composition needs `settings/agents.json` unreadable at spawn, and the check cannot print at all unless that file is readable now — so some of what it refuses on may be self-clearing and the refusal line sits in the wrong place.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/hook-missing-from-payload.md` dispatched from `review-documents`. The reading raised it as bigger than the prose and repaired only the sentence.

`tools/checks/hooks-delivered.ts` splits the two arms on "whether writing anything here could close it". The reading measured the composer instead: `packages/agents/supervisor/src/supervisor-spawn-settings.ts` reads `settings/agents.json` fresh at every spawn and its overrides carry no hooks. It called `materializeSpawnSettings` against the live file for both override values and diffed each result with this check's own `divergences()` — missing=0, extra=0 both times, at digests byte-identical to the two payloads the fleet carries now.

So a seat cycled at the moment either real-arm body prints gets a clean payload, and cycling is the lever rather than the thing that fails. The reading argues this is general rather than a fact about today: `hooksDelivered` cannot reach any refusal unless `settings/agents.json` is readable, so whatever degraded the payload has lifted by the time the body prints.

What the classification's own comment rests on is a different case, and a measured one — four seats found carrying, entry for entry, what this repository registered nine minutes before its mirrors were repointed. That is the file moving under a live payload, not a degraded composition.

Not measured: whether every path into the real arm is transient this way, or what the split would look like if the two causes were separated rather than merged.
