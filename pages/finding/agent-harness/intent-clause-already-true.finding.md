---
id: 4a1c1a6f-2826-5feb-9f35-62a9e5815678
page-type-slug: finding
title: "Intent clause already true"
domain-slug: domain/agent-harness
---

# Claim

The Intent entry "The instructions repository reaches the database directly, and no harness path calls into the code repository for a row" states something already true, where `domains/domain-intent.md` holds that an Intent section carries only what is not yet true. The same claim is bound a second time by `domains/repos/instructions-repo.md`'s Reach Directly.

# Evidence

Raised by the seat that read `domains/agent-harness.md` on 2026-08-12 under `review-instructions`, and relayed here rather than re-derived: the count of 74 files here using `Bun.SQL`, and the reading of Reach Directly, are that seat's measurements, and I checked neither.

Eleven sites cite `domains/agent-harness.md` by name for this clause, by that seat's count: eight TypeScript headers, `oauth-schemas.ts`, `supervisor-resume-record.ts`, and stage 25 of `domains/tasks/agent-harness/port-supervisor-file.md`. Anything moving the clause has to repoint all eleven in the same change.

That seat cut the clause and restored it (`fa6bf30`) on two grounds: the section is one `domains/domain.md` reserves to Alan, and the citations would have been left pointing at a clause that had moved.

Nothing here measures whether the second half of the clause — that no harness path calls into the code repository for a row — is as true as the first.
