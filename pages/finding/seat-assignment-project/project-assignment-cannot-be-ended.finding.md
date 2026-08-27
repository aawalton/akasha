---
id: 70b5a251-9a6e-550b-9fed-e8fc617e89de
page-type-slug: finding
title: "Project assignment cannot be ended"
domain-slug: domain/global
---

# Claim

A seat's project assignment can be stated but not ended, so a seat whose project is closed goes on naming it.

`domains/seat-assignment.md` rules that an assignment ends when the work it names is done and whoever acts next has been told. `tools/seat.ts --project` writes one value and offers no route to withdraw it: the value is judged by its shape, digits and nothing else, so an empty string and `--clear` are both refused as "no project". The ending the vocabulary admits is one the tool cannot express.

# Evidence

Found on my own seat. `athena-lead` carried `project` 17766 while that project's row stood at `done`, and had done since before this session; the value reached the seat store and the `pushed` line composed from it. Two withdrawals were attempted and both refused by the shape check rather than by any rule about withdrawal: `--project ""` and `--project --clear`.

NOT MEASURED. Whether another verb ends the assignment where `tools/seat.ts` cannot — `ops seat project-seat` exists and was not read for this. Whether a seat whose name spells its project (one whose principal is not Alan) is affected differently, mine spelling none because its principal is Alan. How many live seats currently name a closed project; this is one case rather than a population.
