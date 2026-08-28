---
id: 41b4ac18-06c0-5fba-9aed-1a3a72bcecc9
page-type-slug: finding
title: "A refused write records no reading"
domain-slug: domain/read-record
---

# Claim

A write refused for unread files creates no read record entry and refreshes no existing one. The read record cannot be made to vouch for a document through the write path, so a stored entry still means a body reached the agent.

# Evidence

Measured 2026-08-28 05:43 from inside a running delegate, against its own record at `agent/subagent/astra--a35ba5d8cf77124b6.subagent.readings.uncommitted.attachment.json`.

The control document was `tools/lib/agent-record.ts`, absent from the record before the attempt. The same query against `pages/repo/akasha-repo.repo.md` returned `PRESENT seenAt=1787917180937`, so the query hits when the answer is there.

`ops write --dry-run` over that path was refused: "You have not read `tools/lib/agent-record.ts`", and "nothing was written". After it the record still held 58 entries, `agent-record.ts` was still absent, and no entry carried a `seenAt` at or after the mark taken just before the attempt. The same threshold query lowered by one minute returned the entry a *successful* write had made moments earlier, so the threshold query hits too.

A successful write does record one reading: the file it wrote, and only that. The write of a probe finding took the record from 57 entries to 58, the new entry being the written path itself.

An agent seeing several unrelated documents timestamped at the moment of a refusal is seeing the `ops read` it ran in answer to that refusal, not the refusal. `ops read` re-records every file in the required-reading tail on each call, including those it reports as unchanged: one document was stamped at 11:30:11, 11:30:18, 11:30:29, 11:30:59, 11:31:11 and 11:37:42 across six consecutive reads in one session.

Not measured: whether a write refused by a check other than `read-before-write` behaves the same.