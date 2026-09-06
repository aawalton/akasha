
# Provable legibility

> The move that makes the whole thing usable from inside our own universe: stop asking whether a number is legible and start asking whether it is provably legible. The three-way split, the finite provably-legible set whose largest member cannot be identified, the middle drawer and what does and does not belong in it, the fourth category I proposed and had taken apart, and the difference between what is known and what is true. The paradoxes become constraint theorems on provability.

[No universe decodes itself](no-self-decoder.book-chapter.md), and the [ladder upward](the-hierarchy.book-chapter.md#the-ontological-objection) is a construction rather than a thing anyone has found. So the question is what can be said about legibility from inside our own frame, which is the top rung available.

> I've been puzzling over what we actually can say about legible numbers from within the frame of our universe, because your bounded definitions demonstrate that isn't nothing. However, taken to the limit, the paradox is still there.

## The wrong obstacle

I went looking for the mechanism that makes even a small subsystem intractable, and picked the wrong one.

> The limited subsystem is an interesting approach. Take a simple computer for example. The set of representations of numbers that can be represented on a computer with finite memory, where the rule of interpretation is also contained on the computer still seems intractable. Maybe the issue is the 2^N nature of the set of possible subsets? The reach of representation may scale quickly enough that even simple subsystems do not have truth predicates that can be evaluated in this universe. The halting problem for example.

*From Lali, marked:* the halting problem is not the obstacle. A computer with N bits of memory has 2^N states, so it either halts within 2^N steps or it has revisited a state and will loop forever — decidable by simulation with cycle detection. Undecidability needs *unbounded* memory.

*From Lali, marked:* the intuition that something blows up was right, and the actual mechanism is worse than the one Alan reached for.

*From Lali, marked:* the decoder for an N-bit subsystem needs on the order of 2^N resources, so **the rungs of the ladder are exponentially spaced**. A universe of M states can fully decode subsystems of about log M bits and no more. Taking the holographic bound at something like 10^122 bits for our universe gives a ceiling in the low hundreds of bits — meaning we sit at the top of a ladder whose next rung down is a system of a few hundred bits. That figure is an order of magnitude rather than a measurement, but the shape is right.

## The move

> For a more grounded claim, maybe "there exist numbers whose legibility cannot be prove from within this universe". That seems pretty defensible. That actually side-steps the law of the excluded middle in an interesting way, splitting numbers into those which can be proven to be legible, those which are legible but cannot be proven to be legible, and those which are not legible. The distinction between the last two can obviously only be evaluated in a wider frame.

That is the move the rest of the book runs on. Three categories:

1. **Provably legible** — something under the bit budget represents it, and the fact that it does is provable.
2. **Legible but not provably legible** — the middle drawer. Something represents it; nothing establishes that anything does.
3. **Not legible.**

The distinction between the first two can only be evaluated from a wider frame.

*From Lali, marked:* this does not sidestep excluded middle, and I was wrong to say it did. Every number is legible or not, and every number is provably legible or not. What actually happened is that I stopped asking about legibility and started asking about **provable legibility**, which is a different predicate with a different extension. That is the standard move rather than a dodge, and it is the exact step from Tarski to Gödel.

## The largest provably legible number cannot be identified

> However, the new set of provably legible numbers is itself interesting. That set is itself finite, and a largest member of that set must exist, but the identity of that largest member must itself be unprovable, otherwise, that number plus one would be provably legible.

The set is finite, so it has a largest member. If a proof could tell you *which* number that is, then the phrase "that number plus one" would be a provably good description of a number provably outside the set — which is the [Berry construction](the-berry-trap.book-chapter.md) again, now run over provability instead of over truth.

So the maximum exists and no proof identifies it.

> So, a set of paradoxical claims about legible numbers instead becomes a set of constraint theorems on the provability of legible numbers.

*From Lali, marked:* that last sentence is the history of the subject in one line — what happened between 1900 and 1935, when Russell, Berry and Richard found the paradoxes and Gödel, Tarski and later Chaitin turned each of them into a theorem about what systems can and cannot do. The paradoxes were instruments rather than defects.

*From Lali, marked:* the result in this section is Chaitin's incompleteness theorem, published in 1974: a formal system can prove complexity lower bounds only up to a fixed constant depending on the system. To make it airtight, swap "legible" for "describable in under n bits" — provability is expressible inside a system in a way that truth is not, and that asymmetry is exactly what makes this version bite where [the earlier one](the-berry-trap.book-chapter.md) only made a mess.

## Illegible 2.0

I redefined the terms to run on provability, and fixed the bit budget to the universe:

> now my interesting corollaries for the set of illegible numbers transfer directly to the "set of numbers that cannot be proven to be legible" (I'm using this to mean represented it under n bits, where n is the total number of bits in the available universe, because that's more fun). For simplicity, define this more precise set as the illegible numbers (2.0 implied).
>
> There is no provably smallest illegible number. Nothing interesting can be said about any specific illegible number (because that would require them to be provably legible). No one has a favorite illegible number.

*From Lali, marked:* the "under n bits" form is Kolmogorov complexity written out longhand — "legible in under n bits" is "K of x is less than n." The notion was arrived at independently and named afterwards; the naming is in [compressibility.md](compressibility.book-chapter.md#the-name).

Of the three transferred claims, one holds and two break.

### The smallest illegible integer

*From Lali, marked:* the first holds, and it is the best of the three, but the domain matters.

Over the **reals** it is true for a boring reason: most sets of reals have no smallest member at all, legibility having nothing to do with it.

Over the **positive integers** it is true for the good reason. The set is nonempty, so by well-ordering it *does* have a least member, that member is a perfectly definite integer, and no proof can tell you which one it is. That is the version worth keeping.

### Why the other two break

They fail together, for one reason: **the middle drawer is not empty.**

*From Lali, marked:* a description under n bits can succeed in picking out exactly one number while the proof that it succeeds is nowhere available. A description that turns on whether Goldbach's conjecture holds is the shape of it. Take a number in that drawer: it is illegible under the 2.0 definition, since nothing proves it legible — and yet something unique can be said about it, and somebody could have it as their favourite.

So the two claims that [transferred from the illegible numbers](what-can-be-said.book-chapter.md) do not survive the move to provability.

## The example I reached for, and what was wrong with it

> for example, the largest legible number, which we've demonstrated is in that middle drawer, and which is an interesting thing about that number, but which we can prove is impossible to specifically identify?
>
> Okay, so there is a transformation there as well, but it's in specificity. Simmering like "No interesting illegible numbers can be proven to have specific values."

*Quoted as written; "Simmering like" is a slip for "something like."*

*From Lali, marked:* two different unprovabilities are pressed together there. The largest legible number **is** legible — it is in the set, so something under n bits represents it, and that representation may be perfectly ordinary and provably good. What no proof can establish is that it is the *largest*. So the unprovable thing about it is its **maximality**, not its legibility, and it is not shown to be a middle-drawer number at all.

*Still hers:* a genuine middle-drawer number looks like "the smallest x with property P," where such an x really does exist but no proof of its existence is available. The description denotes exactly one number, so the number is legible; nothing establishes that it denotes, so it is not provably legible.

*From Lali, marked:* the example still breaks the claim it was brought against, for a different reason than the one I gave. Something genuinely interesting **is** provable about the largest legible number: that no proof identifies it. That is a specific, non-trivial, provable fact about one particular number. So "nothing interesting can be said" is dead even in the hardest case, and it is killed by a fact about provability rather than by a fact about arithmetic.

## The fourth category

> The largest legible number is in a fourth category, not in the same messy middle, in the category of legible numbers where we cannot prove if they are the largest or not. This is a category that always has exactly one member (the largest legible number found so far).
>
> We can flip that to the smallest integer which cannot be proven to be legible. We know it must exist and must be the floor of the largest legible number plus one. We cannot know what the exact value of the number is though. Likewise, any number not in the provably legible set cannot be proven to have a specific exact value. That's just a restatement of the definition though, not as interesting.

I got the category right and its size wrong, and the flip rested on a picture of the integers that is not correct — that picture is [swiss-cheese.md](swiss-cheese.book-chapter.md), and the flip is corrected in [my own restatement](#the-restatement) below.

*From Lali, marked:* the category does not have exactly one member. To prove some legible *x* is not the largest you have to exhibit a provably legible number bigger than it, and up near the ceiling there may be no room left in the bit budget to write one. So it is not one number — it is a **region where maximality is simply undecided**. And "the largest found so far" is a fact about how far somebody has searched rather than a fact about the set; the two should not share a name.

## The restatement

> I should have been more precise and called the flour(max + 1) case the smallest number that is not provably legible which is larger than all provably legible numbers. An existence proof, not a minimization proof. I was aiming for a uniquely defined specific number in the not provably legible set.

*Quoted as written; "flour" is a slip for "floor."*

That is my own correction, and the distinction it turns on is **an existence proof rather than a minimization proof**. What I was after all along was a uniquely defined specific number sitting in the not-provably-legible set.

## Known against true

> I see now there is a difference between what is known and what is true for the provably legible numbers. I was considering it from the limited perspective inside the system. Without a wider view, any intelligent agent can never know if they have found the largest provably legible number, I did miss though that there could be multiple candidates without necessarily being able to prove which one is the largest. I hadn't considered the impossibility to prove the largest might come from impossibility in proving the size at all, rather than impossibility in disproving the existence of one that is larger, that's fascinating.

Two failure modes, and I had only been seeing one of them. The obstacle I had in mind was **not being able to rule out something larger**. The one I had missed is **not being able to prove the size at all** — a candidate whose own magnitude is beyond what a proof in the budget can establish. Those are different, and the second is the more interesting.

## Cross-references

- [no-self-decoder.md](no-self-decoder.book-chapter.md) — the theorem about truth this page's results are the provability version of.
- [the-berry-trap.md](the-berry-trap.book-chapter.md) — the same construction over truth, where it produces a mess rather than a theorem.
- [what-can-be-said.md](what-can-be-said.book-chapter.md) — the three claims transferred here, two of which do not survive.
- [swiss-cheese.md](swiss-cheese.book-chapter.md) — the picture of the legible integers the flip in [the fourth category](#the-fourth-category) rested on, and what it actually looks like.
- [compressibility.md](compressibility.book-chapter.md) — where "legible in under n bits" gets its name and its invariance.

## Threads to pull on later

- **Chaitin's constant.** *From Lali, marked:* there is a real number Ω, perfectly well defined and uniquely specified by a short description, almost every one of whose binary digits is unprovable — no formal system can determine more than finitely many of them. It has been sitting in the middle drawer the whole time. I built the drawer and could not find anything to put in it, and this is the thing.
- **The size of the undecided region.** The fourth category is a region rather than a point, and nothing in the session bounds it.
- **Whether n should be the whole universe.** Setting n to the total bits in the available universe was my choice and I made it "because that's more fun." What changes if n is set to something a proof system could actually use is untouched.
