---
id: cd3ee5fe-5f0c-576f-856f-6d4cb153eae6
slug: one-poll-holds-the-service-half-the-time
page-type-slug: finding
title: "One repeating poll holds the page query service for more than half of every five seconds, and every other caller waits behind it"
domain-slug: domain/pages-system
---

# Claim

The page query service spends more than half of every five seconds answering one repeating poll, and a caller arriving inside that burst waits behind all of it. It answers on one thread, the same query name arrives several times in a burst, and nothing between the poller and the service collapses the repeats. The roster answers in under ten milliseconds when the loop is free and in seconds when it is not, so a listing route that measures a slow roster is measuring the burst it landed in.

# Evidence

Measured 2026-08-23 on the workstation against the running service on `b97e1355b`, and against the deployed pod.

In the ten seconds 15:20:30–15:20:40 the journal records 54 requests totalling 7,525ms of handler time. `GET /q/value-green-day-units-on-day` arrived 9 times, `GET /q/inbox-readings-on-day` 7, `POST /q` 14, and three `claude-accounts` and `activity-calories` names 3 each. Individual answers ran 63–408ms.

Eight back-to-back `POST /q` calls carrying `{"page-type":"person"}` measured 30.0s (timed out), 30.0s, 30.0s, 7.3s, 0.33s, 0.003s, 2.9s and 21.3s at the caller. The service's journal recorded no answer over 1,000ms in those four minutes and logged that same query at 0ms. It stamps its clock inside the handler, so every one of those seconds stands before the handler ran.

The heartbeat fires each second and prints only at two or more seconds late. It printed 69 times in six minutes, one per ~5s, each 2.2–4.3s.

The deployed pod fails on this. `kubectl logs -n alanwalton web-94945596-4vzb7` repeats `[route-access] refusing: could not read the access record — no person could be read`, each naming `POST /q` over `person` giving no answer within its 5,000ms budget, and `ops browser-test verify-render https://alanwalton.com --path /persona` answers `502`.

Not measured: which client sends the poll, whether repeated calls to one query name carry the same arguments — the journal prints the pathname and not the query string — and whether the caller guards against overlapping its own rounds. Nothing here parts each answer's derivation cost from its serialisation.
