---
id: 88fc9e93-a9bd-4ded-ba2b-985f28043a2b
slug: ops-write-takes-a-body-on-stdin-and-never-says-so
page-type-slug: finding
title: "Ops write takes a body on stdin and never says so"
domain-slug: domain/page-writes-system
---

# Claim

`ops write --file-path <p> --content-file -` lands a piped body byte-exactly outside every repo, 39 characters longer than `>`. Nothing documents it: "stdin" appears zero times in `ops write --help` and twice in `ops edit --help`. Four delegates in one night, each holding One Write Path in its brief, each reached for `>` to capture `git show`. That reads as one undocumented flag, not four lapses.

# Evidence

Measured 2026-08-28 by seat astra.

`git show d222c5c37e^:tools/lib/message-to-person.ts` — the file one delegate captured with `>` — landed byte-exactly through both stdin routes, 1904 bytes, sha256 f33d5b60 matching the source:

```
git show REF:PATH | ops write --file-path /var/tmp/old.ts --content-file -
```

On that job `>` is 69 characters, `--content-file -` 108, and `jq -Rs ... | ops write --input-file -` 139.

The JSON route is the worse of the two. Given bytes that are not UTF-8, `jq -Rs` substitutes U+FFFD and exits 0: 4 bytes in, 8 bytes landed, reported as `1 file(s) written`. `--content-file -` refuses the same input — "stdin is not UTF-8 text, and this path file kind does not carry bytes".

`ops-cli/global/write/write.command.md:28` names `--content-file -` only to say it cannot be patched. The help generated at `write.command.code.attachment.ts:144` describes `--input-file` without naming stdin.

Where `a-shell-redirect-into-the-repository-is-never-refused` measures a rule unenforced inside the repo, these four breaches were scratch files outside every repo, where the breach costs nothing and compliance costs a flag nobody wrote down. A rule costing more to keep than to break goes on being broken.

Not measured: whether any of the four read the command page.
