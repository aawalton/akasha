---
id: 6791d576-199a-5efe-a68a-b2b10d7fa8cb
page-type-slug: finding
title: "Snapshot claim may be lost"
domain-slug: domain/global
---

# Claim

A sentence cut from `Zero At Landing` may have carried a claim the corpus now holds nowhere: that a check asserting a snapshot is not asserting intended state. It read three ways and no version of it survives to disambiguate.

# Evidence

Cut by `2cfc2702` on 2026-08-06, from `Zero At Landing`'s description on `domains/code-check.md`: "A snapshot of intended state is not one: any drift fails it."

The three readings:

- The frozen list records what stood on one day rather than what should stand.
- A snapshot presented as intended state is not one.
- A check asserting a snapshot — a golden file — is not asserting intended state.

The third is a claim about a whole class of check design. It would be a rule of its own rather than an aside inside a rule about landing a new check, and if it is what was meant then the corpus has just lost it.

No longer version exists to settle which. `git log -L` and `git log -S` put the sentence's authoring in `768e15c2` on 2026-08-04, whole, on `domains/code-harness.md`; `a9f64462` moved it to `domains/code-check.md` unchanged.

Nothing else in the corpus binds any of the three. A sweep of `domains/` for `baseline|allowlist|suppress|ratchet|exempt` returns nothing, and `dirty/` holds no copy.

Raised by the `review-instructions` reading of `domains/code-check.md` on 2026-08-06, which cut the sentence rather than rewriting it precisely because it could not settle which claim it made.
