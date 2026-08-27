---
id: 4bf293c5-c010-51c5-8586-50d752e74676
slug: corpus-undeclared-in-three-senses
page-type-slug: finding
title: "Corpus undeclared in three senses"
domain-slug: domain/domain-system
---

# Claim

`corpus` carries three unrelated senses across the repository, none of them declared by a domain, and nothing in the harness can report a word in that state.

# Evidence

Measured 2026-08-13, whole-word, over every `.ts`, `.md` and `.sh` outside `.git`.

The instructions repository itself, the body of documents with its personas, roles, tasks and domains — `tools/corpus.ts`, `ops instructions corpus`, `tools/lib/domain.ts`, `tools/checks/seat-name-corpus-mirror.ts`, `tools/tests/corpus.ts`, the seat-name readers.

One set of rules run and proven together — the mail rules, the category rules, the turn end rules.

A body of data rows the rules are decided over — transactions in `monarch/agree.ts` and `monarch/rules.ts`, turn ends in `tools/lib/turn-end-decide.ts` and `tools/lib/turn-end-tally.ts`.

Three of them are `export interface Corpus` in different files, meaning different things: `tools/lib/domain.ts` is the first sense, `tools/lib/project-tree.ts` the first again over memory, `tools/lib/email-partition.ts` and `monarch/rule-documents.ts` the second.

`Plain Or Declared` on `domains/global.md` holds that a word given a sense of its own is declared as a domain first. None of the three is. The second is now `domains/rules-engine-rule-set.md` and swept; the other two stand undeclared and are not judged here.

Found by Alan asking what the word meant in a report. The coining that prompted it went unremarked at the time by every reader and every instrument.

Nothing measures this. `checks/terms-in-reach.ts` asks whether a DECLARED term reaches the readers of a document using it, so an undeclared word is outside what it can see, and a second sense coined over an undeclared first is outside it twice. Whether an instrument could separate a private sense from ordinary use across a repository is not judged here.

This supersedes a finding of the same observation filed earlier the same day, which recorded two senses and missed the third.
