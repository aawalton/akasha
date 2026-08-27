---
id: 8b5cab59-a018-508a-a778-8d0cd5f2a44d
page-type-slug: finding
title: "Watcher enrolment page type lines await Alan"
domain-slug: page-type/temper-watcher-enrolment
---

# Claim

The page type document for the watcher's enrolment landed carrying a Definition line drafted by a delegate, and it states no Design and no Intent. Those lines are Alan's on every changed line, so the document stands with a placeholder where his judgement belongs. The slug is also not the one the rows use, and that was forced rather than chosen.

# Evidence

Measured 2026-08-20, migrating the `temper-watcher` page type off the database pages system.

`bun tools/write.ts --file-path page-types/temper-watcher.md --dry-run` refused with `[domain-slug-unique] fail`: "`slug: temper-watcher` is already declared by domains/services/temper-watcher.md. One slug is one domain." That document is the systemd unit, `page-type-slug: workstation-service`, and it is a live service under repair by another delegate. Every other gate passed. The page type is therefore the side that had to move, and it landed as `temper-watcher-enrolment` at commit `e3fbeadafaa1040917986f9fca7244099c401d0f`, carrying the row's own id `019e6eb1-1624-73bb-833e-e833f474494d`.

The Definition line as it stands reads: **Temper watcher enrolment** — one account's authorisation for the game client that uploads on its behalf.

Two candidate Design lines were drafted and not landed, both stating invariants a reader would otherwise get wrong:

- An enrolment's credential is never in its frontmatter.
- An enrolment stands for one account, and an account has at most one.

One candidate Intent line, which does not hold today:

- An enrolment's credential is verified without decrypting it.

The name itself is a judgement rather than a measurement. The three live rows hold an account pointer, a bearer token with three pieces of token metadata, and the outcome of the client's last run. "Enrolment" was chosen to name the account-to-client authorisation; "registration" and "watcher token" were the alternatives considered and rejected as naming the artifact rather than the relationship.

Not measured: whether Alan wants this concept to be a page type at all, as against a property on `temper-account`, which is where the same six keys stood before `setup-temper-watcher-page-type.script.ts` moved them out.
