---
id: 796e2378-a46e-5508-9657-d166a775e94b
slug: seed-version-disagrees
page-type-slug: finding
title: "Seed version disagrees"
domain-slug: domain/global
---

# Claim

`ops awen seed-doctrine-pack` says two different versions of itself in one help screen: its summary and its description both name a "built-in v6 seed", and the sentence below them reads "Seeds doctrineVersion 7".

# Evidence

The description interpolates `GM_DOCTRINE_VERSION_SEED` from `packages/alanwalton/awen/src/awen/doctrine-pack-seed.ts`, which stands at 7; the words "v6" beside it are prose that did not move when the constant did. The summary in `packages/alanwalton/awen/src/awen/registry.ts` says "v6" as well, so the header line and the body of one screen disagree.

Both spellings crossed into `tools/commands/awen/seed-doctrine-pack.ts` unchanged, `--help` proving byte-identical before and after, because a repair made while moving a body cannot be told from the move.

Nothing turns on it beyond the reading: the seeded row is canonical once written, and this workspace's row stands at doctrineVersion 33, so the seed literal is reached only on a fresh bootstrap.
