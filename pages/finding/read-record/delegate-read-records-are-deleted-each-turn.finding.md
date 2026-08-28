---
page-type-slug: finding
title: "Delegate read records are deleted each turn"
domain-slug: domain/read-record
---

# Claim

A delegate that reads a file through `ops read` and then tries to write it in any later turn is refused for not having read it. The record is not expiring, and it is not the context being replaced. The file holding it is deleted, on purpose, by a hook, at the end of every one of the delegate's turns.

The delegate's read record lives in a sidecar beside the delegate's own page: `agent/subagent/<seat>--<id>.subagent.readings.uncommitted.attachment.json`, next to `<seat>--<id>.subagent.md`. The `SubagentStop` hook removes that page. Removing a page takes its sidecars with it, and the read record is one of them.

The effect is that a delegate has a read record only within the turn that made it. Any plan that reads in one turn and writes in the next is refused, and the refusal names the file rather than the mechanism, so it reads as though the read never happened.

# Evidence

`tools/hooks/agent-hook-state-subagent.agent-hook.code.attachment.ts:50-52` calls `removeSubagentPage(agent)` when the event is `SubagentStop` (the constant is at line 5).

`tools/lib/subagent-page.ts:120-134` resolves the delegate's `.subagent.md` and runs `rm.ts` over it.

Removing a page sweeps what stands beside it. `ops-cli/global/write/write.command.code.attachment.ts:283-290` calls `sidecarsBeside(at.root, removals)` and returns `[...removals, ...beside]`, so the sidecars are part of the same removal.

`page/sidecar/sidecar.ts:6` is the pattern that catches the record: `/^(.*)\.[a-z0-9-]+\.uncommitted\.attachment\.[a-z0-9]+$/`, first in the list `pageOfSidecar` tries at lines 16-25. Against `<agent>.subagent.readings.uncommitted.attachment.json` it yields `<agent>.subagent.md`, which is exactly the page being removed, so `sidecarsOf` at lines 32-47 returns it.

The suffix the record is written under is `agent/read-record.ts:21`, `.readings.uncommitted.attachment.json`, and `readRecordFor` reads it via `besidePage(page, READINGS_SUFFIX)` at line 190. Records for other delegates stand on disk under `agent/subagent/` right now with that exact name, so the location is not hypothetical.

Observed repeatedly over one working session: an `ops edit` refused for a file read minutes earlier in a previous turn, and admitted with no other change when the same file was read again in the same turn as the edit. The working practice that came out of it is to re-read immediately before each edit, in one turn.

The removal and the remaking both stand in git, for one delegate over one message. `54a3a47cf` 23:45:40 removes `agent/subagent/astra--a10b0e4f22e3300fb.subagent.md` with the message "astra--a10b0e4f22e3300fb returned, so its page goes"; `1b4124cae` 23:47:07 adds the same path back when a coordinator's message resumed that delegate; `490c77ff8` 23:36:17 had added it when the delegate was first dispatched. So the page is removed at return and remade on resume, and the delegate can record again afterwards. The sidecar is untracked, `.gitignore:1` matching `*.uncommitted.*`, so it does not come back with the page: that delegate's record went from 32 entries to 8 across the resume, the 8 being what the first read after it re-recorded.

Worth noting against `pages/domain/read-record.domain.md:19`, "A replaced context takes every reading the agent has made". That names context replacement as the way readings are lost. This is a second way, it is not written down, and unlike context replacement it happens on a schedule the agent cannot see or avoid.
