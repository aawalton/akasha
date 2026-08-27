---
id: ec57301c-2b9d-5e91-a945-92a14b01ecff
page-type-slug: finding
title: "Four config blobs called one shape"
domain-slug: domain/pages-system
---

# Claim

A header comment describes all four page-type config keys as one shape. It is true of two of them.
The other two carry their own headers saying the opposite, and the false framing is the reasoning
that left them unguarded.

# Evidence

Read 2026-08-07 against `~/code` at `origin/main` `383bf60d35`.

`packages/shared/pages/core/src/schema/listing-config.ts:6-8` describes its own key as "One of the
four flat extensible page-type config keys (detailConfig / sequence / listingConfig / mediaConfig),
each shaped like the view entity's `ViewDataJSON` and Zod-parsed at the page-type boundary". The last
clause holds of all four. The one before it holds of two: `listingConfig` is a `ViewDataJSON` subset
and `detailConfig` its page-type analog, both extensible objects of optional presentation keys.

`sequence` is `.strict()` over a relation id, a rank id and a direction — the read-time ordering the
access layer derives neighbours from (`sequence-config.ts:20-29`). `mediaConfig` is `.strict()` and
keyed by medium over a renderer and a variant axis (`media-config.ts:60-66`). Each carries its own
header saying `.strict()` is deliberate because the blob is ours end to end, which is the opposite of
the extensibility the sentence attributes to all four.

`:10-11` of the same header compounds it: "the four-key surface is explicitly 'built for expansion',
so an unknown key must survive the round-trip rather than fail the parse". An unknown key under
`sequence` or `mediaConfig` fails the parse and takes the page-type's `propertyDefinitions` down with
it, which is the separate finding filed beside this one.

Its round-trip premise is also unsupported. No read-parse-write cycle over either blob exists in the
tree: all fourteen non-test `parsePageTypeData` call sites are reads, `parseDetailConfig` and
`parseListingConfig` have one read call site each, and the single writer
(`infra/inference/src/setup-image-page-type-lib.ts:212`) writes module constants without parsing.

This is the only place in the tree the four are described as one kind, and it had already propagated
onto the ingestion perimeter before being repaired there.
