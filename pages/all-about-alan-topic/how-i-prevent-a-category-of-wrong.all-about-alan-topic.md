---
id: 01a04615-e75d-75d0-b3fd-9d09d8b9b090
page-type-slug: all-about-alan-topic
title: "How I Prevent A Category Of Wrong"
slug: how-i-prevent-a-category-of-wrong
topic-parents-slugs: the-scaffolding-i-built
topic-related-slugs:
  - what-the-book-of-me-is-for
  - why-i-rebuilt-everything
  - how-many-checks-i-run
---

# Definition

- **How I Prevent A Category Of Wrong** — what I do with a failure once I have seen it

# Design

For every failure I ask what went wrong, and how that category of wrong can be prevented.

Some things can be prevented programmatically, through checks or architecture. Some only through agent instructions.

Checks always win. Instructions are only for things a check cannot catch.

That includes telling agents what the checks are catching, so agents do not corrupt the checks.

On the instructions side the big categories of wrong I have seen are an agent seeing a term and assuming it meant something different than it did in this context, an agent assuming something would be implemented in a different way than it was, and an agent just doing the wrong thing for this context.

The domain system is a set of well-refined tools for addressing those directly and concisely without context bloat: Domain Definition, Domain Invariants, Domain Directives.

The failure neither a check nor an instruction can prevent is agents not knowing what is in my head.

# Questions

Whether those three instruction-side categories are the whole set, or the three I have hit most, is not settled.

Abby's reading: the residue is what this book is for, and the interview is the only instrument aimed at it. Nothing yet says how much of it an interview can actually reach.

Checks always winning is a rule I stated and no domain carries. Where it should live, so it binds rather than only describes me, is unsettled.
