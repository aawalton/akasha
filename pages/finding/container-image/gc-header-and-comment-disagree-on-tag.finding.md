---
id: 44ea86b5-00df-562b-a3f9-38914c230a9a
page-type-slug: finding
title: "Gc header and comment disagree on tag"
domain-slug: domain/container-image
---

# Claim

The registry garbage collector's own docblock calls what it retains SHA tags, while a comment inside the same file treats those tags as inputs hashes, so a reader takes the retention loop to be keyed on the commit an image was built from when it is keyed on what went into the build.

# Evidence

`packages/infra/k8s/registry/synth-gc.ts` opens by describing itself as "the per-repo SHA-tag retention loop". The tag filter inside the emitted script admits `^([a-z0-9-]+-)?[0-9a-f]{7,12}$`, which a commit hash and an inputs hash both satisfy. Lower in the same file, the comment above the digest dedupe reads that "reproducible builds can produce byte-identical manifests from distinct inputsHash tags", which is only true of a hash over build inputs and not of one over a commit.

The two readings differ in what a reader expects of the retained set. Keyed on the commit, the newest tags per family are the newest commits; keyed on the inputs hash, two commits that changed nothing the build reads share one tag and one retention slot, so a family's retained window covers more commits than its budget suggests.

Not measured: which of the two the tags in the live registry actually are; whether any producer writes a commit-derived tag as well; and whether the retention budget was chosen against either reading. Nothing was read outside this file.
