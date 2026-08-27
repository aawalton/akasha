---
id: 99cb459b-c8bc-530e-a5c6-9e36dfa8d836
slug: part-vs-kind-unstated
page-type-slug: finding
title: "Part vs kind unstated"
domain-slug: page-type/domain
---

# Claim

Whether a child domain's term carries its parent's name follows one line across all 196 domains — a part or attribute of the parent carries it, a kind of the parent does not — and nothing states that line, so each author rediscovers it.

# Evidence

Measured on 2026-08-05 over every surface declaring a `domain-slug:`.

Seventeen domains carry a slug prefixed with a parent's slug, and each is a part or an attribute of that parent: `schema-part`, `schema-key`, `schema-block`, `schema-section`, `schema-fragment`; `principle-act`, `principle-aid`, `principle-warrant`; `domain-design`, `domain-intent`, `domain-vision`; `seat-mode`, `seat-name`; `project-path`; `code-quality`; and `code-repo` and `memory-repo`, which carry the family word as a suffix instead. Every one of their terms now reads with the family name — **Schema key**, **Principle act**, **Seat mode**.

Every child that is a *kind* of its parent is bare: `check`, `gate`, `audit` and `alert` under `instrument`; `database`, `disk-store`, `object-store` and `git-repos` under `storage`; `link` and `mention` under `reference`; `finding`, `initiative` and `project` under `memory`; `document` and `surface` under `schema`; every role and every persona.

Two sites broke the line and were repaired the same day: `ownership` became `domain-championing` in `9ccbdcb4`, and `region` was removed outright in `389ed974`, the line having shown it was one relation of a domain rather than a concern of its own. The principle family reached its terms an hour earlier in `4736b208`, where the bare **Act** competed with the plain English act that `domains/role.md`'s Irreversibility rule uses three times.

What is absent is any statement of the line. `domains/domain.md`'s Design says only that a parent names the area a domain sits inside, and `tools/document/schemas/domain.ts` constrains a term's length and nothing about its words. So the four repairs above were each derived from the corpus rather than read off a surface, and an author who derives it differently gets a term that reads as a second thing.

What is not established: whether stating it earns its place. Both repairs were found by reading the whole set at once, which is what a `define-definition` pass does anyway, and a line on `domain.md` is charged to every reader of every domain document at every boot.
