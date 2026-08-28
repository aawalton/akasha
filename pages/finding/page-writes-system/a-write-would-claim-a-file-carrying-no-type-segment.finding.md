---
id: 01a046d1-9ec4-7f78-a979-d85165ba3344
page-type-slug: finding
slug: a-write-would-claim-a-file-carrying-no-type-segment
title: "A write would claim a file with no type segment in its name, held off only by every glob happening to demand one"
domain-slug: domain/page-writes-system
---

# Claim

`stands` at `tools/lib/page-write-where.ts:56-59` accepts a candidate file whose name is literally `<name>.md`, with no `.<slug>.` type segment. Nothing in that function checks the type. It is unreachable today only because the candidate list is built by each page type's own glob, and every glob in the repository demands a `.<slug>.md` ending — so a bare `<name>.md` is never offered to it.

The guard is a coincidence of the data rather than a property of the code. One page type stating a glob that does not constrain the suffix would make a write claim a file of the wrong type, or of no type, and write a page into it.

# Evidence

The function, whole:

    const stands = (one: string): boolean => {
      const last = one.split("/").at(-1) ?? one
      return last === `${name}.md` || slugOf(last) === name
    }

The first disjunct is the exposed one. `slugOf(last)` in the second parses the stem out of a typed filename; `last === `${name}.md`` asks only whether the file is called what the write is called.

What holds it off is at `page-write-where.ts:65`, where `filed` comes from `scanIn(root, placesIn(type, repo), repo)` — the candidates are whatever that page type's glob matches. Across all 393 page-type pages in the repository the `files:` values tally 324 plain, 67 `none`, and 2 directory-constrained; every one of the 326 that names files ends `*.<slug>.md`. Nothing bare reaches `stands`.

So the branch is not merely unreached — it is dead for its apparent purpose. The only way `last === `${name}.md`` can be true today is if the caller's `name` argument itself ends in `.<slug>`, as in `whereFor(roots, "domain", "file-structure.domain")`. `slugOf` is `stemOf` at `page/name/name.ts:20-24`, which cuts at the first dot, so in exactly that case the second disjunct cannot also match. The branch reads like a guard for untyped filenames and can only ever fire on a malformed argument.

Place-constrained globs already exist, which is what makes this worth filing rather than noting. Two page types state one:

    files: akasha:agent/seat/**/*.seat.md
    files: akasha:agent/subagent/**/*.subagent.md

A correction to how close that puts it: **neither of these two makes the hazard live.** Both still end `.seat.md` and `.subagent.md`, so both still demand a type segment. They constrain the directory, not the suffix, and those are different axes. The hazard needs a glob that relaxes the *suffix*, such as `agent/seat/**/*.md`.

What they do establish is that the tempting edit is available. A place-constrained glob is exactly the case where the suffix looks redundant — everything under `agent/seat/` is a seat, so why say `.seat.md` — and dropping it would look like a simplification while making `stands` claim any `.md` file in that tree whose stem matches the write.

The code already distinguishes the two shapes and has a name for it, at `page/page-types.ts:47`:

    const LOCATION_FREE = /^\*\*\/\*\.([a-z0-9-]+)\.md$/

Both prefixed globs above fail this regex, so the system already knows some globs are not location-free and handles them. What nothing does is require that a glob constrain the suffix, which is the property `stands` is silently relying on.

Not established: what a write claiming the wrong file would actually do to it. `whereFor` returns a `Where`, and the damage depends on the caller — overwriting, merging frontmatter, or filing a duplicate are all possible and none has been traced through.

Not established: whether the fix belongs in `stands` or in a constraint on `files:`. Making `stands` check the type segment is local and cheap; requiring every glob to constrain the suffix is the stronger statement but forecloses a glob shape nobody has yet asked for.

Not established: whether any repository outside akasha states a glob of the loose shape. This was checked across `pages/page-type/*.md` in akasha only.
