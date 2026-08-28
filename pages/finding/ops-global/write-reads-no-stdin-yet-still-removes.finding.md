---
id: 3525f70b-a9a0-5e7c-9ab2-b6e1be14c387
slug: write-reads-no-stdin-yet-still-removes
page-type-slug: finding
title: "Write reads no stdin yet still removes"
domain-slug: domain/ops-global
---

# Claim

`ops write --input-file -` accepts the flag, reads nothing from it, and carries out the same call's `--remove` regardless. A move written as one act lands as a deletion with no replacement, and reports itself done. This is the shape `Answer Or Refuse` names at `pages/domain/pages-system.domain.md:34`, whose warrant is that "a true empty and a failure read alike, and only one of them is a fault", and whose second aid is "Never let a failed write return like a done one". A command that cannot read its input has to refuse the whole call rather than perform the destructive half of it.

# Evidence

Measured in akasha at `ba4b9d323eeb48213a275f0dda68a326a8924546`.

One call carried a new page on stdin and the old path at `--remove`, to move `web-source-bases-dangle-unaudited.finding.md` from `pages/finding/temper/` to `pages/finding/design-system/`. It printed:

```
gate: 8 akasha check(s) over 1 changed file(s), none refused
write:  0 file(s) written, 1 removed
        pages/finding/temper/web-source-bases-dangle-unaudited.finding.md  2230 -> gone
```

and committed. The page was gone and its replacement had never been written. Nothing in that output says a payload failed to arrive: `none refused` and `1 changed file(s)` read as success, and `0 file(s) written` reads as a call that asked for no write rather than one whose input vanished. It surfaced only on the next command, a read of the new path, which refused because the path named no file. The replacement landed separately at `bd4f615dc3c4f6337f23e8d956e1028fdc201345`.

The payload was well formed and the pipeline was sound. The same generator piped to `head` prints valid JSON, and the same payload through `--input-file /dev/stdin` gates and writes:

```
gate: 9 akasha check(s) over 1 changed file(s), none refused
write:  dry-run -- 1 file(s) would be written
        pages/finding/design-system/probe.finding.md  new -> 171 bytes (+171)
```

Both payload shapes the flag documents fail identically through `-`: a single `{ file_path, content }` object and an array of them each return `error: the payload declares no file, so it asks for no write at all` when nothing else is on the call. That refusal is right, and it is the one the destructive call should have given. With `--remove` present it does not appear.

The two commands disagree on what `-` means and only one of them says so. `ops edit --help` documents `--input-file <f>` as "The tool-call JSON; `-` is stdin and the default". `ops write --help` documents the same flag as "The tool-call JSON: `{ file_path, content }` or an array of them", naming no stdin form, while `ops-cli/global/write/write.command.md:28` gives `-` a meaning on a neighbouring flag: "A body handed in as `--content-file -` cannot be patched." An agent that has just used `ops edit` reaches for `-` here, and it is accepted rather than rejected.

# Fix

Either reading `-` as stdin, or refusing any call whose `--input-file` yields no payload, would close this. Refusing is the safer of the two: it holds whatever `-` is later decided to mean, and it covers every other way a payload can fail to arrive, where reading `-` covers only this one.

It is fixed when a one-file payload piped to `ops write --input-file -` beside a `--remove` either writes the file or refuses without removing anything, and never again prints `0 file(s) written, 1 removed`. `--input-file /dev/stdin` is the control: the identical payload through it writes the file.
