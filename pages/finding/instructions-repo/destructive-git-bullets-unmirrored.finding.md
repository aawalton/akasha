---
id: 0180f8b5-771a-5801-842c-2477bd361021
page-type-slug: finding
title: "Destructive Git bullets unmirrored"
domain-slug: repo/instructions-repo
---

# Claim

`tools/hooks/block-destructive-git.sh` keys its safe-alternative bullets to a document that no longer exists. Its comment says they mirror the flat list under `Prohibited Tools > Destructive git subcommands > Safe alternatives` in the repo-root CLAUDE.md, and the code repository has no repo-root CLAUDE.md. Those bullets are what an agent is handed when a destructive verb is refused, and nothing reports that the mirror has lost its original.

# Evidence

Measured 2026-08-07 against `~/code` at `1313565199` and the instructions repo at `a9270eb28`.

The citation. `tools/hooks/block-destructive-git.sh:75–81` introduces `emit_bullet()`: "Canonical safe-alternative bullets — keyed by short identifier, mirroring the flat list under `Prohibited Tools > Destructive git subcommands > Safe alternatives` in the repo-root CLAUDE.md."

The original. `ls CLAUDE.md` in `~/code` fails. `git ls-files | grep -i '^CLAUDE.md$'` exits 1. The repository carries no root-level markdown file of any name — `git ls-files --full-name | grep -v /` returns config and lockfiles only. The one path matching `claude.md` case-insensitively anywhere in the tree is `packages/infra/checks/__fixtures__/no-readme/clean/CLAUDE.md`, a test fixture. The document stands quarantined in the instructions repo as `dirty/code/claude.md`, which is queued for its own emptying rather than for restoration.

Reach. One live citation, this one. `git grep -n -i 'CLAUDE.md'` outside `dirty/` returns this line plus test paths and `domains/personas/claude.md` references, none of which cite the repo-root document's content. `tools/tests/block-pages-mirror-edit.test.ts` passes `packages/infra/scripts/CLAUDE.md` as a hook input string, which exercises path routing and does not depend on the file existing.

What is not claimed here. The hook itself works: its verb list, its refusals and the bullets it prints are all in the script, exercised by `tools/tests/block-destructive-git.test.ts`, and none of them read the cited document at runtime. What is gone is the thing the bullets were kept honest against.

Found while ingesting `dirty/questions/guard-doctrine.md`, whose entry on guard strictness turned on the same repo-root `CLAUDE.md` being the governing surface. That entry was cut; this citation is live and outlives it.
