---
id: 9cff5321-781a-55e8-a0c3-55b26940c808
slug: large-prose-ungated
page-type-slug: finding
title: "Every prose gate skips a large file, so prose held as a large property is read by nothing for its sense"
domain-slug: domain/page-storage-attachment
---

# Claim

Every prose gate skips a large file, so prose held as a large property is the only
instruction in the corpus nothing reads for the sense of its words.

# Evidence

`domains/page-type-backing-file-large.md` states it outright: "No gate that reads a page
as prose reaches a large file." Both `tools/gates/token-ceiling.ts` and
`tools/gates/words-read.ts` skip on `isLargeFile`, which matches `.large.<ext>` whatever
the extension is.

That was written when `large:` admitted one value, `sql`, and one property used it —
`migration-content`, whose body no reader takes as prose. It now admits `md` as well.

A persona's `conduct` and `keepContract` are due to become large properties. They are
prose that binds how she behaves, and under the rule as it stands nothing would read them
for a word used in a sense its domain does not carry. The ten prose properties measure
232,159 characters of `portrait` and 143,802 of `conduct` across 40 personas, none of
them today reachable by `words-read`.

The two skips answer different questions. `token-ceiling` asks how long a file is, and a
large file is exempt by definition. `words-read` asks what a word means, which a file's
length says nothing about.
