---
id: e6a72119-4cb9-52e4-90eb-167c0fbab708
slug: bash-env-family-names-no-act
page-type-slug: finding
title: "Bash env family names no act"
domain-slug: page-type/refusal
---

# Claim

All five `bash-env-*` refusal documents are diagnosis without remedy: each carries a single `# Refusal` section naming what is wrong and no act the blocked reader can take next.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/bash-env-outside-repo.md` dispatched from `review-documents`. The reading raised it as a decision about the family rather than about its subject; the family was checked here.

The refusals are files in akasha now, `pages/refusal/*.refusal.md`, and the five are `bash-env-outside-repo`, `bash-env-settings-absent`, `bash-env-settings-unreadable`, `bash-env-undeclared` and `bash-env-unresolved`.

`refusals/bash-env-outside-repo.md`, `-settings-absent.md`, `-settings-unreadable.md`, `-undeclared.md` and `-unresolved.md` each carry diagnosis only. The shape is prose rather than structure: all 118 refusal documents hold a single `# Refusal` section, and a document that names an act names it in a second paragraph inside that section. There are 154 refusal documents now, the shape is unchanged, and all five bash-env bodies still close on the diagnosis.

The hook family shows what that looks like. `refusals/hook-not-firing-at-all.md` closes on "Check that this session was launched with `--settings` naming this repository's `settings/agents.json`, then run `bun ~/instructions/tools/run-checks.ts --check hooks-fire`". `refusals/hook-never-stamped.md` does the same. None of the five bash-env bodies has a second paragraph.

Those two hook bodies are gone. The refusals naming an act today are `pages/refusal/refusal-values-unreadable.refusal.md`, `writer-unidentified`, `required-reading-writer-unidentified`, `persona-champion-unreciprocated` and `championed-domain-unnamed-back` — five of the 154.

The refusal schema's own words are that a refusal is read by someone just stopped who wants the act they can take next.

What makes it a fork rather than a repair: what the check would accept is settled, and which act gets there is not. For the subject read, either repointing the declaration at `tools/bash-env.sh` (still there) or moving the outside file's contents in would satisfy `bash-env-inside.ts`, now `tools/audits/bash-env-inside.ts`, and which is right depends on why the declaration left in the first place — something the document cannot know.

A second reading, of `-settings-absent.md`, reached the same fork independently and added the precedent question: the commit that added a remedy to a refusal, `5f098ce8c`, rested on a sibling already spelling one, and no sibling spells one here. Whether the act is "write the file", "restore it from git" or "relaunch with --settings" is settled by no instrument either reading could run.

Not measured: how many refusal documents outside this family name no act, or whether any reader has been stopped by one of the five and had to work the remedy out.
