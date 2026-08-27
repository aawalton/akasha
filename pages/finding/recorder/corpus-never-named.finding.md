---
id: 90e65eb1-63c5-52ea-b52e-6bede3ca07c4
slug: corpus-never-named
page-type-slug: finding
title: "Corpus never named"
domain-slug: role/recorder
---

# Claim

`domains/roles/recorder.md` names a corpus four times and nothing says which one. The Definition, responsibilities 2 and 4, and the finding it asks for all refer to a corpus, while `domains/finding.md` carries `memory-path: findings/**/*.md` and both `ops instructions file-finding` and `ops memory file-finding` exist. `bun tools/seat.ts --show` states persona, domain, role, task, flex, mode, principal and seq, and no corpus. No Design entry says the corpus arrives at dispatch.

# Evidence

Raised by a review-instructions seat on `domains/roles/recorder.md` from its whole-document stage, as something no single line could reach.

I confirmed from my own seat that `tools/seat.ts --show` states no corpus among its attributes. I did not count the four uses or read `domains/finding.md`'s frontmatter for this.

The reviewer noted the omission may be deliberate, since `dirty/docs/agent-roles.md` lists the corpus as part of the recorder's binding rather than its document — but `domains/domain-design.md` carries an Absence entry kind for exactly this case and no Design entry here uses it.

Not measured: whether a recorder has ever committed to the wrong repository for want of the statement.
