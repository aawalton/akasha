---
id: f694672b-ed60-50e8-a545-40e77cdf381c
page-type-slug: finding
title: "Governs composes a missing schema path"
domain-slug: domain/global
---

# Claim

`ops instructions governs` composes the schema path an agent is owed from the schema's `domain:` field, assuming the file is named for the domain. That holds for 27 of 28 schemas and fails for one: `tools/document/schemas/value.ts` declares `domain: "alan-values"`, so the command prints `tools/document/schemas/alan-values.ts`, which does not exist.

An agent following that line to read what it is owed finds nothing there.

# Evidence

`ops instructions governs --file-path domains/alan-values/faith.md` prints `tools/document/schemas/alan-values.ts — specifies what a document here must hold`. `ls` on that path returns no such file. The schema is `tools/document/schemas/value.ts`.

Neither side of the mismatch is itself wrong. The domain document is `domains/alan-values.md` and its slug is `alan-values`, so `value.ts` declares its domain correctly. The file is named for the kind, the domain for the folder the kind's documents sit in, and this is the only schema of the twenty-eight where those two names differ. I checked every schema's `domain:` field against its file name to establish that.

`read-the-schema` passes on those documents regardless, so this gates nothing and refuses nobody. It is a printed instruction that cannot be followed.

Two things follow from it rather than from the display alone. One concept carries two names — `value` in the schema file and in `page-types/value.md`, `alan-values` in the domain and in the folder — and a reader meeting either has nothing telling them the other exists. And a path derived by convention reads exactly like a path looked up, right up to the moment the convention breaks, which is why this stood until an agent tried to open it.
