---
id: 53d98f4a-9a33-58de-9e4e-00af58ca6031
slug: facets-from-row-drops-its-error
page-type-slug: finding
title: "Facets from row drops its error"
domain-slug: domain/pages-system
---

# Claim

`facetsFromRow` at `packages/shared/pages/access/src/file-relation.ts:233` destructures only `data` from its Supabase read and drops `error`, so a failed query and an empty `pages` table are indistinguishable: both answer `[]`. A relation target's facets then go missing silently rather than raising, and no caller can tell a real absence from a broken read.

# Evidence

Measured 2026-08-20 by running the function against a proxy Supabase client whose `pages` table answers empty, alongside the real client, with a bogus-row control proving the proxy was on the path.

`facetsFromRow(sb, "019db533-f381-7548-8695-31e6f53f865d")`, a live `temper-task` page, returned `["21","Thieves Guild Skill Line"]` against the real client and `[]` against the empty proxy. The seq and the title are lost; nothing raises and nothing is recorded.

The line reads `const { data } = await sb.from("pages").select("slug,seq,title").eq("id", id).limit(1)`. Every sibling reader in the same package binds `error` and throws on it — `file-shape.ts:126`, `page-type.ts:199`, `page-type.ts:225`, and all four resolvers in `page-type-config.ts`. `facetsFromRow` is the only one that does not.

Its sole caller is `facetsOfTarget` at `file-relation.ts:274`, reached exactly when the file ask found nothing and the value is a uuid — the fallback path, where a silent zero is least likely to be noticed.

This shape outlives the move to file backing: the same code would hide a permissions failure, a network fault or a dropped connection behind an answer that reads as "this target has no facets".
