---
id: 01a045bf-7cd3-7597-a70e-125199440789
page-type-slug: initiative
slug: astra-page-index
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- A page index file is named for one page.
- Each line of a page index file is one page location.
- Every file in the page index is an index file.
- The page index is made right by reconciling it, never by writing it again from nothing.
- No page index update drops what another wrote.
- No reader sees a half-written page index file.
- A reader trusts the page index without checking it.
- The page index is checked against the pages every day.

# Notes

**The page index is a derived cache, never authoritative.** It can always be rebuilt from the pages, so it may be eventually consistent, and a torn write is a fault to detect and repair rather than one to prevent. A miss must never render as an absence.

**SQLite is refused deliberately.** Its decisive advantage was transactions, which a derived cache does not need; what is left is opacity to ripgrep and a schema to migrate, against File First and Search First.

**The index is one file per handle with a one-line body** — not sha1 buckets, and not the destination in the filename. Measured on btrfs: 857 bytes for a one-line file against 1,007 for an empty one with a long name, because a filename is held twice and an inline body once.

**Directories name the index; the filename names the page.** A page type is an attribute of the thing indexed rather than a dimension of the index, so it belongs in the filename.

**The index validity strategy.** The index updates as part of every change running through the ops tools, and no change runs outside them. One command checks an index without changing it, another rebuilds one, the check runs daily as an audit, and validity is never checked when the index is queried.

- The page index stores the filename suffix rather than the frontmatter type, at `page/index/identity/identity.ts:148`. Refreshing it will not make it agree with the new rule; what it writes has to change.
- `vocabulary` and `rows-homes` are cached under a mark taken over the page shape alone, while both read the registry, which reads the index. Only `registry` carries an index stamp.
