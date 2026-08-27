---
id: 8d24dfe3-8d78-5c42-8d23-9cd8a41876a5
page-type-slug: finding
title: "The irreversible inventory omits the hard deletes"
domain-slug: domain/ops-cli
---

# Claim

Four verbs out of the whole `ops` surface declare themselves irreversible, and the two whose entire purpose is permanent destruction are not among them, so the inventory meant to list what cannot be undone omits them.

# Evidence

Measured 2026-08-15, running `review-command` on the `property-definition` and `page-type` namespaces.

`tools/commands/irreversible/list.ts` builds its answer from `module.help?.irreversible === "irreversible"`, read off each verb's help object. Nothing else feeds it.

Four files in the tree set that key: `tools/commands/seat/reap.ts`, `tools/commands/ali/fold.ts`, `tools/commands/ask-alan.ts`, `tools/commands/launcher/realign.ts`.

`tools/commands/page-type/hard-delete.ts` does not. Its summary reads "PERMANENTLY delete a page-type row (irreversible)" and its description reads "Irreversible — use `ops page-type delete` unless you are certain". Both are prose. The key is absent, so the verb does not appear in the inventory and the help-before-execute gate does not fire on it.

`tools/commands/property-definition/hard-delete.ts` is the same: the word in prose, the key absent.

What `page-type hard-delete` actually does is wider than its own help says. `page_type_hard_delete.sql` deletes every property-definition page pointing at the type, deletes the type row, and drops the per-slug sequence. It never deletes the type's data rows, so every page of that type survives holding a `page_type_id` that points at nothing. The help says only "a page-type row and its property-definition children".

That verb also reports success for an id that does not exist. The function returns NULL on a missing row, `hardDeletePageType` in the code repo is typed `Promise<void>` and discards it, and the verb prints `<id>	hard-deleted` and exits 0. Its siblings `delete`, `undelete` and `update` all check for null and exit 2.

`page-types/ops-command.md` states as Design that each command declares itself irreversible. Four declarations is what that reads like when almost nothing participates.

Not measured: how many verbs across the whole surface destroy something without recovery. Only the two hard-deletes and the four declaring verbs were read.
