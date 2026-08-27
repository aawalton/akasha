---
id: 015c9ea8-8dda-5ecb-b598-872d4a219e0e
page-type-slug: finding
title: "Hook liveness advisory on ops writes"
domain-slug: domain/instrument
---

# Claim

`hook-liveness` returns advisory on `ops instructions edit` calls made from a seat working through Bash: `hold-seat.ts` last fired for the Bash call rather than for the edit, so the write cannot be shown to have passed through the hook while the `hold-seat` gate itself passes.

# Evidence

Measured 2026-08-11, reported independently by two `review-instructions` seats dispatched from `review-documents` — the readings of `refusals/hook-missing-from-payload-unsettled.md` and `refusals/hook-payload-unreadable.md`. The second reports it on every `ops instructions edit` call it made.

The gate reports the hook's last firing rather than a firing for this call. One seat records it as "hold-seat had fired 166ms earlier for a Bash call rather than for that one". Every other gate passed on both seats' writes, and `hold-seat` itself passed.

So the advisory does not say the seat is unheld. It says the evidence for this particular act is a firing attributable to a different tool call.

It reaches any seat whose writes go through `ops` rather than the native tools, which is every seat in this pass — `domains/folders/instructions-repo.md` requires readings through `ops instructions read`, and `domains/agent-harness.md` requires bodies composed outside the repo and put through the command that gates them. So the pattern of work the harness asks for is the pattern that produces the advisory.

Not measured: how often the advisory fires across the fleet, whether any write has ever genuinely escaped the hook, or what firing-for-this-call would have to look like to be attributable.
