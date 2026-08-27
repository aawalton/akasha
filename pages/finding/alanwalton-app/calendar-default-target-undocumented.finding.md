---
id: 1466ef34-7366-5c0b-b846-581e34c6d1d5
slug: calendar-default-target-undocumented
page-type-slug: finding
title: "Calendar default target undocumented"
domain-slug: domain/alanwalton-app
---

# Claim

Six `ops calendar` verbs tell their reader that an omitted `--calendar` resolves to Alan's calendar. `GOOGLE_CALENDAR_DEFAULT_CALENDAR_ID` overrides that, and no help text in the package names the variable.

# Evidence

`resolveCalendarId` in `packages/alanwalton/calendar/google/src/events.ts` is three lines: the literal `primary` returns `OWNER_CALENDAR_ID`, and otherwise the target is `explicit ?? defaultCalendarId ?? OWNER_CALENDAR_ID`, where `defaultCalendarId` is `readDefaultCalendarId()` reading `GOOGLE_CALENDAR_DEFAULT_CALENDAR_ID`.

Six verbs declare `--calendar` — `events create`, `get`, `list`, `update`, `delete` and `rsvp` — and all six carry the identical flag description: "Target calendar; optional. `primary` and unset both resolve to Alan's calendar". Several repeat it in the verb's own description. That sentence names the first term of the chain and the last and omits the middle, so it is true only while the variable is unset.

`GOOGLE_CALENDAR_DEFAULT_CALENDAR_ID` occurs twice in the whole package, both in `src/env.ts`: one code comment and the `process.env` read. It stands in no flag description, no verb description and no `envVars:` block. The only `envVars:` block in the package is `auth-login.ts`, declaring the two Gmail OAuth vars. So there is no route from any `--help` in the package to the variable that decides where the verbs land.

Three of the six write — `create`, `update` and `delete`. With the variable set, a reader who follows the help and omits the flag creates an event on a calendar nobody named, with a clean exit and correct-looking JSON. Nothing warns and no gate reports it.

A second, smaller gap in the same function: the `primary` remap is tested only against the explicit argument, so `GOOGLE_CALENDAR_DEFAULT_CALENDAR_ID=primary` passes the literal through to Google, where it resolves against the service account's own empty calendar.

Found while ingesting `dirty/knowledge/calendar-verb-surface.md`, whose account of the chain is accurate.
