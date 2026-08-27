---
id: 8b692900-ba2e-58ce-805e-dc16e49499d1
page-type-slug: finding
title: "Default commit message common"
domain-slug: domain/global
---

# Claim

13 of the 59 commits landed in this perimeter pass carry `ops instructions edit`'s default message, which names the file and states no decision.

# Evidence

Measured over `git log --since='2026-08-04 22:00'`: 59 commits, 13 matching the default form "instructions: edit <path>".

Three reviewing seats reported the same cause unprompted — they landed their first commit before reading far enough into `ops instructions edit --help` to find `--message`. Each then declined to force-push over shared history to improve a message, which is the right call and leaves the default standing.

No perimeter surface binds commit-message form, so a default message violates nothing. What it costs is a history where a third of this pass's entries state which file moved and not what was decided about it, against a task that makes one commit per decision the unit of review. `tasks/archivist/review-instructions.md` says to land each decision as its own commit through the door that gates it, and says nothing about the message.
