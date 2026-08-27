---
id: 8944aae4-d94a-5a5f-a2e5-4e40437f68fd
slug: observer-pins-code-at-start
page-type-slug: finding
title: "Observer pins code at start"
domain-slug: page-type/alert
---

# Claim

The alert observer runs as a long-lived daemon, so it holds the recipient-resolution code as it stood when the process started. A commit changing how an alert document names its recipient does not reach the running observer, and until it is restarted every alert using the changed spelling resolves to nobody and is reported to the `alert` definer as though its document were missing.

# Evidence

Commit `91a549437` at 2026-08-16 09:33:09 -0600 changed `tools/lib/recipient-derivation.ts` to read an alert's person recipient from `person-slug:` where it had read `person:`, and changed `domains/alerts/claude-account-login-needed.md` to match. That document is the only one of the 75 under `domains/alerts/` stating a person rather than a domain.

`alert-observer.service` had been running since 04:08:50 MDT under PID 1947, before that commit. At 16:53:41 UTC it swept event 25031745, an `alert.condition.cleared` for `claude-account-login-needed`, and reported it to the `alert` definer with the reason `states neither 'domain:' nor 'person:'` — the pre-rename spelling, which is the wording `tools/lib/decide-alert-recipient.ts` carried before commit `00f2cdb5e`. So the running process held code from before the rename while the document on disk stood after it.

Against the current code the same document resolves: `{"alertRecipient":{"alert":"claude-account-login-needed"}}` through `bun tools/recipient.ts` returns `{"kind":"person","person":"alan"}`.

I restarted `alert-observer.service`; the old process did not stop on signal and was killed on its stop timeout after 6h 47m. The new process came up clean.

What I did not measure: whether any other long-lived process launched from this repository pins its code the same way, and whether the observer has a reload path short of a restart. I read the daemon's startup and sweep logging, not its module-loading behaviour, so `holds the code as it stood when the process started` is inferred from the stale refusal text rather than read off the loader.

The firing this clear belonged to, event 25021466 at 13:36:29 UTC, predates neither the rename nor the daemon's start in a way that broke it: at that moment the document and the code agreed on `person:`, so that one resolved. Only the clear fell through.
