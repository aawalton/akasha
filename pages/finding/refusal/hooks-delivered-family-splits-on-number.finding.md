---
id: b300b087-df10-521c-988e-0393e262831d
slug: hooks-delivered-family-splits-on-number
page-type-slug: finding
title: "Hooks delivered family splits on number"
domain-slug: page-type/refusal
---

# Claim

The `hooks-delivered` refusal family disagrees with itself about how many seats one body is about: `{pids}` renders a comma-joined list whenever seats share a payload, six bodies say "that seat" and `hook-payload-unreadable` says "those seats" — over the same hole, in the same sentence position.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/hook-dropped-since-launch.md` dispatched from `review-documents`. The reading raised it as belonging to the family rather than the document; the split was counted here.

`tools/checks/hooks-delivered.ts` prints eight bodies. Re-counted 2026-08-11 after the `hook-payload-not-json` reading moved one: six write "that seat" — `hook-dropped-since-launch`, `hook-extra-in-payload`, `hook-extra-in-payload-unsettled`, `hook-missing-from-payload`, `hook-missing-from-payload-unsettled` and `hook-registered-after-launch` — and two write "those seats", `hook-payload-unreadable` and `hook-payload-not-json`.

That second one moved deliberately, taking the plural from its sibling branch. So the family is drifting toward plural one document at a time — the outcome the `hook-dropped-since-launch` reading declined to start.

Sharing a payload is the ordinary case, not the edge: 24 live seats across 2 payloads today.

Nothing any body asks for is wrong — the act is the same whether one seat or six carry it. What it costs is a reader taking "that seat" as one with a list of pids in front of them.

Four ways out. Plural, which reads wrong on the single-seat case — and the `hook-payload-unreadable` reading confirmed it, "those seats" rendering for a single pid there today. "pid(s)", which no body here does. Have the check hand over a noun phrase already agreed with its count, so `{pids}` arrives as "pid 412031" or "pids 412031, 412884": eight documents fixed from one place. Or drop the count — "so which hooks are running there cannot be known" is count-free and more precise than "what those seats are running", which means which hooks in this instrument.

Each reading has declined to move its own document alone, and the corpus moved anyway.

Not measured: how often a payload is shared over time, or whether any reader has misread a body this way.
