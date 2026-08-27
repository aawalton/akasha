---
id: 300e7bdd-4caf-58ca-8c60-44d99b591aaf
page-type-slug: finding
title: "Every fact the swept pages comments carried is about the database half being retired"
domain-slug: domain/pages-system
---

# Claim

The prose comments the sweep took out of `packages/shared/pages` carried real facts, and every
one of them is about the database half this migration is retiring. Nothing there is owed a
Design entry. Checked 2026-08-20 against the current tree.

# Evidence

The sweep on this tree was `dce018037e`, "code-comment: take every comment outside the forms out
of packages/shared". Six removed comments were picked out as stating a durable fact rather than
a history. Where each sat now:

- `access/src/codegen-raw-page-row-schema.ts`, the content column dropped by the default read
  projection -- **file gone**. `PAGES_COLUMNS_NO_CONTENT` survives, used only under `pg/`.
- `access/src/_definition-tier-helpers.ts`, twice: universals materialized onto descendants by
  `_build_property_definitions`, and `page_type_create` writing `extendsPageTypeId` on every
  call -- **file gone**.
- `proc/src/_split_content_removals.ts`, a JsonPatch `remove` on a content key split out before
  `_apply_json_patch` -- stands.
- `proc/src/no-touch-keys.ts`, a no-touch key not advancing `updated_at` -- stands;
  `NO_TOUCH_KEYS` holds `lastViewedAt` and `loreIngestedAt`.
- `proc/src/page-create.ts`, back-relation writes deferred as `page.relation.mirror_pending` --
  stands, 16 references.

Two of the six sat on files that no longer exist. The three that stand are all in
`@shared/pages-proc`, reached only from `packages/shared/pages/access/src/pg/**`; the
file-backed reader and writer import none of it.

Neither of the two that look most worth keeping carries over. A no-touch key exists to stop
`updated_at` advancing, and on a file page `updated_at` is a constant for every page. Deferred
back-relation mirroring exists because a mirror is a second row write, and this domain's child
`page-type-backing-file` already states that both sides of such a relation go in one commit.

Three of the six were reported to me as still true with the file named; two of those files are
not there. Hence the list of where each sits rather than of what each said.
