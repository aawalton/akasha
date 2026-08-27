---
id: ab10f263-ce14-52d2-93e8-35ae956dde35
page-type-slug: finding
title: "Project start reports a claim succeeded when the seat statement reached the row and was refused"
domain-slug: domain/seat-assignment
---

# Claim

`ops project start --seq` reports `claimed: true` with no error when the seat statement reached the row and was refused, so a run that stated nothing reads exactly like one that did.

# Evidence

Observed on this workstation at 19:39 on 2026-08-18, before #19416 deployed. `ops project start --seq 19416` printed `{"seq":19416,...,"claimed":true,"already_held":false,...,"error":null}` and created the worktree. `ops seat whoami` immediately after reported `projectSeq=null`, and the row carried no project seq. The seat's own store at `~/.instruction-seats/<id>.json` did carry `"project": {"value": "19416"}`, so the local half landed and the row half did not.

The path: `stateSeatProject` in `tools/lib/seat-project-statement.ts` runs `tools/seat-call.ts`, which records locally and then calls `followName` in `tools/lib/seat-rename.ts`. `followName` treats a non-zero exit from `ops seat restate` whose stderr does not begin with `refused:` as `unreachable` rather than as a refusal, and that arm returns without throwing. `ops project start` sets `claimed = true` on the call returning at all.

The same command after the fix, where the composed name reached `setAgentName` and was refused there with a `refused:` line, exited non-zero and reported the refusal in full — so the reporting is honest for one refusal shape and silent for the other.
