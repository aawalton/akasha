---
id: 9ebff03e-f9ba-5ebf-8882-e5e369849bc4
page-type-slug: finding
title: "Landing admits one tree"
domain-slug: domain/global
---

# Claim

A project row's `landing:` admits exactly one of `deploy` and `instructions`, so a row whose work reaches both trees cannot state its path. The key decides which build task applies and which instrument the checks stage runs, so such a row is given whichever half its author weighed more, and the other half lands under a task that does not describe it.

# Evidence

Measured 2026-08-03 while cutting the rows beneath `initiatives/memory.md`.

`tools/document/schemas/project.ts` declares `landing` with `cardinality: once` over `{ type: "enum", values: ["deploy", "instructions"] }`. Its own comment states the value "decides both which build task applies and which instrument the checks stage runs", and that it is declared rather than derived because nothing about a row's shape says which of the two it is.

Three of the five rows just cut reach both trees. #17596 creates a repository and edits `~/code/packages/agents/instructions/src/lib/replicate.ts:33` and `~/code/packages/shared/dotfiles/setup-symlinks.sh:163-165`. #17597 changes `~/instructions/tools/` and the two guard scripts at `~/code/packages/infra/scripts/block-instructions-direct-write.sh` and `block-instructions-direct-commit.sh`. #17599 is a deletion in `~/code` standing against an objective on an initiative in this repository.

`tasks/lead/change-instructions.md:13` names the crossing — cut a project row where any part of the change reaches the code repository — and so routes exactly this work to a row, without saying what that row's landing is.

Distinct from `pages/finding/project-path/property-definition-has-no-track.finding.md`, which reports a kind of work no track carries at all. This is one row carried by two.
