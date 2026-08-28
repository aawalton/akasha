---
id: b8a385b5-63fd-5296-aa53-e809182d6c06
slug: three-keys-are-settled-by-the-reader
page-type-slug: finding
title: "Three universal keys are stamped by the reader, refused when writing and answered silently when reading"
domain-slug: domain/page-storage
---

# Claim

Three keys every page declares are stamped by the reader rather than read from the file, and a
narrow on them is refused when writing and answered silently when reading. Measured 2026-08-20
by running both paths.

# Evidence

`seq`, `createdAt` and `updatedAt` are in `SETTLED_BY_ROW` at `file-rows.ts:26`, so
`buildRawPageRows` skips a stated value and stamps `CONSTANT_SEQ` (0) and `CONSTANT_INSTANT`
(`1970-01-01T00:00:00.000Z`).

**2,101 files state a real `seq:`** -- `music-song` 1,656, `error` 339, `named-event` 40,
`connection-activity` 25, `session-activity` 15, `artist` 14, `migration` 8, `issue` 2,
`project` 2. A project document under `memory:projects/` states `seq: 19434`. Run: `where seq = 19434` gives 0
rows; `where seq = 0` gives 2 of 2. `properties/page-seq.md` declares `type: number` and no
`computed:` key, so the declaration says a page states it and the reader says it cannot.

**No file states `created-at` or `updated-at`** -- 0 of 57,545 for each -- and both property
documents carry `computed: true`.

A refusal exists but only when writing: `refuseSyntheticNarrow`, declared at `file-write.ts:206`
and reached from `locate` at `:247`. On the read path, `where createdAt = "1970-01-01T00:00:00.000Z"` returned 0 rows
silently. So an entry saying such a read is refused would be Intent today, not Design.

The two halves fail in opposite directions and it matters which. `narrowing` pushes a **string**
`eq` down to the query service, which tests frontmatter that states no such key, so the answer
is **none**. A **number** `eq` is not pushed down and is tested in-process against the constant,
so `where seq = 0` answers **all**.

The write-side refusal covers **four** keys, not three: `seq`, `createdAt`, `updatedAt` and
`userId`. Run against each, all four refuse. It unwraps one level of `or` and then does
`if ("or" in one) continue`, so `[{or:[{or:[{key:"seq"}]}]}]` passes unrefused, measured.
