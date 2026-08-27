---
id: a262bd9f-9e4d-500b-8b63-3b3f541092cc
page-type-slug: finding
title: "Calendar help omits default var"
domain-slug: repo/akasha-repo
---

# Claim

Six calendar verbs print a `--help` stating two terms of a three-term calendar resolution as though they were the whole of it, and the environment variable they omit is now named on no surface a caller can reach. The omission is a no-op only because that variable currently holds the same address the fallback does, so repointing one line would silently redirect all six verbs while every `--help` went on asserting they reach Alan's calendar.

# Evidence

Measured over `~/code` at HEAD `1313565199` on branch `main`, working tree clean, 2026-08-07.

The chain has three terms. `resolveCalendarId` at `packages/alanwalton/calendar/google/src/events.ts:33-39`:

    if (explicit === "primary") return OWNER_CALENDAR_ID
    return explicit ?? defaultCalendarId ?? OWNER_CALENDAR_ID

The middle term is read at `src/env.ts:95-96`, `readDefaultCalendarId()` parsing `process.env.GOOGLE_CALENDAR_DEFAULT_CALENDAR_ID`, and threaded in by `src/client.ts:24` and `:37`. The fallback is `OWNER_CALENDAR_ID = "aawalton@gmail.com"` at `env.ts:20`, whose own doc-comment at `:18` does name the variable: "`GOOGLE_CALENDAR_DEFAULT_CALENDAR_ID` env var still overrides when set."

The help states two of the three. `rg -l '"--calendar"'` returns exactly six files under `packages/alanwalton/calendar/google/src/calendar/` — `events-get`, `events-list`, `events-delete`, `events-create`, `events-update`, `events-rsvp` — and each declares the flag with `description: "Target calendar; optional. \`primary\` and unset both resolve to Alan's calendar"`. Five repeat that sentence in the command description as well (two hits each); `events-create` carries it once. The variable appears in none of the six.

No surface a caller meets names it. `packages/alanwalton/calendar/google/CLAUDE.md` and `packages/alanwalton/calendar/CLAUDE.md` do not exist — the instruction surfaces were swept into the instructions repo's `dirty/code/` — so the `env.ts` doc-comment is the only place left, and it is source a caller does not open.

What hides it: `printenv GOOGLE_CALENDAR_DEFAULT_CALENDAR_ID` on this host returns `aawalton@gmail.com`, the same address `OWNER_CALENDAR_ID` holds. So every verb behaves exactly as its help says while the reason the help gives is not the operative one.

The variable has carried a wrong value here before: `dirty/docs/calendar-management.md`, since removed, opened with "the default calendar is the wrong calendar" because it pointed at a community-events group calendar.
