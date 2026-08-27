---
id: a262bd9f-9e4d-500b-8b63-3b3f541092cc
slug: calendar-help-omits-default-var
page-type-slug: finding
title: "Calendar help omits default var"
domain-slug: repo/akasha-repo
---

# Claim

Every calendar verb prints a `--help` stating two terms of a three-term calendar resolution as though they were the whole of it, and the environment variable they omit is named on no surface a caller can reach. The omission is a no-op only because that variable currently holds the same address the fallback does, so repointing one line would silently redirect every verb while every `--help` went on asserting they reach Alan's calendar.

# Evidence

The chain has three terms. `resolveCalendarId` at `alanwalton/calendar-google/src/events.ts:26-27`:

    if (explicit === "primary") return OWNER_CALENDAR_ID
    return explicit ?? defaultCalendarId ?? OWNER_CALENDAR_ID

The middle term is read at `alanwalton/calendar-google/src/env.ts:45`, parsing `process.env.GOOGLE_CALENDAR_DEFAULT_CALENDAR_ID` and threaded in through the client as `defaultCalendarId`. The fallback is `OWNER_CALENDAR_ID = "aawalton@gmail.com"` at `env.ts:6`.

The help states two of the three. Every verb under `tools/commands/calendar/events/` declares the flag with `description: "Target calendar; optional. \`primary\` and unset both resolve to Alan's calendar"`, and most repeat that sentence in the command description as well. The variable appears in none of them.

No surface a caller meets names it. That `process.env` read is the only place in the package the variable is spelled at all, and it is source a caller does not open.

What hides it: `printenv GOOGLE_CALENDAR_DEFAULT_CALENDAR_ID` on this host returns `aawalton@gmail.com`, the same address `OWNER_CALENDAR_ID` holds. So every verb behaves exactly as its help says while the reason the help gives is not the operative one.
