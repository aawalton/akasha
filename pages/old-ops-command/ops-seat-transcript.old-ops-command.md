---
id: a96731f6-723e-581f-b938-647b171fdd06
page-type-slug: old-ops-command
title: "Ops seat transcript"
slug: ops-seat-transcript
domain-parent-slug: domain/ops-seat
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/seat/transcript.ts
path: seat transcript
irreversible: true
---

# Definition

- **Ops seat transcript** — an agent's stored session transcript written to the local path `claude --resume` reads.

# Help

Leave an agent's session transcript where `claude --resume` will read it,
taking whichever of its two copies carries more of the session.

Every seat keeps a local transcript, headless ones included, and every seat
also streams one to the SeaweedFS object store under a key naming its agent.
The two come apart when a local copy is lost, truncated, or left on another
machine. This settles which a resume gets: the local copy is kept unless the
stored one holds more records for the session, and only then is it written
over. A cold stored copy is decompressed on the way in.

Whichever copy is kept is then rewritten in place, quarantining content blocks
that would otherwise hang the resume.

Safe to run again, so a wrapper can call it ahead of every resume without
working out whether it is needed. An unreachable store is survivable where a
local copy carries the session; a session neither copy carries is refused,
since resuming into empty context loses the thread rather than recovering it.

Default stdout: the local transcript path (one line).
--json stdout:  {"agent_id","session_id","path","downloaded"}
