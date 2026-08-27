---
id: f3620a9c-0801-5869-9d7d-0998cd5b4ea4
slug: at-reads-as-last-restart
page-type-slug: finding
title: "At reads as last restart"
domain-slug: barred-meaning/seat-assignment-availability
---

# Claim

A seat's availability record carries an `at` that reads as when the assignment was granted and means when the supervisor last restarted the seat, because the boot path sets it unconditionally on every start.

# Evidence

Disclosed by the seat that built #18195 and not caused by it. `defaultSeatCall` in `packages/agents/supervisor/src/supervisor-seat-defaults.ts` sends `availability: mode === "interactive"` on every interactive boot, and the command sets the key unconditionally where `--default` leaves an existing mode alone. So a seat that has stood by for a week and restarted this morning carries an availability stamped this morning.

Every other record in the store means what its `at` appears to mean: `mode`, `principal`, `project` and `flex` each stamp the moment that value was stated, and stating the same value again is what moves them. Availability is the one key whose stamp moves without anything about the assignment changing, and nothing distinguishes the two cases at read time.

Presence is unaffected, and presence is what every reader uses today — `statedOf` at `tools/lib/seat-stated.ts` returns the record, and the sweep at `tools/lib/seat-sweep.ts` asks only whether it is there. So nothing is wrong in the fleet right now.

What makes it worth recording is the shape of the reader who will be wrong. The `athena-consistent-seats` initiative ended in wiring an alert over these detectors, and an alert asking how long a seat has been standing by is the natural next question of exactly this data. Asked of this field it would answer with uptime and look entirely reasonable doing it. That is the class of defect nobody re-checks, because the number is well-formed and in range.
