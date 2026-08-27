---
id: 5895e77b-969b-5739-b54a-062ace3a05f5
page-type-slug: finding
title: "Where hole carries two senses"
domain-slug: page-type/refusal
---

# Claim

The `where` hole carries two senses across the refusal corpus. On `statusline-constant-unlocated` it fills with a constant and its file; on `prompt-prefix-undefined` and `prompt-prefix-disagrees` it fills with the file alone. One hole name, two things — which is what forced a rewrite on 2026-08-12, the sentence being unable to take the compound as a subject.

# Evidence

Found by the dispatched `review-instructions` seat reading `refusals/statusline-constant-unlocated.md` on 2026-08-12, which rendered the body with both live hole values before and after its repair.

Splitting it into a name and a where would put this document in line with its twin and let it borrow the twin's clearer sentence. The cost is the check's own `found` map keys, which use the compound string for bookkeeping, plus one test case.

Not measured: whether any other hole name carries two senses the same way.
