---
id: 3edfcb9f-a41c-5c74-946c-b61434b6a7cf
slug: seat-status-vocabulary-collision
page-type-slug: finding
title: "Seat status vocabulary collision"
domain-slug: domain/agent-harness
---

# Claim

Collapsing agent-harness seat status to only `running`/`stopped`, with starts routed through `resume`/`reset`, cannot land as separate objectives: `ops seat retire` writes only `status=retired`, so dropping that value drops the command too. The status vocabulary Alan settled on 2026-08-06 collides with the already-existing `ops seat resume` command, a collision not shown to him first. `domains/retired/wake.md` already reads as though this lifecycle were collapsed; it is not yet true.

# Evidence

Project #18011 (status `someday_maybe`, `live-on: deploy`, domain `agent-harness`). Objectives: (1) no seat status but `running`/`stopped` anywhere, via a case-insensitive sweep with a negative control at the parent commit; (2) any message to a stopped seat starts it, since nothing today declares, arms or warrants which messages do; (3) exactly one command sends a message, offered by both `ops seat --help` and `ops project rule --help`; (4) a seat starts only by `resume` or `reset` — `revive`, `respawn`, `restart` name no CLI command, exported symbol or prose in either repo; (5) nothing calls this a wake — `domains/retired/wake.md` holds the slug and `ops instructions run-checks` passes `domain-edges` and `links-resolve` clean.

ESCALATED 2026-08-06: handed back at "understand" with nothing written, the correct stop per the notes. The seat grounded the scope, ran a negative control passing 10/10 canaries at commit `eb986cbb`, and found two things no delivery could work around: objectives 1 and 4 cannot be delivered separately (above), and `ops seat resume` already exists, so the vocabulary Alan settled on 2026-08-06 collides with a live command — not shown to him before he settled it.

Existing "wake" sites were judged not defects: `block-headless-halt.sh` describes a live mechanism, `loop.md` uses the platform tool's own word, `review-documents.md` means nobody is awake. Not a vocabulary sweep, and does not belong to `declared-vocabulary`: the words move because the lifecycle design moves; `domain: agent-harness` was judged correct.

Measured during the pass: of 370 agent rows, 238 are `retired`, 119 `stopped`, 13 `running`, none `active`, `paused` or `dormant` — that vocabulary is dead, needing no data-migration plan. Every other figure measured stood in this project file's prior revision (superseded); re-derive rather than trust it. Worktree `/home/walton/worktrees/18011`, base commit `eb986cbb`.
