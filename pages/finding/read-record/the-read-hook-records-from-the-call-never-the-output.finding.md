---
id: 1ddf864c-03b6-594e-914c-5a385f020e33
page-type-slug: finding
title: "The Read hook records from the call, never the output"
domain-slug: domain/read-record
---

# Claim

The hook recording a native `Read` reads only the call — `file_path`, `offset`, `limit` — and never the tool's output. Where `offset` is absent and `limit` reaches the last line, it records the file read whole under the agent's id, with the oid of the body it read from disk itself. So the record can assert a reading whose body never reached the agent, which is the one thing `ops read` refuses to allow.

# Evidence

Read 2026-08-28 at `6f86fc1b` by reading the code. Not run.

`tools/hooks/agent-hook-record-read.agent-hook.code.attachment.ts:32-38` reads the file from disk, counts its lines, takes `start` from `tool_input.offset` (default 1) and `end` as `Math.min(lines, start + limit - 1)`, `limit` defaulting to `DEFAULT_READ_LIMIT` = 2000 (`tools/lib/read-record.ts:26`), then:

    if (start !== 1 || end < lines) return
    recordRead(agent, resolved, Date.now(), blobId(bytes))

A partial read returns without recording, which is `domain/read-record`'s "A partial read leaves no record" and is right. But the whole decision is taken from `tool_input`, and `tool_response` is never touched. A `Read` naming a `limit` at or above the line count records the whole body whatever the tool returned, and the oid recorded is of the bytes the hook itself read, not of anything delivered.

`ops read --help` states the opposite guarantee for its own command: "WHAT THE RECORD SAYS IS THAT THE BODY REACHED YOU, so a read whose output is being thrown away is REFUSED." `domain/read-record` line 25 says "A read the system did not perform leaves no record." `read-before-write` then admits a write on such a record, asking only that `log.reading(absolute)` is non-null and that its oid matches the body being written over (`checks-system/check/read-before-write/read-before-write.check.code.attachment.ts:57,69-70`).

`finding/read-record/read-tool-unrecorded` records this same hook failing the opposite way, dropping reads that did happen. This is the same decision point in the other direction.

Not observed: the seat that wrote this has no `Read` tool, so the route was read off the hook rather than run. Nobody has measured whether the native `Read` truncates at a size or line width that would make a delivered body differ from the recorded one. Until someone runs it this is a gap in the guarantee, not a count of false records.
