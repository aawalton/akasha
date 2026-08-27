---
id: c1724f1b-b324-501d-814f-a1522cc6a6aa
slug: checks-written-against-a-small-tree
page-type-slug: finding
title: "akasha's checks were written against a 1,449-file repository and meet a 90,713-file one, and file-length is where that showed first"
domain-slug: repo/akasha-repo
---

# Claim

The tree akasha is to hold is 90,713 tracked files and 1.14 GB against its present 1,449 files and 4.4 MB — 62-fold by count and 250-fold by byte. `file-length` is the case that showed it: akasha's largest authored file is 9,985 bytes against a 15,000-byte ceiling, and 8,544 incoming files would be refused. Almost all of them are ingested prose rather than authored work.

# Evidence

Measured 2026-08 by running the check itself over every tracked file in the five incoming repositories, judged as if it sat in akasha at the same relative path.

Tracked files: code 7,785, instructions 13,601, memory 22,651, stories 42,583, books 2,644, akasha 1,449.

Of 9,667 files over the ceiling, `isGeneratedFile` already exempted 1,123 — every `.jsonl` rows file and `.attachment.txt`. Of the 8,544 left, 8,426 are page bodies under seven page types, six of them ingested prose: `story-chapter-royal-road` 7,441, `story-chapter-wandering-inn` 814, `story-chapter-played` 99, `book-chapter` 58, `story-chapter-written` 8, `story-turn` 2. The seventh is `initiative` at 4 files, which is authored, and there the ceiling is working rather than failing. The other 118 are not pages: 71 binary art, and 47 text files that are real case-by-case work.

The exemptions ask the pages rather than carrying a list. `carriesBytes` already read the file kind's `binary:` key; `.dds` and `.jpg` had no file-kind page at all, so 249 tracked textures could not have been written into akasha at any size. An `unbounded` page-type property, declared at `page-property-definition/page-type-unbounded` and read by `page/page-type/unsplittable.ts`, marks the six prose types. A `dirty` folder is exempt too, `generated/` being the precedent for a folder name carrying meaning in this check.

Refusals fell from 8,544 to 34, and a seventh unbounded type would need no code.
