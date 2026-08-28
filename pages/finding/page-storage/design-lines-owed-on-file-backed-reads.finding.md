---
id: 4e238ad9-64b4-5449-b698-f996cf3f4aa5
slug: design-lines-owed-on-file-backed-reads
page-type-slug: finding
title: "Four facts about file-backed reads and writes are settled in code and recorded in no instruction"
domain-slug: domain/page-storage
---

# Claim

Four facts about file-backed reads and writes are settled in code and recorded in no
instruction. Each was carried in a prose comment until the comment sweep, or was measured
tonight while repairing a live defect. Each is a Design line this domain could hold.

# Evidence

Proposed, each with the kind it would be:

Departure -- "A file-backed page whose frontmatter states no id takes one derived from the
path of the file it stands in."

Constraint -- "A narrow on a value a file's frontmatter does not state is tested by the
reader rather than by the query that fetched the rows."

"A read narrowed by a property a file cannot carry answers with the repo's pages."

"A key a file states is spelled in kebab, and a property document declares it the same way."

The first two came out of the write seam that landed a write and then threw. 38,994 of 57,525
readable pages state no `id:`, and a narrow on `id` was pushed down to a service that tests
frontmatter only, so the set was empty before the in-process filter -- which always tested the
derived id correctly -- ever saw it. Fixed at `file-narrow.ts:84,92`.

The third is the settled behaviour of the whole read path after `f3bbae9ab9`, and a test
asserting it is required to name the invariant it tests.

The fourth was measured while repairing `game`: a camelCase property document made
`getPages(select: ["externalId"])` return null on 8 of 8 pages, by two independent routes --
`keysWanted` kebabizes a select key, and `camelizeKey` mangles an already-camelCase key into
`externalid`.

There is a standing tension worth naming beside the first line. This domain already states as
Intent "A file-backed page's id is in its frontmatter", and as Design "A file-backed page's
path can change without the page changing." Deriving an id from the path contradicts the
second: a `git mv` silently re-identifies the page. So the derived id is a departure that
holds today, not the end state.
