---
id: e4412c4c-422d-5504-90bc-ef9e7cec5e5c
slug: agent-rows-carry-no-history
page-type-slug: finding
title: "Agent rows carry no history"
domain-slug: domain/pages-system
---

# Claim

Agent rows carry no version history at all, so any bulk correction to them is unrecoverable from the database and depends on an unrelated file happening to hold the same facts.

# Evidence

Measured 2026-08-04 while verifying #17665. `select count(*) from page_versions pv join pages p on p.id = pv.page_id where p.page_type_slug = 'agent'` returns 0, against 9,483 undeleted agent rows.

This was not theoretical. #17563 drained the domain axis off live rows, faithfully executing a standard that then read `domains/*.md` is the whole of the domain vocabulary. Alan ruled on the same day that domain has subtypes and the vocabulary is every surface declaring `domain-slug:` — 167 rather than 74 — so the drain had cleared legitimate values.

#17665 then had to restore them and reported that history could not help: `page_versions` was empty for this page type, and the pin file was the only surviving witness of what each seat had stated. It recovered 556 rows, 0 refused, of which 422 held `instructions-repo`; 4 were correctly left absent. The lead confirmed 422 rows now carry `instructions-repo`.

So the recovery worked by luck rather than by design. The pin store is runtime state under `$HOME` that no commit carries, kept for an unrelated purpose — resolving which surfaces a seat loads. Had a seat pinned differently, or had the pin store been cleared, the drained values would simply be gone.

The exposure is general rather than specific to this incident. Every future narrowing of an axis vocabulary, and every bulk attribute correction on this page type, has the same property: `_enforce_page_coherence` forces the order stop-minting, drain, then narrow, so a drain is a normal step rather than an exceptional one, and nothing behind it records what was there.

Not verified: whether other page types carry versions where this one does not, whether the absence is configuration or design, and what it would cost to turn versioning on for this type.
