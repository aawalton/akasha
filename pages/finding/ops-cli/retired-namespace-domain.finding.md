---
page-type-slug: finding
id: fc492922-4871-5ecd-88a1-0071adc23104
title: "A domain still describes the ops commands retired out from under it"
domain-slug: domain/ops-cli
---

# Claim

The domain `ops-property-definition` describes four `ops` commands retired in `0f0d95124` with their command documents and tests. Its `instructions-path` glob matches no file, `ops property-definition` is no longer a command, and nothing else in the repository names the domain. Its Design still states these commands reach property-definition rows in the database, while property definitions now stand as files. A glob matching nothing is legal, so nothing reports the empty area.

# Evidence

`tools/commands/property-definition/` does not exist. `ops property-definition --help` exits 1 onto the general usage list rather than onto a namespace. `git log` against that path gives one commit, `0f0d95124`, whose subject retires the definition-tier ops commands "and all four property-definition commands, with their command documents and on-demand tests"; the domain document was not part of that commit.

The document still carries `instructions-path: tools/commands/property-definition/*.ts`, and three Design lines about property-definition rows in the database, an elevated Postgres function and a service-role client.

Searching the instructions repository for the slug returns one line, the document's own `slug:`. Nothing names it under `domain-parents-slugs` or `required-reading-slugs`.

NOT MEASURED. Whether the domain should go or be rewritten onto some remaining area is not settled here: its Definition and Design lines are Alan's to change, and a domain stays until it no longer fits the structure, which is a judgment rather than a count. Nothing here checks whether the retired behaviour moved somewhere that now wants describing, nor whether other domains carry globs that match no file — this one was found while checking a different matter, not by a sweep.
