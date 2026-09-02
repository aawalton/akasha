---
id: 97702df1-55aa-578b-93c6-1200bfe1d4f9
page-type-slug: old-ops-command
title: "Ops edit"
slug: ops-edit
domain-parent-slug: domain/ops-global
required-reading-slugs:
  - page-type/old-ops-command
command-path: ops-cli/global/edit/edit.command.code.attachment.ts
path: edit
irreversible: false
---

# Definition

- **Ops edit** — stated substitutions worked out into whole bodies, gated together and landed or refused as one.

# Help

Change passages in place by exact-string replacement, gating the whole result.

Takes the object the native Edit tool takes — `{ file_path, old_string, new_string, replace_all }` — on stdin or from --input-file. An `edits` array of those same objects applies several to one file, in order, each judged against what the one before produced. An array of the whole thing is one act across several files, admitted whole or refused whole.

Each pair must match uniquely: no match refuses, because the body is not what the caller thought; more than one refuses, because the caller did not say which. `replace_all` widens a pair to every occurrence, and no match still refuses. Every refusal names the file as well as the pair, and every file that could not be prepared is named at once.

Exact strings rather than a diff: a generated diff goes wrong at line offsets and context windows, and fails in a way that still looks applicable, which is the worst shape for a command whose job is refusing bad input.

A call addressing akasha has its substitutions applied here to work out the body each file would end at, and the checks akasha defines are run over those bodies before any reaches disk. A call addressing any other repository lands unjudged. A path inside no repository is written where it lies, with nothing committing it.

A file that changes between the read a body was composed from and the write that lands it refuses the whole call, by mtime, naming every file that moved. What lands is the whole body, so a change made elsewhere in the file would be reverted with nothing saying so.
