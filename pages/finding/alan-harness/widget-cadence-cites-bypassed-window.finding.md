---
id: ceef2c12-ac4b-5991-9c9c-e1250a73d14a
page-type-slug: finding
title: "Widget cadence cites bypassed window"
domain-slug: domain/alan-harness
---

# Claim

The iOS widget provider refreshes on a fifteen-minute timeline justified by a comment saying it "matches the endpoints' cache window". The five endpoints it names serve `max-age=300`, and the same file's own fetch sets `.reloadIgnoringLocalCacheData` three dozen lines below, so the cited window is both a third of the interval and bypassed by the only client citing it. Nothing compares the two numbers, so either side can move without the other noticing.

# Evidence

Read against `~/code` at `ecf5f9518f`, which is `origin/main`.

`packages/alanwalton/native-shell/ios-widget/WidgetFeed.swift:110-113` sets the timeline: "~15 min is the practical floor for WidgetKit's refresh budget and matches the endpoints' cache window." Then `Calendar.current.date(byAdding: .minute, value: 15, to: now)`, falling back to `now.addingTimeInterval(900)`.

The five endpoints are declared one per widget — `ClaudeUsageWidget.swift:19`, `InboxStoplightsWidget.swift:110`, `HabitStoplightsWidget.swift:111`, `ValuesStoplightsWidget.swift:128`, `ProjectCountsWidget.swift:65`. All five routes set the same header: `packages/alanwalton/web/app/routes/api.claude-usage.ts:29`, `api.habit-stoplights.ts:32`, `api.values-stoplights.ts:29`, `api.project-counts.ts:47` and `api.inbox-stoplights.ts:30` each return `{ headers: { "Cache-Control": "public, max-age=300" } }`.

So the window is 300 s and the interval justified by matching it is 900 s.

The second half is in the same file. `WidgetFeed.swift:141-142` sets `request.cachePolicy = .reloadIgnoringLocalCacheData`, so the widget declines the cache whose window is the stated reason for its cadence. The header is not in this path at all.

WHY THIS IS MORE THAN A WRONG COMMENT. The comment is the only stated warrant for the constant, and it warrants by neighbouring constant rather than by what being late costs. That shape has no observable failure: raising `max-age` to fifteen minutes, or dropping the timeline to five, would each make one side true and neither would be flagged, because nothing reads both.

Not measured: I did not observe the refresh cadence on a device, and did not check whether an intermediary honours the header.

Found ingesting `dirty/code/docs-ambient-hud-staleness.md`, which named the pair and is queued for removal.
