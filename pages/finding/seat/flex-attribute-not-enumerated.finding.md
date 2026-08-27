---
id: 3d2a30e0-b8ef-51df-b9f4-46192a67fc97
slug: flex-attribute-not-enumerated
page-type-slug: finding
title: "Flex attribute not enumerated"
domain-slug: page-type/seat
---

# Claim

`domains/seat.md` gives two different answers about how many attributes a seat has: the Design enumerates three, and the Intent names a fourth called flex.

# Evidence

`domains/seat.md:13` states "A seat's attributes are persona, domain and role."

`domains/seat.md:25` and `:27` then speak of a flex attribute and a flex value, in the `# Intent` section — so flex is a fourth attribute, or it is something other than an attribute and the word is wrong.

A grep of `domains/**/*.md` returns those two lines and nothing else: flex is named nowhere in the corpus outside this file.

Either the enumeration at line 13 is incomplete, or the Intent entries need a different noun.

Found by a reader on the plain-language pass over Design and Intent sections, project #18012. The wording of all three lines is plain; the mismatch is between them.
