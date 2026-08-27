---
id: 6280a6c6-f9ee-593a-b955-0bca22253600
slug: slug-uniqueness-is-exact-match
page-type-slug: finding
title: "Slug uniqueness is exact match"
domain-slug: page-type/domain
---

# Claim

`domain-slug-unique` compares slugs by exact string, so a singular or plural twin of a standing domain passes it.

# Evidence

On 2026-08-05 I composed `domains/test.md` carrying `domain-slug: test`, while `file-kinds/tests.md` has carried `domain-slug: tests` since 2026-08-04. The gate reported `[domain-slug-unique] pass — \`test\` against 193 domain(s) declared across 194 surfaces on the perimeter`.

The write was refused, but by `read-what-governs` naming `domains/code.md` as unread — a gate about my reading, not about the name. Had that surface been read first, both slugs would now stand, each with its own definition and its own `# Tasks` section, and the second would have been the authority for `review-tests`.

What made it reachable is that I searched `domains/` for an existing domain, when a `domain-slug:` is declared across `domains/`, `roles/`, `tasks/`, `personas/`, `folders/` and `file-kinds/` alike. Alan named the existing file from memory. Nothing I ran would have found it, and the gate that exists to answer exactly this question answered it wrongly.

Not measured, and this is the weakness of the claim: no twin stands on the perimeter today. `dirty/knowledge/gates.md` declares `gates` beside `domains/gate.md`, but `dirty/` is off the perimeter and the gate does not count it, so that pair is not an instance. The hazard is reasoned from what the gate compares rather than observed in the corpus. What would settle it is a pass over the 193 live slugs for pairs differing only by inflection.
