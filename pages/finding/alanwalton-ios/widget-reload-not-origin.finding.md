---
id: 9aba10b6-a351-5a3b-a8a4-c54c44a9865e
slug: widget-reload-not-origin
page-type-slug: finding
title: "Widget reload not origin"
domain-slug: ios-app/alanwalton-ios
---

# Claim

On iOS, a widget reload triggered by `WidgetRefreshPlugin` on app open re-reads a possibly-stale row rather than the underlying origin, so it cannot fix the staleness Alan is feeling; only triggering the origin itself does, and Apple Health active-calories is the strongest candidate since it has a single writer and no second path.

# Evidence

Project #17554, domain `alanwalton-ios`, captured by `amy-lead` 2026-08-02, serving objective 2 of the `ambient-hud` initiative. Never defined: it carried only a capture, moved here from the row's retired `notes` attribute on 2026-08-15.

Alan's ask: "The inbox and claude usage ones on iOS are the ones I'm feeling. Could we sync those on app open in addition to the schedules? In general, I would like all widget values that can be synced on demand to sync on app open."

WidgetRefreshPlugin (native-shell/scripts/apply-ios-seam.sh:1330-1350, gated by NATIVE_SHELL_WIDGET_REFRESH default 1) calls only WidgetCenter.shared.reloadAllTimelines() on didBecomeActive (#17544's audit). A reload re-reads the route, which reads a row; where the row is stale the reload returns the same number sooner, so the fix must trigger the origin, not the widget. No other statement exists in the plugin class, no JS-callable method.

Three pollable origins, measured cost: Claude usage p50 2m26.7s, p95 1h09m, max 2h17m40.3s across 8 accounts, tail from computeStartupDelayMs; on-demand path exists, gated by REPOLL_MIN_INTERVAL_MS/REPOLL_BREAKER_MS, per-process state a trigger must respect. Inbox: inbox-tracking-poll.timer (*:0/5) on Alan's workstation, p50 5m00.0s, max 10m11.5s, dead if workstation down; no phone-initiated path today. Apple Health active calories: HealthKit on phone; a headless App Intent already POSTs to /api/tracking/active-energy; foreground access unrestricted on app open.

activeCalories had zero writes across the whole seven-day window (#17551), one writer only; when it stops the pillar renders black ("Alan did nothing") with no second path, a stronger argument than responsiveness alone. Untested as stated.

Open, unsettled with Alan: trigger frequency/rate-limit; whether a post-draw refresh merits a redraw; behavior when workstation is down.

Out of scope: aggregate values over rows already held, want deleting a timer not adding a trigger, a sibling row's.
