---
id: a9358990-bdec-55b8-89bb-a9ca452f2998
page-type-slug: finding
title: "Widget payload skew"
domain-slug: domain/alan-harness
---

# Claim

Removing a key from a widget payload on the server makes the widget already installed on Alan's phone render a wrong value on every refresh, silently, until a TestFlight cut replaces the binary. A synthesized `Decodable` treats an absent key for an optional field as `nil` rather than throwing, so the stale binary decodes the new body cleanly and falls to whatever branch it wrote for `nil`.

Live now: the Claude usage tile has read `fully used` since 2026-08-02 while the pool is about a third used.

# Evidence

Reported by Alan on 2026-08-06: the Claude usage widget shows one small tile rather than the wide two-slot one, and the reset caption "broke and now always says fully used".

Both symptoms are one cause, and neither is a defect in the change that shipped.

`ae6d009b62` landed on `main` at 2026-08-02T18:27:02Z, replacing the route's `nextResetHours` with three nullable instants. The deployed route confirms it — `curl https://alanwalton.com/api/claude-usage` returns exactly `avgUsedPct`, `fiveHourBackAt`, `sevenDayBackAt`, `sevenDayEndsAt`, `tier`, and `avgUsedPct` is 35.

The Swift half of that change reaches the phone only through a TestFlight cut, which has not been taken. So the binary on his phone is the pre-change one, where:

- `ClaudeUsageWidget.swift:115` declares `.supportedFamilies([.systemSmall])` — small only, which is why there is no wide tile.
- `ClaudeUsagePayload.swift` declares `let nextResetHours: Int?` with `extension ClaudeUsage: Decodable {}`, so the compiler synthesizes `decodeIfPresent` for the optional.
- `ClaudeUsageWidget.swift:87` renders `usage.nextResetHours.map { "next reset \($0)h" } ?? "fully used"`.

The new body has no `nextResetHours`. The synthesized decoder returns `nil` without throwing, the body decodes cleanly, and the caption takes the `?? "fully used"` branch on every refresh. This is not a frozen cache — the fetch succeeds and the tile is confidently wrong each time.

The estate already documented this trap in the opposite direction, a new binary accepting an old cached body, and `native-shell/docs/widget-feed-pipe.md` carries it. The direction that reached Alan is worse, because the server changes without the phone's consent and no cut is required for the wrong render to begin.

Not surveyed: the other four widgets shipping from `ios-widget/`, each of which pairs a server payload with an installed binary under the same synthesized-decoder rule.
