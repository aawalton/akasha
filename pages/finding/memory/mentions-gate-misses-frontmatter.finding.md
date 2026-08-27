---
id: 0978c9cb-0662-599f-b8d5-1d7e503c085a
page-type-slug: finding
title: "Mentions gate misses frontmatter"
domain-slug: domain/global
---

# Claim

The `[mentions]` gate on `ops memory rm` sees a path written in prose and not a reference made in frontmatter. Removing the `athena-consistent-seats` initiative is refused for five findings naming its path and says nothing about the nine project documents declaring `initiative: seat`, which is the reference that would actually strand. Any instruction reading "once nothing names it" therefore binds something no gate refuses.

# Evidence

Raised by `claude-review-initiative-archivist-review-instructions` during a review-instructions reading of `domains/tasks/lead/review-initiative.md` on 2026-08-10, from a dry run made to test stage 5's last bullet rather than to read the code for it.

The filing seat re-ran that same removal with `--dry-run` and confirms it: `[mentions]` checked 1895 files and named five stranded mentions, every one a finding writing the literal path, and `[links]` passed at 0 of 1894. No line of the output concerns the nine projects declaring the initiative by name.

Not measured: whether other frontmatter keys carry the same blind spot, and whether a removal has already stranded rows this way.
