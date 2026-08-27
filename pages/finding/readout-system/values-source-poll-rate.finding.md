---
page-type-slug: finding
id: 62bb7675-4f0c-5f4e-a071-08baf06fcb60
slug: values-source-poll-rate
title: "One readout query is a quarter of all page query traffic"
domain-slug: domain/readout-system
---

# Claim

One readout query, `value-green-day-units-on-day`, is a quarter of every request the page query service answers: 511 of 2209 in six minutes with Alan asleep and the count it displays unchanging. With `inbox-readings-on-day` it is a third of all traffic. Each answer costs tens of milliseconds, but the loop has no idle time left: a second of traffic carries about a second of work, so the poll rate stands above what the service can absorb rather than merely above the rate the data moves.

# Evidence

Counted from this workstation's service journal, from request-start lines, both verbs, over six minutes late at night with Alan asleep.

    2209  start lines in all, 6.1 a second
     511  GET /q/value-green-day-units-on-day    23%
     256  GET /q/inbox-readings-on-day
     148  GET /page-types
      95  POST /q value
      92  GET /q/safety-level-on-day
      92  GET /q/persona-all
      91  POST /q persona-day

The query is declared in `pages/readout-source/readout-source-values.md` and reached by the status bar.

Request times summed inside one second, from the service's own log: 00:01:13 carried 37, 184, 115, 558 and 132 ms, being 1026 ms of work in 1000 ms; the next second carried 950 ms across six answers. A one-second timer in the process waited about three seconds for a slot.

NOT MEASURED. Which process issues the calls is unestablished; only which source declares the query. Nothing here covers the rate while Alan is awake, so this may be the standing pattern or only the sleeping-hours one. The configured poll interval was not read, and whether the caller intends this rate is unknown. A figure of about 50 requests a second reached me from another session earlier and was withdrawn by it as an arithmetic error; the 6.1 a second above is my own count from the same journal.
