---
id: 53bc6eeb-ec9b-56e1-a8e5-d9e221c95353
page-type-slug: finding
title: "Sixteen namespaces have no subject domain"
domain-slug: domain/ops-cli
---

# Claim

Sixteen reviewed namespaces have no subject domain to name as a parent, so what stays true of their subject with every verb deleted has nowhere to sit but the namespace document, where it does not belong.

# Evidence

`domains/tasks/ops/review-command.md` step 2 says to hold off the namespace anything still true with every verb deleted, and to let the namespace name the subject domain as a parent. For these sixteen no such domain stands, so each namespace document landed with two parents rather than three.

Named by the delegate that hit each, with the name it would give: reading books (`books`, distinct from the standing `books-repo` which is Alan's writing), `notion`, `workspace-package`, `enforcement`, `feature-request`, `formal-methods` (FizzBee specs), `imessage`, `address-book`, `image-library`, `media`, `watching` (shows and films), `place` (geocoding and routes), `google-drive`, `test-fixture`, `local-executor`, `page-realtime`, `story`, `voice-measurement`.

Three near-misses are worse than an absence, because a standing domain was named that does not fit. `ops-schema` names `database`, because `domains/retired/schema.md` already holds `schema` in an unrelated sense — a page type and its body shape. `ops-worker` names `daemon`, because `domains/roles/worker.md` holds `worker` as a seat role; code, filenames and the namespace all say worker and the domain layer says daemon. `ops-contacts` names `macbook`, which is the host rather than the subject.

Measured 2026-08-15 across the review sweep. Each delegate searched `domain-slug:` across `domains/`, `page-types/` and `domains/folders/` before reporting an absence.
