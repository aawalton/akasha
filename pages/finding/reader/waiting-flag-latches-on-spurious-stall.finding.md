---
id: 6ca33a39-0a48-5e93-9bc4-97d6ab8f13c9
slug: waiting-flag-latches-on-spurious-stall
page-type-slug: finding
title: "Waiting flag latches on spurious stall"
domain-slug: domain/reader
---

# Claim

`isWaiting` on `PlayingSessionContextValue` derives only from media event edges and, once a spurious `stalled` event fires without a later transition event, latches true for the rest of the session even while playback continues normally.

# Evidence

Filed as project #16157, domain `reader`, status `someday_maybe`. Found while reviewing #16091; filed separately so #16091 could ship on a monotonic predicate instead.

**Mechanism.** `packages/shared/pages/ui/src/media/playing-session-context.tsx:403-424` sets `markWaiting` on `loadstart, waiting, stalled, emptied` and `markReady` on `canplay, playing, error, ended`. `stalled` is a network event (fetch went quiet, not that audio stopped) and can fire while playback continues. `canplay`/`playing` are transition events that don't re-fire through uninterrupted playback. So one spurious `stalled` sets the flag and nothing clears it.

**Repro** (component harness, worker-15906c): canplay -> isWaiting false; stalled -> isWaiting true; five timeupdate events with currentTime advancing -> still true, control still disabled.

Of 24 observed sessions only 1 recovered (a genuine stall where `playing` re-fired); the other 23 were spurious `stalled` with no clearing event. Not a member of #15997: repro uses no native adapter, so this is the web `<audio>` path.

**Fix shape (not implemented).** Re-derive from element state (`readyState`, `paused`, `currentTime` progression, `buffered`) rather than adding another clearing edge, since a state-derived predicate cannot latch. Acceptance needs a two-directional guard: not-waiting for the spurious-stalled sequence above, still waiting for a real rebuffer where currentTime does not advance.

**Blast radius.** `isWaiting` is consumed wherever prepare/rebuffer state shows. #16091 deliberately does not consume it (gates on monotonic `playbackStarted`), so this did not block #16091. Fixed, the mini-player could additionally show a genuine mid-playback rebuffer state.

Carried no objective; text is its capture, moved off the row's retired `notes` attribute on 2026-08-15.
