---
id: 11a31b0c-11a1-519e-8f58-c897c35b6ef4
slug: resolver-drops-every-person
page-type-slug: finding
title: "The recipient resolver builds no person handlers, because it reads identity-slug from a row"
domain-slug: domain/agent-harness
---

# Claim

The recipient resolver drops every person as malformed, so it builds no person handlers at all, because it reads `identity-slug` from a database row rather than from the person document that carries it.

# Evidence

`recipient-resolver.service` is active on the workstation, restarted 2026-08-18 20:49. Its log carries, on every pass, one refusal per person:

```
[person-handler] skipping malformed person row (slug=alan): [{"code":"invalid_type","path":["identity-slug"],"message":"Invalid input: expected string, received undefined"}]
```

The same line lands for `jenny` and for `ki`. Not one person row survives the parse.

`tools/lib/person-handler-slugs.ts` reads the rows through `postgresStore` against page type `person`, and its schema requires `identity-slug` to be a non-empty string. The person documents do carry it — `domains/persons/alan.md` states `identity-slug: amy` in its frontmatter — so the value exists where a person is defined and is absent only in the projected row the resolver consults.

The consequence is the stranding already recorded on project 19419: Ki's and Jenny's SMS handlers never assemble. That was read as the service being down. The service is up; it is reading a copy that lost a field.

This is the same shape as the two file-to-row projections removed on 19419 the same day, `ops seat project-seat` and the corpus round trip: a database copy of something a file already states, drifting silently, with nothing reporting the drift.
