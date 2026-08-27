---
id: 513e6ba9-b2e6-5274-a1ba-5f3a6a21e15c
page-type-slug: finding
title: "Mini player stuck on failure"
domain-slug: domain/reader
---

# Claim

In the reader's playing-session-context, `canToggle` stays false for the life of the session after a hard load failure, because the web audio element's `playing` event never fires and its `error` event only clears `isWaiting` — leaving the mini-player mounted with a permanently spinning loader and a "Generating audio..." label over a track that will never play.

# Evidence

Project #16179, domain `reader`, status `someday_maybe`, no formal objective; moved off the row's retired `notes` attribute 2026-08-15. Found during the #16091 land review (astra, 2026-07-25); sibling of #16157.

Mechanism: `playing-session-context` resolves `canToggle` as `effectiveNative ? native.playbackStarted : webPlaybackStarted`. `webPlaybackStarted` is set only by the audio element's first `playing` event. On a hard load failure (media URL 404, decode failure, network drop during initial load), `playing` never fires, so `canToggle` stays false for the session's life; the element's `error` event clears only `isWaiting`, so nothing deactivates the session and the bar stays mounted.

Symptom: mini-player shows a permanently spinning `Loader2`, label reads "Generating audio..." forever, transport disabled, over a track that will never play.

Not caused by #16091: before that change the same path showed an inert Play icon that silently did nothing — #16091 substitutes one lie for another, net-positive on the prepare window it fixes, net-neutral here, not a regression, which is why #16091 landed rather than blocking.

Why `canToggle` is not the thing to change: false is the honest capability answer on a failed track. The defect is the LABEL, claiming generation is in progress when nothing is. Fix needs an error state distinguished from the prepare state — a new field on the session context plus plumbing — not a predicate tweak.

Related: the native path is already covered by the fallback cascade (native failure flips `effectiveNative` false, switching canToggle's source to the web element) — it's the web element error alone that's unhandled. Also #15997 (`use-reader-active-marks` fetches a relative `/api/media` URL, missing `API_ORIGIN` on `capacitor://localhost`) is a live known-bad path into this state.

Deferred: Alan stated audio is not his current priority and will open his own successor project. File only; do not start.
