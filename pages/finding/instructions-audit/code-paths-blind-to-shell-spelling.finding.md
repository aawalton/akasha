---
id: fe5f9c48-f500-54c0-b37f-af91a6b05a4c
page-type-slug: finding
title: "Code paths blind to shell spelling"
domain-slug: domain/global
---

# Claim

`code-paths-resolve` matches a bare `packages/…` path and not a `~/code/packages/…` one, so the five references spelled with that prefix are outside its population. One of them has been dangling on `main` and the check has been green over it: `tools/aw/init/entry-points.ts` named `~/code/packages/shared/cli/src/ops/cli.ts`, an entry point that moved into this repository, and the `cna` shell function it generates ran a file that was not there.

# Evidence

The check reads 1112 paths into the code repository and reports 0 standing nowhere. Pointing `CODE_ROOT` at an empty directory turns that into 1112 standing nowhere, so the instrument is live and the population is real.

Pointing `CODE_ROOT` at a worktree where `packages/shared/cli/src/ops/cli.ts` does not exist leaves it green. `grep -rhoE '~/code/packages/[A-Za-z0-9._/-]+' tools/` returns five distinct paths, and two of them resolve to nothing in either tree — that one, and `packages/infra/scripts/CLAUDE.md`, which is a sample path inside a hook test rather than a file anything opens.

What makes this expensive is the direction of the miss. The prefix is the more explicit spelling: an author writing `~/code/packages/…` is being clearer about which repository they mean than one writing `packages/…`, and it is the spelling a shell command has to use because a relative path would resolve against the caller's directory. So the paths the check cannot see are concentrated in exactly the references that are executed rather than imported — the generated shell functions — where a dangling path fails at the moment a person types a word, and reports nothing to anybody until then.

`entry-points.ts` is five lines and every one of them is a path. Four resolve. The fifth had not for however long the dispatcher has stood in this repository, and the check next to it was green the whole time. That is the shape the failure takes: not a check that is wrong, but one whose population quietly excludes the members most likely to be broken.

Repaired at `896113067` by pointing `OPS` at `~/instructions/tools/ops/cli.ts`, which answers `oauth add-account` — the verb whose own help says it backs `cna`. The repair is not the finding. Widening the population is, and so is asking what else is spelled for a shell rather than for an import.

Found by searching `tools/` for a code-repo path and getting a clean zero from a grep whose known positive also returned nothing.
