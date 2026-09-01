---
id: 2546a33a-8872-5e48-8be8-52b5964a1c7e
page-type-slug: old-ops-command
title: "Ops page icon-search-index generate"
slug: ops-page-icon-search-index-generate
domain-parent-slug: domain/ops-page-icon-search-index
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/page/icon-search-index/generate.ts
path: page icon-search-index generate
irreversible: false
---

# Definition

- **Ops page icon-search-index generate** — the icon index the pages UI searches, emitted from the lucide release it names.

# Design

The files this emits are tracked in akasha, and the checkout it writes them into is named rather than assumed.

Every file this emits names this invocation in its own header.

The index is emitted in shards, none of them as long as akasha will hold a file, behind one barrel that is the only module anything imports.

The lucide release this reads is named in the command rather than read from the checkout it writes into.

A run reaches GitHub, and there is no offline route to the same answer.

# Help

The pages UI offers every lucide icon by name, and searching them needs more than the names: the aliases an icon also answers to, the keywords its metadata carries, and the categories it sits in. Only lucide's own repository holds those, one JSON file per icon, and they are not shipped in the package the app installs. So the index is built by reading a whole lucide release.

A run fetches the named release from GitHub, unpacks it into a directory of its own under `/var/tmp`, reads every icon's metadata, and writes the index into the checkout it was pointed at. The scratch directory goes whether the run finished or failed.

Whole, the index is more than twenty times the length akasha will hold a file at, so it is not written whole. The entries and the PascalCase map are each packed into shards under `shared/pages-core/src/generated/icon-search-index/`, filled a whole line at a time up to a ceiling well short of akasha's, and `icon-search-index.generated.ts` beside that directory imports every shard and puts the index back together. Nothing outside that directory imports a shard, so the module the app reads is the same module it always was. A run empties the shard directory before writing, so a release with fewer icons than the last one leaves no orphan behind, and a run refuses to write anything at all if any file it rendered came out at or past the ceiling.

The download is the only wait, and it is given a ceiling. Past that the run fails saying the release was never fetched, rather than hanging with nothing to show.

The emitted files are tracked where they land, so a run shows up as a change to akasha's working tree, to be read and committed there like any other. Two runs against one release emit the same bytes, so a second run against an unchanged version leaves nothing behind.

The version moves only when somebody changes it here. Nothing notices that lucide has published a newer one, so the index is as old as that version until somebody changes it.
