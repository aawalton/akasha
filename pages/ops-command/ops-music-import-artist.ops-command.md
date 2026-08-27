---
id: 81be02e8-0b33-5a11-8920-558965890644
page-type-slug: ops-command
title: "Ops music import-artist"
slug: ops-music-import-artist
domain-parent-slug: domain/ops-music
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/music/import-artist.ts
path: music import-artist
---

# Definition

- **Ops music import-artist** — upserting one MusicBrainz artist and their canonical songs into the `artist` / `music-song` page types.

# Help

Import a single artist and all of their canonical songs from MusicBrainz into the `artist` / `music-song` page types. Resolve the artist by --name (best search match) or --mbid (exact). Songs are MusicBrainz `work` entities (deduplicated compositions), each landed as a `music-song` page naming its artist. Idempotent: re-running merges into the page in place, keyed on the MBID, so a rating or a tag written there by hand stays.
