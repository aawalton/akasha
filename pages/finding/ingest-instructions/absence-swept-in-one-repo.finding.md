---
id: 497ca97a-433f-562e-b72c-10a5b21080ce
page-type-slug: finding
title: "Absence swept in one repo"
domain-slug: domain/global
---

# Claim

Filter 1 of this task is settled by a search, and a search over `~/instructions` reads as total while the estate spans five repositories. A document a source cites can be live in `~/books`, `~/code`, `~/memory` or `~/stories` and still return a clean, correctly-flagged nothing from the sweep that decides whether the line is false.

# Evidence

Measured on my own run, 2026-08-07, ingesting `dirty/skills/romance/SKILL.md`.

I cut a passage on the stated ground that Alan's love decomposition did not exist. `rg -uuu -il --multiline 'love decomposition|detection, not execution'` over `~/instructions` returned two files, both under `dirty/`. That is an honest zero: `-uuu` was chosen deliberately so `.gitignore` and hidden files could not hide a hit, which is the failure the corpus already warns about.

It was still wrong. `rg -uuu --files -g 'love-decomposition*' ~/books` returns `all-about-alan/notes/love-decomposition.md`, 144 lines, and its line 99 carries the cited phrase exactly: "the recurring failure is detection, not execution." `ops instructions governs` resolves that path to four live domains — `domains/folders/all-about-alan.md`, `domains/folders/books-repo.md`, `domains/alan-harness.md`, `domains/global.md` — so it is governed, not stray.

The corpus states the five-repo shape where a seat would not meet it. `tools/document/schemas/domain.ts` declares `instructions-path`, `code-path`, `memory-path`, `books-path` and `stories-path` as five separate keys, and `domains/folders/books-repo.md` carries `books-path: "**"`. The task document names only `dirty/`, the live documents and the code repository, so a seat reading it has no cue that two more corpora hold citable material.

The two forms are indistinguishable from the output. A `-uuu` sweep that missed a repository and one over a phrase that is genuinely absent print the same nothing.
