---
id: 3480de91-ae1e-5fdc-8262-647e937ba14f
slug: watchdog-comments-name-the-wrong-fallback
page-type-slug: finding
title: "Watchdog comments name the wrong fallback"
domain-slug: domain/pages-system
---

# Claim

Six prose sites across four files say the read-aloud startup-stall fallback recomputes to `shell-src`, but the live wiring sends the iOS WKWebView case to `hls-src`.

# Evidence

`use-audio-transport.ts` computes the post-failure transport as `nativeFailedCascade ? isWebKit ? "hls-src" : "shell-src" : transport` — so on the iOS WKWebView, which `isWebKitClient` reports as WebKit, a failed native attempt lands on `hls-src`, and `shell-src` is reached only off-WebKit. The pure decider agrees: `selectTransport` in `transport-selection.ts` returns `hls-src` for a kokoro variant with a resolver, no native plugin and a WebKit engine.

Three comments in `use-native-tts-transport.ts` state the other destination. The `failed` field's doc says the provider drops `hasNativeTts` "so the decider recomputes to `shell-src`"; the header above `STARTUP_STALL_MS` says on expiry it marks the path failed "so the decider recomputes to `shell-src` and the shell-src server-byte fallback FIRES"; the watchdog comment says expiry marks it failed, "which the provider turns into the shell-src server-byte fallback". None names the WebKit branch.

Three more sites outside that file say the same. The module header of `ensure-reader-audio-fixture.ts` reads "the startup-stall watchdog → `shell-src`"; the `help.description` its CLI wrapper exports, printed by `--help`, reads "startup-stall watchdog -> shell-src fallback"; and `playing-session-native.component.test.tsx` carries a comment saying the watchdog "must trip `failed` so the decider recomputes to `shell-src`" and a test NAME saying it "fires the shell-src fallback". That test asserts correctly for its own harness, which is not WebKit, but its name generalizes past what it pins.

They describe the behaviour before #15737 folded the WebKit divert into the decider as data. The file carrying them is the one a reader opens to learn what the watchdog does, and its own module is where the WebKit branch is invisible, so nothing on the failure path states the destination correctly.

A quarantined document under `dirty/code/` had it right. Agreement among six pieces of prose is not corroboration; they rot together because they were written together.
