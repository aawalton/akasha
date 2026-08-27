---
id: aae20d5a-0035-5dc1-a8ec-852f1f65b161
slug: rehome-leaves-outgoing-lead
page-type-slug: finding
title: "Rehome leaves outgoing lead"
domain-slug: domain/agent-harness
---

# Claim

Rehoming an initiative moves `owner` and leaves every other field naming the outgoing lead, so a seat that retires between the handover and its own hand-back delivers to a lead who no longer holds the row. Nothing reports the mismatch, and the row-wins rule does not reach it.

# Evidence

Measured 2026-08-02, rehoming the `persona` initiative's seven rows and four live seats from the `persona` lead to the `agent-harness` lead, run live and deliberately as an experiment.

`ops project add-owner --seqs <csv>` homed all seven in one act. `ops project note add` takes one `--seq` and has no batch form, so the durable half cost seven writes of identical text: the verb for the field nothing reads batches, the verb for the record everything reads does not.

Three project properties still name the outgoing lead afterwards: `claimedAgent`, whose help says `add-owner` never touches it; `requestingAgent`; and `custodyTransfer`, which `move-to --help` calls the durable record of which layer holds the row and which afterwards named neither lead and carried no reason.

A fourth carrier is not in the database at all. `~/agents/<name>/spawn-state.json` holds `parent`, which the status line and `ops seat in-flight` both read as ownership. Three live seats still showed under the outgoing lead there after every database field had moved, and that is how it was caught: Alan saw them on his status line. Its own comment calls it the spawning agent's id, so making it true about ownership makes it false about the spawn.

The seat-side hole is sharper. The define seat on #17460 sent its hand-back to the outgoing lead about two minutes before the handover arrived. It was alive, noticed, and re-sent. A seat that had retired on that send would have left its whole deliverable with a lead who did not hold the row, while the row read `owner athena` and nothing reported the disagreement. The rule the rehome was built on — the row wins where a seat's seed and its row disagree — protects a seat that keeps working and does nothing for one that finished early.

Not measured: whether anything reads `claimedAgent` or `requestingAgent` for principal resolution. None was found and none was hunted, so that axis is unverified rather than clean.
