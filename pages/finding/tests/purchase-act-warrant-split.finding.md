---
id: 11981fc1-de1b-530a-ab5c-bf051a8b3d3b
slug: purchase-act-warrant-split
page-type-slug: finding
title: "Purchase act warrant split"
domain-slug: domain/global
---

# Claim

`file-kinds/tests.md` **Purchase** states its warrant against a test that cannot fail
while its act binds only whether the coverage is unique, so a test that is both unique
and vacuous satisfies it.

# Evidence

Measured 2026-08-04, firsthand, running `define-principle-or-rule` against a candidate
about test-first development.

**Purchase** reads: "Keep a test only where it would catch a defect nothing else would. A
test that cannot fail and one that catches real defects are both green for years. Name the
baseline: the type that will not compile, the gate that refuses, the schema, the
neighbouring test."

The warrant names one failure — a test that cannot fail — and the act and the aid answer a
different question: whether some other mechanism already catches the defect. A reader can
name the baseline in full, establish that nothing else covers the case, and still hold a
test whose assertion cannot go red. Nothing in the section closes on that reader.

Two commits of one day show the shape. `~/code` `f9a43eef9e` removed an assertion that
each of six ladders equals a literal array; the message calls it "a change-detector that
can only fail in the very commit that changes" the constant it copies, the arrays being
hand-copies of constants beside them in the same repository. Nothing else asserted that
equality, so Purchase's act passed it; what removed it was **Contract Oracle**, whose
vocabulary the message uses throughout. `~/code` `93779d139a` is the second:
`expect(known.length).toBeGreaterThan(0)` asserting 2,160 name collisions were still there.

Not measured: how many standing tests are unique and vacuous — no instrument reports it.
Of the 186 checks under `packages/infra/checks/src/checks/`, none is a mutation or vacuity
check; `check-non-optimistic-mutations` is about optimistic UI writes and
`check-type-assertions` about `as` casts. Whether the seam is best closed by widening the
act, by leaning on Contract Oracle, or by an instrument was not decided.
