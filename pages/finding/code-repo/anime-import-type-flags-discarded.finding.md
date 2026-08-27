---
id: 292af9dd-7df0-563a-be63-0cfe5b4b6670
page-type-slug: finding
title: "Anime import type flags discarded"
domain-slug: repo/code-repo
---

# Claim

`ops anime import` accepts `--season-type` and `--episode-type`, parses them, resolves them and then discards them. Both are declared in the command's own `--help` as overrides of an account-derived page-type slug, with nothing marking them inert. A caller that passes either gets exit 0, a written show page, and no signal that half of what it asked for went nowhere.

# Evidence

Verified 2026-08-08 against `~/code` on `main`, while emptying `dirty/code/packages-collections-shows-docs-anime-logging.md`.

Declared and described. `packages/collections/shows/src/cli/import-anime.ts:33-46` declares `--season-type` and `--episode-type`, each `valueShape: "token"`, each described as "Override the account-derived season/episode page-type slug (default: resolved from --user-id)". Neither says the value is unused.

Parsed and forwarded. Lines 103-104 read them with `parsed.string(...)`; lines 118-119 pass them into `importAnime` as `seasonType` and `episodeType`.

Resolved and dropped. `anime/import-anime.ts:116-120` builds `const resolved = { show: args.showType ?? accountTypes.show, season: args.seasonType ?? accountTypes.season, episode: args.episodeType ?? accountTypes.episode }`. Line 122 then calls `writeShow(getPageAccessClient(), { anime, accountUserId: args.accountUserId, showType: resolved.show, status, rating, completedAt })`. `resolved.season` and `resolved.episode` appear on no other line. `WriteShowArgs` declares no season or episode field, so the compiler could not carry them further if they were passed.

Read off the executable lines, not the comment. The module docblock at `import-anime.ts:13-15` does declare the gap — "only the show write is wired today" — but it sits in the module, not on the surface a caller reads, and the two flag entries in `--help` still read as live overrides.

Nothing refuses it. Of the 232 mechanisms `ops enforcement list` names, the one reading this surface is `check-cli-prose-flag-route-coverage`, whose docblock (lines 3-12) refuses flags "that declare no value shape, or that carry prose with no route but the shell". Both declare `valueShape: "token"` and neither is a prose flag, so it passes them green. Nothing measures whether a parsed flag reaches a consumer.

Not established: whether the per-episode write path is still intended, or whether the flags should be removed rather than wired.
