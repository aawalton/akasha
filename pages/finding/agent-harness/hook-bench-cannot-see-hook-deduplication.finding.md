---
id: 49ea6b4a-822a-5631-befa-43e9a7be89ec
page-type-slug: finding
title: "Hook bench cannot see hook deduplication"
domain-slug: domain/agent-harness
---

# Claim

`tools/hook-bench.ts` cannot observe the merge's deduplication of hook registrations, because it installs each declared command behind its own numbered shim — so two registrations of one hook always carry distinct command strings, always survive the dedup key, and always fire twice regardless of what the client would have done with the real spellings.

# Evidence

Measured 2026-08-05 while looking for an instrument to settle whether a hook reaches a seat's union twice.

`tools/lib/hook-merge.ts` records the merge as measured: Claude Code unions hook entries across every tier it loads and deduplicates them on `pluginRoot ?? skillRoot ?? "" <NUL> shell <NUL> command <NUL> args <NUL> if`, byte-identical string equality and nothing softer. So whether one hook fires once or twice turns entirely on whether two registrations produce the same `command` string.

`hook-bench.ts:213` writes each declared command to `${runDir}/commands/${label}` and registers, in its place, a call to `lib/hook-bench-record.ts <runDir> <label>`. The label is per-declaration. Two declarations of one script — the exact input a doubling test needs — therefore reach the client as two different command strings and land under two different dedup keys, whatever the two originals were. The bench reports two firings for a pair the client would have collapsed to one, and would report two for a pair it would have collapsed as well.

The wrapping is not a defect: `lib/hook-bench-record.ts` states why it exists, which is that the client names a firing only by its event and matcher, so two hooks under one matcher arrive under one name and the payload is not carried at all. That is worth what it costs for the questions the bench was built for — what crossed into a hook, whether it fired, what a subagent's call looks like from inside it. Deduplication is simply not among them, and nothing in the bench's own help says so.

What was used instead, on project #17852, was enumeration: if exactly one source a seat loads carries a `hooks` key, no hook can reach the union twice whatever the merge does. That answers the whole population where a probe answers one hook, and it needs no client run.
