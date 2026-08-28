---
id: 65bcdfdb-2aad-5f9b-8aca-7dcb9b3be83f
slug: write-drops-its-payload-and-lands-the-removal-alone
page-type-slug: finding
title: "Write drops its payload and lands the removal alone"
domain-slug: domain/pages-system
---

# Claim

`ops write` asked for both a body and a `--remove` landed the removal alone wherever the body did not reach it: `0 file(s) written, 1 removed`, one commit, exit 0. A finding was deleted, the repair that was to replace it was never written, and the tool reported the act done. The call also became `--mechanical` on that path, standing both read gates aside with nobody typing the flag.

# Evidence

Read 2026-08-27, in a scratch git repository at `/var/tmp/write-seam/code-editor` reached by pointing `CODE_EDITOR_ROOT` at it, so the addressed-repository path runs as it does for akasha less the gates.

The reported call, the repair on stdin, printed `write: 0 file(s) written, 1 removed`, committed at `205871b` under its own message `code-editor: write 0 files`, and exited 0. Afterwards `git status` was clean and the finding was gone from disk and from HEAD. The body on stdin was never read.

Five spellings landed the removal alone, every one exit 0 and every one committing: `--input-file -` with a `--remove`, the reported call; no payload flag at all with the JSON on stdin and a `--remove`, where nothing is misspelled and naming a removal is enough; and `--input-file` naming a path that does not exist, a directory, or a file the caller cannot read, each with a `--remove`. Three neighbours refused whole and left the tree untouched: a removal of a path that is not there, an unreadable `--content-file` beside a good one, and a removal outside the repository beside a write inside it.

`patches/patch.ts:44-61` was where the body was lost. `payloadText` resolved the `--input-file` value against the working directory and read it, and every failure of that read returned `null` from a bare `catch`. `-` was a filename there and never stdin, so the reported call opened a file named `-`, got `ENOENT`, and answered `null`, which nothing downstream could tell from a caller who asked for no payload.

`ops edit` and `ops mv` call that same function, and both fail closed, so the loss was confined to `ops write`. `ops edit`'s own help at `edit.command.code.attachment.ts:149` states `-` is stdin and the default; `ops write --help` said nothing about `-` at all. Three commands, one promise, one shared function that has never kept it — which is why three separate agents rediscovered this independently.

The escalation is the sharper half. `write.command.code.attachment.ts` derived `removingOnly` from a call carrying no bodies and turned it into `mechanical`, which drops `read-before-write` and `read-what-is-required`, the two checks `needsAuthor` marks. So a removal never had to have read what it deletes, and any call whose payload was lost on the way in inherited that exemption. `bc00cd7bb` joined them on 2026-08-26 under the one-line message "Land a removal-only call as mechanical", with no test and no stated reason.

What was decided and landed on 2026-08-27: the escalation severed, so only the flag sets `mechanical`; `ops write` pointed at `tools/lib/payload.ts`, whose `readsPayload` and `readPayload` are the built and tested version of this rule and honour `-` as stdin; an unreadable or empty payload beside a `--remove` refusing the whole call; and a removal-only call whose stdin might carry a body refusing rather than discarding it, naming `--input-file -`. Measured first: no caller in the repository invokes `ops write` with only removals, and `tools/lib/gated-landing.ts:118` passes `--mechanical` explicitly, so nothing depended on either behaviour.

Two defects in that fix were caught by positive controls rather than by the failing cases, and would have shipped had the failing-case matrix been trusted alone. The refusal named `< /dev/null` as the way to spell a bare removal and then refused it, /dev/null not being a terminal either, so every scripted removal-only call would have been refused with a remedy that does not work. And the empty-payload refusal fired on every legitimate bare removal, making one impossible. Both were found by running the forms that are supposed to succeed, not the ones that were supposed to fail.

One piece of the ablation still stands. `payloadText` remains in `patches/patch.ts` backing `ops edit` and `ops mv`, and still resolves `-` as a filename rather than stdin, so `ops edit`'s help promise is still unkept. Both fail closed, so neither loses a body, and the old version cannot go until they are moved too.

A SECOND AXIS IS NOT CLOSED BY ANY OF THAT. `repo/land/land.ts` writes every body and unlinks every removal before it commits, so a commit lost to git's index lock leaves the act applied and unrecorded. Held the lock by hand and ran a write-and-remove that gates clean: exit 3, no commit, and `git status` showing ` M` on the written file and ` D` on the removed one. The removal half is destroyed too, which `a-write-passes-its-gate-and-then-fails-to-commit` did not record. Making the write and the commit one event needs a locking or staging protocol and was not attempted; the refusal now names what stands in the working tree instead of reading as though nothing happened.
