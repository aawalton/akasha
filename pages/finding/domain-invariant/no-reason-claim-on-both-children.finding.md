---
id: e7484ce0-58d5-538b-9a57-d5f702dadf43
page-type-slug: finding
title: "No reason claim stands on both children"
domain-slug: domain/domain-invariant
---

# Claim

One claim stands on both children of `domain-invariant` and on neither the parent. `pages/domain/domain-design.md` reads `A Design entry carries no reason for itself.` `pages/domain/domain-intent.md` reads `Each intent entry names a state the domain should be in, never an act to take or a reason for it.` `pages/domain/domain-invariant.md` carries a Definition and nothing else. `pages/domain/context-push.md` Dilution puts a line on the narrowest document it serves.

# Evidence

I read all three documents whole on 2026-08-22.

`pages/domain/domain-invariant.md` reads `**Domain invariant** — what must always be true of a domain.` and carries a `# Definition` section alone, 12 lines including its frontmatter.

`pages/domain/domain-design.md` carries `domain-parent-slug: domain-invariant` and reads `**Domain design** — a domain invariant that holds now.` Its `# Design` section closes on `A Design entry carries no reason for itself.`

`pages/domain/domain-intent.md` carries `domain-parent-slug: domain-invariant` and reads `**Domain intent** — a domain invariant that does not hold yet.` Its `# Design` section is one line, ending `never an act to take or a reason for it.`

So the two children of `domain-invariant` are its whole family, and each states on its own that an entry of its kind carries no reason.

Raised by the review-instructions reading of `pages/domain/domain-intent.md`, finished 2026-08-22, at its closing line, which named the two and left them: moving the claim touches three documents and nothing runs that would decide it.

Not measured: whether the two lines mean exactly one thing — `domain-intent.md` bars an act as well as a reason, and `domain-design.md` bars a reason alone — or whether a third child of `domain-invariant` is expected that the claim would not be true of.
