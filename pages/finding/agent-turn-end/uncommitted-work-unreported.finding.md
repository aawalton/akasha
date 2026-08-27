---
page-type-slug: finding
id: 40413127-0468-55b6-8dfd-7eb81d7475de
slug: uncommitted-work-unreported
title: "A context replacement can strand finished work uncommitted, and only the next seat into the tree finds it"
domain-slug: domain/agent-turn-end
---

# Claim

A seat whose context is replaced can leave finished, tested work uncommitted in a shared checkout, and nothing reports it. The next seat into that tree meets it as foreign state and spends a turn establishing whose it is before it can commit its own change.

The seat that left it is not absent or stopped — it is the same seat, still live, with no record of the work. Nothing at the end of a turn, or the start of the next, asks whether the seat authored a change it never landed.

# Evidence

Read on 2026-08-22 in this seat, `athena`. Re-measured 2026-08-27: nothing in the turn-end machinery asks — `uncommitted`, `--porcelain`, `isDirty` and `dirty` match nowhere across `tools/turn-end-decide.ts`, `tools/turn-end-reading.ts` and the ten `tools/lib/turn-end-*.ts` files.

This seat's session `678f7f33` delegated a palette cleanup in `~/repos/code-editor` at 12:03Z, took the delegate's report at 12:15Z, verified part of it and reported it to Alan at 12:16Z. Five modified files and two new ones were left in the working tree. That session went on to other work in the instructions repository until 12:48Z and never committed them. By 12:49Z this seat was running a new session with no record of any of it.

At 12:59Z the developer dispatched onto #19442 reported the dirty tree as foreign state and asked whose it was, correctly refusing to touch it. It had already checked for an owner and found none: no project document covered it, no branch or worktree held it, nothing in the reflog, no tmux session named for it. Establishing that it was this seat's own took the turn record (then `~/agents/hook-decisions/2026-08-22.jsonl`, which places this seat's earlier session in the write window; that day-file store is gone, and a turn end is now a row posted to `/write-row/seat-turn-end-decision/<name>` by `tools/lib/hook-decision-record.ts:75`) and then that session's transcript. Neither is where a seat would think to look for the owner of a file.

The work itself was sound — 24/0 on the three colour test files, `tsc --noEmit` clean, 462/0 on the whole ops suite through the precommit hook — so nothing was lost, and it is now `5e64544`. That is the shape of the cost: not damage, but a live seat's finished work sitting invisible, and another seat's turn spent finding out it was safe.

Not measured: how often this happens. This is one occurrence, found because a dispatched seat happened to work in the same tree within the hour. Nothing sweeps the checkouts for uncommitted work, so an instance nobody walks into leaves no trace at all, and the rate could be anything. Also not measured: whether akasha, which replaced the instructions and memory repositories, is exposed the same way — it is written through gated commands (`ops write`, `ops edit`) that commit as they write, so a change there is landed or refused rather than left standing, and only a shell write could leave the same state. `/var/home/walton/repos/code-editor` still stands as a checkout outside that path.
