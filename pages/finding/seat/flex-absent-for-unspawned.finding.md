---
id: 951e532c-c2f0-5ee6-8a50-16ffb739832c
page-type-slug: finding
title: "Flex absent for unspawned"
domain-slug: page-type/seat
---

# Claim

`domains/seat.md:21` is false for most seats. It reads "Two seats may state the same attributes; their flex is what tells them apart." But line 17 of the same document says only a spawned seat has a flex, and its spawner assigns it. Two non-spawned seats stating the same attributes therefore have no flex available: they spell one name, and the verb refuses the second outright rather than telling them apart. The permission this line grants does not hold for them.

# Evidence

Raised by a review-instructions seat on `domains/seat.md`, which verified the flex restriction by running it rather than reading it: `bun tools/seat.ts --flex flex-9` against its own seat was refused, exit 1, "nothing was stated". It also ran `bun tools/seat.ts --name` with and without a flex and confirmed the flex is spelled into the name.

I verified line 21 reads as quoted.

The fork it named: narrow the line to spawned seats, or move the exclusion onto `domains/seat-name.md`, which already carries "A seat name is never ambiguous". It landed neither, treating a word change to a Design line as reserved.

Not measured: how often two non-spawned seats actually collide, or whether the refusal is the intended behaviour the line should describe.
