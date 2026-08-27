---
id: a824595f-011b-5b6b-94de-d904e8feafd5
page-type-slug: finding
title: "Unknown projection key silent"
domain-slug: domain/pages-system
---

# Claim

Without `--full`, an unknown `--properties` name on `ops page list` is dropped in silence:
exit 0, no advisory, and the key is absent from the row's `omitted` list as well as from
`properties`. A misspelled or wrong-for-this-type key is therefore indistinguishable from a
field the row genuinely does not set — the exact confusion `omitted` exists to prevent, in
the one state it does not cover. `--full` refuses the same input loudly, so the surface
disagrees with itself on whether an unknown key is an error.

# Evidence

Run live on 2026-08-07 against the `story-chapter` type.

An unknown name beside a real one, on `--json`. `nosuchfield` appears nowhere in the output
— not under `properties`, not in `omitted`, which lists 21 real keys:

    $ ops page list --type story-chapter --properties title,nosuchfield --limit 1 --json
    {"pages":[{"id":"019fdc31-936b-…","properties":{"title":"Chapter: 735 - Defense of
    Bandfast (4)"},"omitted":["chapterNumber","createdAt",…,"userId"]}],…}
    exit=0

An entirely unknown projection returns an empty property bag, still exit 0, still no mention
of the key that was asked for:

    $ ops page list --type story-chapter --properties nosuchfield --limit 1 --json
    {"pages":[{"id":"019fdc31-936b-…","properties":{},"omitted":[…]}],…}
    exit=0

The same input under `--full` is refused, naming the key and listing all 62 valid ones:

    $ ops page list --type story-chapter --full --properties title,nosuchfield --limit 1
    unknown property "nosuchfield" — not a system column or property definition of this
    page type (valid: id, seq, title, icon, slug, userId, …)
    exit=1

The TSV path is not affected in the same way: it emits a trailing tab, so
`--properties title,nosuchfield` still yields 2 awk fields, matching the control
`--properties title,status`. The empty cell is still indistinguishable from an unset value,
but column alignment holds.

`mapPageResult` at `packages/shared/pages/cli/src/lib/pages.ts:305-327` builds the projection
as `Object.fromEntries(propertyFilter.map((k) => [k, propertiesMap[k]]))`, so an unknown key
maps to `undefined` and is dropped by `JSON.stringify`. `computeOmittedKeys` derives
`omitted` from keys present on the row, so a key that is not on the row cannot appear there.
Nothing between the flag and the output compares the requested names against the page type
unless `resolveFullFields` is engaged by `--full`.
