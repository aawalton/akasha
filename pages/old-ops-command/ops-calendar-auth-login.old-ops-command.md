---
id: 96addb8a-7aba-56ed-8ac8-a329ef8e78b0
page-type-slug: old-ops-command
title: "Ops calendar auth login"
slug: ops-calendar-auth-login
domain-parent-slug: domain/ops-calendar-auth
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/calendar/auth/login.ts
path: calendar auth login
---

# Definition

- **Ops calendar auth login** — the one-time consent, and the calendar refresh token it mints as Alan.

# Help

One-time OAuth consent flow for the calendar RSVP path (OAuth-as-Alan). By default starts a loopback listener, prints the consent URL to open in a browser, captures the redirect, exchanges the authorization code, and prints the `export GOOGLE_CALENDAR_OAUTH_REFRESH_TOKEN=...` line (append it to ~/.secrets.env) to stdout. The refresh token is bound to the calendar.events scope requested here. The OAuth app credentials are deliberately reused from the existing Gmail OAuth app (GOOGLE_GMAIL_OAUTH_*), so this is the only calendar var to add. If the consent browser can't reach the loopback (remote/headless session), copy the full callback URL from the address bar and re-run with --callback-url '<url>' to exchange the code without the listener.
