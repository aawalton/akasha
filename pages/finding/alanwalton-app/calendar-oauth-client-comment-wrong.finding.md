---
id: 375946e3-3974-5674-b7d9-d7621c608d5f
slug: calendar-oauth-client-comment-wrong
page-type-slug: finding
title: "Calendar oauth client comment wrong"
domain-slug: domain/alanwalton-app
---

# Claim

Two header comments in `@alanwalton/calendar-google` say the OAuth-as-Alan client backs only the RSVP path. Three verbs use it: `events rsvp`, `events create` and `events update`.

# Evidence

`packages/alanwalton/calendar/google/src/auth.ts`, on `CalendarOauthClient`: "This client backs only the RSVP write path; reads and create/update/delete stay on the service-account JWT above."

`packages/alanwalton/calendar/google/src/client.ts`, on `makeOAuthCalendarClient`: "Used only by the RSVP write path."

Grepping the verb files for the two client factories gives the real split:

- `makeOAuthCalendarClient` — `events-create.ts:114`, `events-rsvp.ts:73`, `events-update.ts:121`.
- `makeCalendarClient` — `events-get.ts:42`, `events-list.ts:40`, `events-delete.ts:42`, `calendars-list.ts:16`.

So create and update are on the OAuth client, not the service-account JWT, and both comments state the opposite. `delete` is on the JWT, which the `auth.ts` sentence gets right in the same breath.

This matters past tidiness because the OAuth path needs `GOOGLE_CALENDAR_OAUTH_REFRESH_TOKEN`, which `ops calendar auth login` mints. A reader trusting either comment would expect `events create` to work without that consent flow having been run, and would look somewhere other than the token for the cause when it does not.

Found while ingesting `dirty/knowledge/calendar-verb-surface.md`; the source document itself states the split correctly.
