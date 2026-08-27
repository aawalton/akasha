---
id: 01a01ff4-775f-7000-b70d-df7cb2f66460
slug: royal-road-sync-would-still-fail-if-only-its-directory-were-repointed
page-type-slug: finding
title: "Royal road sync would still fail if only its directory were repointed"
domain-slug: domain/royal-road
---

# Claim

The 2026-08-18 restructure moved royal road stories twice over: the directory went from `read/royal-road/<story>/` to `<world>/royal-road/<story>/`, and the story file itself was renamed from `story.md` to `<slug>.md`. `royal-road-sync` reads both old spellings. Repointing only the directory leaves it reading a `story.md` that no story has, so it would find every story and sync none of them.

# Evidence

Measured on 2026-08-20 over the whole stories repository. Population: 103 directories matching `*/royal-road/*/`, holding 17,709 chapter files. Of those 103 story directories, 0 hold a `story.md`; each holds `<slug>.md` instead, beside a `chapters/` directory.

`services/royal-road-sync.ts` reads `${STORIES_ROOT}/read/royal-road` at `:9` and `${READ_DIR}/${dir}/story.md` at `:50`. `readStories` skips a directory whose story file will not open, by the `catch { continue }` around the read, so a directory-only repoint reports no stories rather than failing loudly.

`domains/royal-road.md:10` already declares `stories-path: "*/royal-road/**"`, and `page-types/story-chapter-royal-road.md:6` already declares `files: stories:*/royal-road/*/chapters/*.md`. Both name the new layout. The service is the only thing in the instructions repository still naming the old one, at those two lines.

The story files also carry a `world:` property that the sync neither reads nor writes.

Whether the sync should follow the new layout is not settled here; it is the open question already filed as `royal-road-sync-reads-a-missing-directory`. This records only that the directory is not the whole of what moved.
