---
id: 1370e303-a32c-584e-bbea-f30bc994e82e
slug: calendar-service-account-owns-no-calendars
page-type-slug: finding
title: "Calendar service account owns no calendars"
domain-slug: domain/ops-cli
---

# Claim

The `calendar` read verbs authenticate as a service account that owns no calendars, and every one of them compensates for that. `primary` is a trap on this path: taken literally it names the service account's own empty calendar and returns an empty answer with no error, so the code remaps it to Alan's address. A reader who removed the remap as redundant would get silence rather than a failure.

# Evidence

Observed 2026-08-13 while moving the bodies of `calendar calendars list`, `events list`, `events get` and `events delete`.

`packages/alanwalton/calendar/google/src/events.ts` exports `resolveCalendarId(explicit, defaultCalendarId)`, which returns `OWNER_CALENDAR_ID` for the literal `primary`, then an explicit id, then the client's env default, then `OWNER_CALENDAR_ID` again. `OWNER_CALENDAR_ID` is `aawalton@gmail.com` in `env.ts`. Every read and the delete run through it.

The verbs' help blocks carry the conclusion — "`primary` and unset both resolve to Alan's calendar" — and none of them carries the reason, which is the half a reader would need to leave the remap alone.

`calendars list` shows the same fact from the other side. Measured against the live estate, it prints `[]` on stdout and a note to stderr saying the service account enumerates only its own `calendarList`, which is usually empty, and that Alan's calendars are reached by explicit id rather than by appearing there. That note is the verb's only output in the ordinary case: the listing is empty and correct, and reads as a broken connection.

So `calendars list` does not list Alan's calendars and cannot. What it enumerates is the service account's own set, and the way to Alan's calendar is `events list` with `--calendar` unset.

Not established: whether `calendars list` earns its place at all, given that its answer is empty by design and its useful content is a stderr note explaining why.
