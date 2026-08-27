---
id: e1ef6281-42e2-5c47-9bbe-b1c2de52569b
slug: stalled-latches-waiting-flag
page-type-slug: finding
title: "Stalled latches waiting flag"
domain-slug: domain/reader
---

# Claim

The shared read-aloud isWaiting flag in playing-session-context.tsx is derived purely from event edges rather than re-derived from element state, so a single network-level stalled event latches it true for the rest of the track even while playback continues normally.

# Evidence

Found while driving #16091 (worker-15906c). iOS sim, real chapter: 23 of 24 samples showed the wait affordance while demonstrably playing (paused=false, readyState=4, currentTime at 1.00x wall clock on a 1263.72s track).

Mechanism, proven deterministically: playing-session-context.tsx:403-424 sets the flag off event edges, no re-derivation — markWaiting on loadstart/waiting/stalled/emptied; markReady on canplay/playing/error/ended. stalled is network-level (UA fetched nothing ~3s), not playback stopping, but sets the flag. canplay/playing re-fire only if the element first stops rendering frames; an element playing through a stalled never fires either again, latching the flag for the rest of the track.

Two defects: (1) edge-accumulating derivation, no re-derivation (latch); (2) wrong input — network-activity event wired to a playback-waiting flag, when the test should be element readiness.

Repro (component harness, ~1s, no simulator, no native adapter — not #15997's native-half-wiring): web session, dispatch canplay, stalled, 5x timeupdate+progress with currentTime advancing. Result: after canplay waiting=false; after stalled waiting=true; after 5x timeupdate waiting stayed true, control stayed disabled.

The one contradicting sim sample confirms it: samples 5-6 were a genuine stall (readyState 2, currentTime froze at 42.23), so playing legitimately re-fired, clearing the flag at sample 7 — the single correct reading in 24.

Approach, approved by astra: re-derive the flag from element state each relevant event rather than accumulate edges; do not just add timeupdate as another clearing edge (still a latch, longer fuse). Delta to scrutinise: a genuine mid-track rebuffer, the only place re-derivation can regress.

Blast radius: shared/pages-ui, every read-aloud consumer. Not blocking #16091: its corrected predicate no longer reads isWaiting — degrades to a spinner that won't stop, cosmetic not a stolen control. Project #16102, someday_maybe, deploy, domain reader.
