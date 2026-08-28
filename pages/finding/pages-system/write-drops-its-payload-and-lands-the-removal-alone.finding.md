---
id: 65bcdfdb-2aad-5f9b-8aca-7dcb9b3be83f
slug: write-drops-its-payload-and-lands-the-removal-alone
page-type-slug: finding
title: "Write drops its payload and lands the removal alone"
domain-slug: domain/pages-system
---

# Claim

`ops write` asked for both a body and a `--remove` landed the removal alone wherever the body did not reach it, reporting `0 file(s) written, 1 removed`, one commit, exit 0, and became `--mechanical` on that path with nobody typing the flag.

# Evidence

Read 2026-08-27, in a scratch git repository at `/var/tmp/write-seam/code-editor` reached by pointing `CODE_EDITOR_ROOT` at it, so the addressed-repository path runs as for akasha less the gates.

The reported call, the repair on stdin, printed `write: 0 file(s) written, 1 removed`, committed at `205871b` under its own message `code-editor: write 0 files`, and exited 0. Afterwards the finding was gone from disk and from HEAD. The body on stdin was never read.

Five spellings landed the removal alone, every one exit 0 and every one committing: `--input-file -` with a `--remove`, the reported call; no payload flag at all with the JSON on stdin and a `--remove`; and `--input-file` naming a path that does not exist, a directory, or a file the caller cannot read, each with a `--remove`. Three neighbours refused whole and left the tree untouched: a removal of a path that is not there, an unreadable `--content-file` beside a good one, and a removal outside the repository beside a write inside it.

`patches/patch.ts:44-61` was where the body was lost. `payloadText` read the `--input-file` value as a path, and every failure of that read returned `null` from a bare `catch`, which nothing downstream could tell from a caller who asked for no payload.

`write.command.code.attachment.ts` derived `removingOnly` from a call carrying no bodies and turned it into `mechanical`, which drops `read-before-write` and `read-what-is-required`, the two checks `needsAuthor` marks, so any call whose payload was lost inherited that exemption. `bc00cd7bb` joined them on 2026-08-26 under the one-line message "Land a removal-only call as mechanical", with no test and no stated reason.

Landed 2026-08-27: the escalation severed, so only the flag sets `mechanical`; `ops write` pointed at `tools/lib/payload.ts`; an unreadable or empty payload beside a `--remove` refusing the whole call. No caller in the repository invokes `ops write` with only removals, and `tools/lib/gated-landing.ts:118` passes `--mechanical` explicitly.
