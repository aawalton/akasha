---
id: 339e4922-e7e7-548a-89b2-2109870bae34
slug: halt-scoped-by-verb-not-work
page-type-slug: finding
title: "Halt scoped by verb not work"
domain-slug: domain/agent-fleet
---

# Claim

The fleet halt in `work-halt.ts` is scoped only by verb (six gated commands: `project start/claim/check/deploy/integrate`, `agent spawn`), never by which agent or row is held — `agent_work_halted` is one boolean for the whole fleet, so a narrower hold ("capture gaps but don't dispatch," "hold this row") has no state representation and exists only as words in a transcript that do not travel to an agent who did not hear them. This is a representational gap, not a discipline failure.

# Evidence

Project #16348 (agent-fleet, someday_maybe, live-on: deploy). No initiative named.

`HALT_GATED_COMMANDS` in `packages/agents/shared/work-halt.ts` is exactly six entries (`project start`/`claim`/`check`/`deploy`/`integrate`, `agent spawn`), a deliberate open complement: paths taking on new work, paths reaching shared infrastructure; everything else (commit, push, move-to, note add, release, finish, retire, every read) stays open so a halted agent can finish stopping.

Not scoped along the work axis: `agent_work_halted` is one boolean for the whole fleet — which verbs refuse, never which rows/agents. Narrower holds ("capture gaps, don't dispatch," "hold this row," "this agent takes no new work") have no state form; they exist only as transcript words that don't travel to agents who didn't hear them.

Existence-check correction, self-corrected in the project: filer first checked the CLI surface (`bun ops project --help` has no hold/block/pause/freeze verb; status enum only `someday_maybe`/`not_doing`; `bun ops seat halt --help`/`flag.agent_work_halted` fleet-wide, landed 2026-07-25 13:15 via #16262) — CLI existence-check, not mechanism. aranya read `work-halt.ts` source, found the six-entry classification. Filer applied #16344's rule: WHAT=help output, OVER WHAT=verb registry not gate, AS OF WHEN=current.

Worked instance, 2026-07-25 ~23:05-23:15Z: Alan gave aranya scoped instruction ("capture gaps, don't dispatch"; "don't start on queued work"), raised dispatch capacity 5→10, asked áine to have owners dispatch when open. aranya refused a clearance despite every local signal saying proceed (correct, cost her the work); áine escalated rather than take the favorable reading (correct); dalla spawned a worker for #16219 before áine's superseding message arrived, unable to have discovered it (UUIDv7 `019f9b89-d2c3` enqueued ~14s before spawn `019f9b8a-093b`).

Result: 3 agents, ~1hr judgment, 1 escalation to an out-of-pocket Alan, for what a flag encodes.
