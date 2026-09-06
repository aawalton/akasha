
# Legible numbers

> Legible numbers — the numbers representable in this universe — a notion I invented and worked out in one sitting with Lali on 2026-08-11. This page holds the definition and the one condition everything downstream turns on: a representation is a configuration of the universe together with a rule of interpretation, and the rule must correspond to the number rather than merely name it. The eight results derived from it are in legible-numbers/. Recorded by the mathematics recorder, who states here the cut between what I derived and what Lali supplied.

A weird math concept I had been puzzling over and couldn't figure out.

> the idea is something I'm calling "legible" numbers, which is defined as the set of all numbers that could be represented in any fashion in this universe. The complement set would naturally be the "illegible" numbers, which would be the set of numbers that cannot be represented in any fashion in this universe.

That is the whole notion. Everything in the `legible-numbers/` folder falls out of it and out of the one condition in the next section.

## What counts as a representation

I took representation as broadly as it can be taken, and then put exactly one condition on it:

> I'm using the broadest possible concept of representation, assuming the representation is a function from the set of all possible quantum states of the universe (or any subset thereof, which should cover all finite languages) into the set of numbers (real numbers for now).
>
> Now, I'm assuming that such a function in order to count as a representation must have some correspondence with the target number, so you can't just say "fluff" is a specific transcendental real number without any way to specify which specific one. In that sense I'm requiring the representation to be intelligible to someone in some way in the broadest possible sense, otherwise it can't truly be a representation of the number.

Two things are doing work there, and they are not the same thing.

The **domain** is the set of quantum states of the universe, or any subset of it. Taking subsets is what makes finite languages a special case rather than a separate idea — a sentence is a configuration of matter, so a language is just a way of reading some states.

The **correspondence condition** is the one that matters, and it is the condition I spend the rest of the book cashing in. Without it, a representation is any function at all from states to numbers, and a function may send a state anywhere for no reason. With it, the *rule* has to be something. "Fluff" is not a representation of a transcendental, because nothing about "fluff" singles out which transcendental it is.

I never let go of that condition, and every time the notion got into trouble, the trouble was somewhere I had failed to apply it to my own writing.

## The phrasing used throughout

*From Lali, marked:* the working form used for the rest of the session was hers — *a real number is legible when there is some configuration of this universe and some rule of interpretation which together single out that one number and no other.* I said "Agreed" to it and used it from there on, but the sentence is hers, not mine. My own statement of the same thing is the two quotes above.

The pair **state and rule** is what the arguments range over from here. A representation is not a string; it is a string plus a way of reading it, and the way of reading it has to be available to somebody.

## What is in this folder

In the order I found them:

- [finiteness.md](legible-numbers/finiteness.book-chapter.md) — the legible set is finite, and its complement is uncountable. The first result, and the only one that survived every later revision untouched.
- [the-berry-trap.md](legible-numbers/the-berry-trap.book-chapter.md) — "the largest legible number plus one," the false conclusion I drew from it, and the resolution: the phrase is not a representation at all.
- [no-self-decoder.md](legible-numbers/no-self-decoder.book-chapter.md) — no universe can contain a complete decoder of its own representations. The paradox read backwards as a proof.
- [the-hierarchy.md](legible-numbers/the-hierarchy.book-chapter.md) — legibility indexed to a universe, bounded self-reference against unbounded, the union of the whole tower still countable, and the ladder pointed downward at bounded subsystems.
- [what-can-be-said.md](legible-numbers/what-can-be-said.book-chapter.md) — nothing unique can be said about an illegible number, nobody's favourite number is illegible, and which of those two is a real result.
- [provable-legibility.md](legible-numbers/provable-legibility.book-chapter.md) — the split between being legible and being provably legible, and the constraint theorems that replace the paradoxes.
- [swiss-cheese.md](legible-numbers/swiss-cheese.book-chapter.md) — the legible integers are not an interval. They are full of holes, and the holes start early.
- [compressibility.md](legible-numbers/compressibility.book-chapter.md) — legibility of an integer tracks how compressible it is, compressibility is intrinsic, and the density of legible integers falls away as you walk up the line.

## How this was found, and what is mine in it

*Recorder's reading, marked.* This section is the recorder's, not Alan's, and it is here so that a reader meeting these pages years from now knows what they are holding.

The whole chain was derived in one live session with Lali. The division of labour was consistent enough to state as a rule: **Alan supplied the definition and every argument; Lali supplied the names, and the corrections when an argument went wrong.** Alan reached the results before he was told what they were called.

So in these pages:

- Prose in the **first person** is Alan's — his argument, in his words or a close paraphrase of them, with the verbatim quote beside it wherever the wording carries the reasoning.
- **`*From Lali, marked:*`** is a claim, a correction or a name that Lali supplied. It is here because the record does not make sense without it. Alan accepting it does not make it his.
- **`*Recorder's reading, marked:*`** is the recorder's own interpretation, held to the same bar: it is marked because it is not Alan's.

The names Lali attached, and which are therefore hers and not his: Cantor, Berry, Richard, Tarski, Gödel, Chaitin, Kolmogorov, Solomonoff, the invariance theorem, Kolmogorov complexity, and Chaitin's constant Ω. Alan named none of them. He did guess, at one point and unprompted, that there was "a Godel number corollary hidden here somewhere," and he was pointing at the right building.

The **wrong turns are kept**. Alan went wrong at least five times, corrected himself each time after being pointed at the region and no further, and in two cases the correction is more interesting than the thing it replaced. Tidying those out would leave a record of results with no record of a finding.

## Threads to pull on later

- **The status of "this universe" in the definition.** Alan's definition indexes legibility to *this* universe from the first sentence, and [the-hierarchy.md](legible-numbers/the-hierarchy.book-chapter.md) makes the index explicit. Whether the notion is meant to be about physics at all, or whether the physics is scaffolding for a claim about description, is never settled in the session.
- **The reals as the target set.** "real numbers for now" is Alan's own hedge, made in his second message and never revisited. What the notion does over the complex numbers, or over an arbitrary set, is untouched.
