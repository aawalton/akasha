---
id: 65bcdfdb-2aad-5f9b-8aca-7dcb9b3be83f
slug: write-drops-its-payload-and-lands-the-removal-alone
page-type-slug: finding
title: "Write drops its payload and lands the removal alone"
domain-slug: domain/pages-system
---

# Claim

`ops write` asked for both a body and a `--remove` lands the removal alone wherever the body did not reach it: `0 file(s) written, 1 removed`, one commit, exit 0. A finding was deleted, the repair that was to replace it was never written, and the tool reported the act done.

# Evidence

Read 2026-08-27, in a scratch git repository at `/var/tmp/write-seam/code-editor` reached by pointing `CODE_EDITOR_ROOT` at it, so the addressed-repository path runs as it does for akasha less the gates.

The reported call, the repair on stdin:

    printf 'the repair, which must land\n' |
      ops write --input-file - --remove pages/finding/pages-system/a-finding.finding.md

    write:  0 file(s) written, 1 removed
            pages/finding/pages-system/a-finding.finding.md  22 → gone
    commit: 205871b7ac6502914897cda032271c06e1a7c22b
    exit 0

Afterwards `git status` is clean and `git log` carries one new commit, whose own message is `code-editor: write 0 files`. The finding is gone from disk and from HEAD. The body on stdin was never read.

Five spellings land the removal alone, every one of them exit 0 and every one of them committing:

- `--input-file -` with a `--remove`, the reported call.
- No payload flag at all, the JSON on stdin, with a `--remove`. Nothing in the call is misspelled; naming a removal is enough.
- `--input-file` naming a path that does not exist, with a `--remove`.
- `--input-file` naming a directory, with a `--remove`.
- `--input-file` naming a file the caller cannot read, with a `--remove`.

Three neighbouring calls refuse whole and leave the tree untouched: a removal of a path that is not there, an unreadable `--content-file` beside a good one, and a removal outside the repository beside a write inside it. `--input-file -` with no `--remove` refuses too, saying `the payload declares no file, so it asks for no write at all` — the right refusal reached by the wrong route, since the payload did declare a file and was never read.

`patches/patch.ts:44-61` is where the body is lost. `payloadText` resolves the `--input-file` value against the working directory and reads it, and every failure of that read returns `null` from a bare `catch`. `-` is a filename there and never stdin, so the reported call opens a file named `-`, gets `ENOENT`, and answers `null`. Nothing downstream can tell that answer apart from a caller who asked for no payload. The same function then declines to consult stdin at all unless `wanted`, which `ops-cli/global/write/write.command.code.attachment.ts:176` computes as `pairs.length === 0 && named.length === 0` — false the moment a `--remove` is named.

`write.command.code.attachment.ts:179` reads the resulting empty payload as a call that asked for no write, because `named.length > 0` carries the guard. Line 184 then finds `pairs` and `carried` both empty and sets `removingOnly`, and line 185 turns that into `mechanical`, so a call whose write was silently dropped also stands the akasha read gates aside on its way through.

`--content-file` escapes all of this only because its `readFileSync` at lines 195 and 221 is not wrapped in a catch, so an unreadable body throws rather than reading as an absent one.

`ops edit` and `ops mv` call the same `payloadText`. `ops edit`'s own help at `ops-cli/global/edit/edit.command.code.attachment.ts:149` states `` `-` is stdin and the default ``, which the shared function has never honoured; `ops edit` refuses rather than half-applying, so the cost there is a false help line rather than a lost body.
