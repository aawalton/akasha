---
id: 0a9dfec5-570d-5bf1-937b-785e8a321fca
slug: postgres-socket-bursts
page-type-slug: finding
title: "Postgres socket bursts"
domain-slug: domain/global
---

# Claim

The postgres service is intermittently unreachable at the socket level, in bursts that are still arriving after three days.

Running out of connections is not the cause: the ceiling is 500 with 212 held at rest, and burst size does not track how many seats are live — the hour with the most supervisors had two failures, while hours with fewer had ninety-two and eighty-one.

The bursts reach Alan, whose session closes blocked on database writes for as long as those writes were allowed to wait.

# Evidence

Counted directly at the time of filing: 833 `FailedToOpenSocket failed to connect to postgresql` lines across 38 supervisor logs under `/var/home/walton/code/.claude/supervisors/`. They arrive unevenly by hour — 115, 92, 81, 79, 42 in the heaviest five, and 32 on the day of filing. The oldest supervisor log in that tree starts 2026-05-31, so the three days is the span the errors occupy rather than the span observed.

Reported by a delegate rather than measured here, and carried as its evidence: `max_connections = 500` with 212 connections in use at rest and no per-role limit; `idle_session_timeout = 0` and `tcp_keepalives_idle = 7200s`; Pearson r = -0.026 between live supervisor count and failure count over twelve hours; 48 supervisors in the hour holding two failures against twenty-supervisor hours holding ninety-two and eighty-one; and a separate 34 `too many clients` events falling wholly inside one hour when seat count doubled. That one hour is the only genuine exhaustion in the record.

The service is addressed as `postgres.postgres.svc.cluster.local:5432`, which is a kubernetes service name; the delegate read the pattern as consistent with networking beneath that service rather than with the database itself, and did not test it.

What was not measured: nothing here reaches the database host, the kubernetes layer, or any log the service itself keeps, so the cause is unestablished and only the client-side symptom is counted. No connection was traced from attempt to failure. Whether the bursts coincide with anything else on this workstation was not examined. The count is of one client's logs, so it says nothing about what other clients of the same service saw.
