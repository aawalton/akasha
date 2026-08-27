---
id: e2524b86-1f7c-59b4-b23f-231d996deeff
slug: no-non-agent-alert-destination
page-type-slug: finding
title: "No non agent alert destination"
domain-slug: page-type/alert
---

# Claim

There is no destination for an infra/CI alert other than an agent's inbox: converting infra-alert-bridge and devops-monitor from sending messages to writing records (#16435) removes the messages that covered this gap without closing it, since a record is only discovered at an agent's next boot.

# Evidence

Project #16449 (domain alert, status someday_maybe). Surfaced by #16435 (wave 2 of umbrella #16256) while converting two alert bridges from messages to records. The conversion is correct under the canon — nobody is blocked on either alert — but it removes a message without closing the gap it covered.

Two senders, one root: both are the canon's named failure shape "the message that covers for a missing guarantee." The guarantee: no destination exists for an infra/CI alert other than an agent's inbox.

1. infra-alert-bridge. Its CLAUDE.md states why it exists: Prometheus pushes to an Alertmanager whose only receiver is the no-op "null" blackhole, so a firing alert was visible in the Alertmanager UI and nowhere else — the silent-failure class that let 12 days of failed base backups pass unnoticed (#14219). The bridge is a workaround for a missing Alertmanager receiver. Converting it to a record stops cold boots, but a record is discovered only at aranya's next boot — if she stays dormant, the 12-day-silence class is not closed. Fix: a real Alertmanager receiver reaching a surface with a reader.

2. devops-monitor. Thirteen wedge classifiers compute derived state in a bun process, addressing the verdict to a persona. Canon shape for a health signal is metric + Prometheus rule, already ratified for sibling child #16437: wedge verdicts should be metrics, the alerting decision belongs in a Prometheus rule, destination is whatever receiver item 1 builds. Some wedge classes (e.g. dispatcher-liveness, queue-pause) can fire with no worker attached, so no blocked-worker escalation covers them.

Why one row: both converge on the same missing element (a non-agent alerting destination); building item 2 without item 1 just relocates the problem.

Not a block on #16435 — its conversions land independently. Per the canon: "no guarantee here means the guarantee is the work item."

Row captured but never defined; moved off the retired `notes` attribute on 2026-08-15.
