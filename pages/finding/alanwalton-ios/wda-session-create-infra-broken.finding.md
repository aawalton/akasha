---
id: a58df787-1344-5d4a-9a4e-b8ad1fcf2db5
page-type-slug: finding
title: "Wda session create infra broken"
domain-slug: ios-app/alanwalton-ios
---

# Claim

The post-land iOS sim sweep (`bun ops mobile sim sweep`) fails deterministically at Appium session-create with a WDA 404 — every scenario fails before any scenario code runs — decoupled from the triggering land (confirmed on both a native-shell land, #15781, and a web-only land with zero native surface, #15788), making the native-shell post-land gate non-functional for every land while it persists.

# Evidence

Project #15787 (domain: alanwalton-ios), status someday_maybe, live-on: deploy. No Objective; these notes are the observation.

SYMPTOM. The #15601 managed post-land sim sweep (`bun ops mobile sim sweep`, macbook) came back RED — pass=0 fail=3. Every scenario (warmup, keyboard-geometry, badge-presence, chrome-toggle) failed at Appium SESSION-CREATE: WDA 404, Capacitor bridge never appeared, shell never loaded. Log: /tmp/shell-suite-postland-15781.log.

NOT A CODE REGRESSION. Failure is at session-create — WDA never starts, no scenario code runs. Attributed to #15781 (touched native-shell/ios-widget) but not the cause: deploy sweep strips the widget appex; a WidgetKit change cannot break the Capacitor shell (separate targets); #15781 landed CI-green. astra triaged as infra, bounced to athena (native-shell sim harness).

BEYOND #15738. #15738 (DONE) added warmup + per-scenario retry for a cold-load race. This blew past that retry and logs "a load failure, not a hydration race" — a PERSISTENT WDA-down infra failure, a different class.

IMPACT. While WDA cannot start a session, the post-land sim suite is a non-functional gate for EVERY native-shell land (all lands go UI-unverified). Not a prod outage — post-land tooling only.

FIRST TRIAGE (recorded, not acted on): re-run to confirm persistence; if persistent, triage WDA over ssh (built/installed, stale build, bad simulator/Xcode state, recent version change); decide the durable fix (WDA-health preflight + auto-rebuild, and/or a distinct RED-alert reason so infra failures aren't mis-attributed to the triggering land's owner). Echoes #15776's boot-reconcile false-positive family.

Re-fire (via astra, 2026-07-24T14:42Z): identical WDA 404 signature on #15788's post-land sweep, a WEB-only reader change (play-from-sentence) with zero native-shell surface — confirms pure WDA/Appium infra, decoupled from the project under test, deterministic. Log: /tmp/shell-suite-postland-15788.log.
