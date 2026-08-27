---
id: 3a08cdb4-c43b-50e7-abbe-561b9031dac8
slug: lore-citation-unchecked-at-write
page-type-slug: finding
title: "Lore citation unchecked at write"
domain-slug: domain/narrative-engine
---

# Claim

`ops awen commit-lore` accepts any non-empty string as a citation quote. The rule it prints in its own help — that the quote must be a verbatim span of the cited turn's published text — is checked by nothing at write time, and the audit that would catch a fabricated one samples 25 rows by default. The pure decider that would refuse it already exists, and the write path already reads the database, so the check is one row read away from the place it would do the most good.

# Evidence

Measured 2026-08-07 from `/home/walton/code` while emptying `dirty/skills/awen-loremaster/SKILL.md`.

What the write path checks. `buildGameLoreWrite` (`packages/alanwalton/awen/src/awen/game-access-lore.ts:48-79`) parses the entry through `LoreEntryInputSchema` at :52, then assembles the upsert. The constraint on the quote is the whole of `LoreCitationSchema` (`packages/alanwalton/awen/core/src/lore-schema.ts:27-33`): `quote: z.string().min(1)`. An absent or empty quote is refused; a paraphrase, a summary, or a sentence the turn never contained is accepted and written.

What states the rule. `commit-lore.ts:24`, in the `--help` block: "The citation.quote MUST be a verbatim span of the cited turn's published text (verified by `ops awen lore-audit`)." The parenthesis names the only thing that checks it.

What that check covers. `lore-audit.ts:20` sets `DEFAULT_SAMPLE = 25`; its help at :26 says it "Reads a random --sample (default 25; --all audits every row)". So a store of any size is checked 25 rows at a time unless a caller remembers `--all`, and a fabricated citation's odds of being drawn fall as the store grows — the opposite of the direction this store is built to scale in.

Why this is a gap rather than a cost decision. The decider is already written and pure: `decideCitationIntegrity` (`lore-schema.ts:108-124`) takes the quote and the turn text, normalizes whitespace so a reflowed span still matches (:102-107), and returns a reason on failure. `buildGameLoreWrite` is already async and already hits the database (`requireGameId`, :55), so calling it at write time costs one further read of the cited turn — which the entry already names, as `citation.turnExternalId`.

Not measured: whether any citation in any live store is in fact non-verbatim. I read what the write path admits rather than running `lore-audit` against a game.
