---
id: 8257c280-be32-5a58-9e62-97756e98b16f
slug: native-audio-transport-gaps
page-type-slug: finding
title: "Native audio transport gaps"
domain-slug: ios-app/alanwalton-ios
---

# Claim

The native audio transport in the AlanWalton iOS shell has three connected gaps left from mirroring web: `playFromSeconds` (`playing-session-context.tsx:463`) is never native-swapped and drives an `<audio>` element whose `src` is null under native; `use-reader-active-marks.ts:50` fetches a relative URL that resolves wrong under capacitor, so marks are always `[]` in the shell; and the plugin's `getState()` has zero JS callers, so nothing reconciles the JS mirror against the engine.

# Evidence

Project #15997 (domain `alanwalton-ios`). Carried no objective — captured but never defined; moved off the row's retired `notes` attribute on 2026-08-15.

Three defects found by worker-15906 while tracing #15906, captured as one project rather than three because fixing any in isolation routes into the others; the native audio transport was built by mirroring the web one and several limbs were never connected.

1. `playFromSeconds` is never native-swapped: at `playing-session-context.tsx:463`, `seekBy`, `togglePlay`, `isPaused` and `stop` all carry an `effectiveNative ? … : …` ternary, but `playFromSeconds` does not — it unconditionally drives the `<audio>` element, which under native has `src === null`. Native has no absolute-seconds seek path at all.

2. `use-reader-active-marks.ts:50` fetches a relative `/api/media` URL: on `capacitor://localhost` a relative `/api/...` resolves against the local SPA server, not `API_ORIGIN` — same class already fixed for audio playback in #15686 and the offline downloader in #15757. Consequence: sentence marks are always `[]` in the shell, so every long-press pick takes the `ungenerated` branch; upstream of #15906's user-visible route. Fixing it routes into defect 1, since marks need a working absolute-seconds seek.

3. `getState()` has zero JS callers: the plugin exposes it and nothing calls it, so the JS mirror never reconciles against the engine — exactly what let the two diverge silently in #15906, where the plugin asserted `playing:true/generating:true` over an empty-graph engine and JS believed it.

Related, tracked separately: #15976 — native-crash capture stores only abort frames and no build SHA; same underlying story but instrumentation rather than transport.

Provenance: all three anchors verified by worker-15906 during the #15906 trace; astra reviewed and accepted the one-project framing. Anchors line-accurate as of `origin/main @ 2026-07-25`.
