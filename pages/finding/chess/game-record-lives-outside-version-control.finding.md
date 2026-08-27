---
id: e4353b5e-c0ab-5b82-abbc-a50e852ca24e
slug: game-record-lives-outside-version-control
page-type-slug: finding
title: "Game record lives outside version control"
domain-slug: domain/chess
---

# Claim

The maintained record of where Alan's chess stands is `~/agents/erin/notes.md`, an unversioned file in a seat working directory that no git repository covers and that one quarantined document is the last thing pointing at. It carries his diagnosis, the standing rule about stopping when his body tightens, and the conflict-sensitivity fact the whole domain is shaped around — and it is the only copy. The durable store built to replace it holds five rows frozen since the session that created them.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/chess/findings.md`, whose
durable-progress-record entry names the path. I had recorded the file as GONE
earlier the same day, from `git ls-files` alone; it exists, and a repository
search cannot see it because it is in no repository.

`ls -la ~/agents/erin/notes.md` — 5576 bytes, last written 2026-07-02 14:25, 48
lines, beside `spawn.log` and `spawn-state.json`. `git rev-parse
--show-toplevel` from that directory returns "fatal: not a git repository",
walking up to the mount point. Nothing versions it and nothing backs it up.

What it holds, verbatim from its "Where his game stands" section: the Session
Zero diagnosis of 2026-06-26; "Conflict-sensitivity is the load-bearing fact.
The *conflict* wrapped around competitive chess (opponent, clock, stakes) became
too much; he stepped away"; "he's here to **learn, not compete**, and that's
whole, not lesser"; and "**Standing rule: go at the pace his body says yes to;
if anything tightens, stop.**" Its Solid and Shaky lists both still read `_tbd_`
against "need to actually see his eye move across a board next session".

Every quotation the retired chess skill attributed to `notes.md` resolves here,
so this file — not any document in either repository — is the origin of the
domain's governing claims about Alan.

`rg -n --multiline "agents/erin|erin/notes"` across the instructions tree, the
code repository, `~/memory` and `~/books` returns exactly one line:
`dirty/skills/chess/findings.md:56`. That document is under quarantine and I am
removing it, so after this ingest nothing anywhere names the path.

`ops seat reap` sweeps `~/agents/<id>/` directories on a 60-second mtime floor,
at supervisor startup and every 60s via `agent-row-reaper.timer`. Its liveness
probe scans `/proc/*/environ` for `AGENT_ID=<id>`, and `~/agents/erin/` is a
NAME directory rather than an id one, so whether the sweep can reach it is not
established here — only that the record sits in the tree a sweep operates on.
