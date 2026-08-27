---
id: add12fd2-fcfa-5c69-aeef-ae4996b8e968
slug: leg-drop-guard-cannot-see-a-file-backed-page-type
page-type-slug: finding
title: "The leg-drop guard cannot see a page type that moved to files"
domain-slug: domain/global
---

# Claim

The push notifier's per-leg guard drops a leg only where a page type is missing, and a page type that moved to files is present — it is its rows that went. So every page-keyed leg resolves an id, registers, and writes a subscription row no event can reach. A guard keyed on the type's absence cannot see the case that happened.

# Evidence

Read 2026-08-20 at HEAD of the code repo. I did not query the database and started nothing, so this is a reading of source rather than a measurement.

Commit `564ffcc91b` states the intent in its subject, "a missing page type costs its own leg, not the worker": `getPageTypeIdsBySlugs` raises `PageTypesMissing` where a slug names no page type, so a caller can drop one subscription and still die on an unreadable corpus.

`apns-push-notifier.worker.ts:60-65` resolves the notification and question ids through `pageTypeIdFor`; the helper at `:139-145` returns null only on `PageTypesMissing` and rethrows anything else; `:112-133` spreads each leg in only where its id came back non-null.

`pages/access/src/page-type-ids.ts:34-57` composes a page query over the `page-type` page type and throws only for a slug no FILE answers. `page-types/notification.md:4` and `page-types/question.md:4` both stand, so neither slug is missing, no leg is dropped, and all three page-keyed legs register.

The premise is inverted for this class. A page type that moved to files is present and readable, and it is its rows that are gone. The guard asks the one question whose answer cannot tell the two apart.

`apns-push-notifier.notification-created` is the leg this strands that no other finding names; the question legs are covered by `question-push-legs-are-declared-and-cannot-fire`. Three further manifests carry the same shape and would register dead page legs at their next boot: `story-length` on `story-chapter`, `temper-completion.indexer` on three temper types, `temper-task.reactor` on three more.

Not measured: whether any of these workers boots at all today.
