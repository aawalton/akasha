
# Compressibility is intrinsic

> The last thing I found and the one that felt strangest: if legibility of an integer tracks compressibility, then compressibility has to be an intrinsic property of a number rather than an artifact of the scheme you chose. My resolution — a minimum over all possible forms of compression — and my projection argument for why some numbers compress into a finite space and others cannot, which is the density result. The invariance theorem that makes 'intrinsic' exact, and the name the quantity already has.

[The legible integers are Swiss cheese](swiss-cheese.book-chapter.md), and what puts an integer in or out is how compressible it is. There are at most two-to-the-n legible integers, total, forever — so what happens to their density as you walk up the number line?

> It does make sense that the density of legible numbers decreases as you move away from the origin, though out feels strange to think that there must be some intrinsic property of compressibility for numbers, independent of any single specific form of compression. I guess a minimum over all possible forms of compression would do that though, and the nature of projection an infinite space onto progressively smaller finite spaces would guarantee that some numbers are compressible into finite spaces while others are not, making a natural gradient of compressability (assuming the compression functions themselves are also finite)

*Quoted as written; read "out feels strange" as "it feels strange."*

Four things in that, and I want them apart.

## The unease

The density claim is easy. The strange part is what it commits you to: **there has to be an intrinsic property of compressibility belonging to a number itself**, independent of any particular form of compression. That is a strong thing to be forced into, because compressibility looks like it should be a fact about the scheme you chose rather than about the number.

## Minimum over all schemes

The resolution I reached is to take the **minimum over all possible forms of compression**. A number's compressibility is the shortest description it has under any scheme at all, so no scheme is privileged and the quantity belongs to the number.

With the caveat I attached at the end, which is doing real work: **the compression functions themselves have to be finite.** Without that, a scheme is free to be a lookup table with the number already in it, and every number compresses to nothing.

## The projection argument

The reason some numbers land inside a finite space and others do not is projection. You are mapping an infinite space onto progressively smaller finite spaces. Some things fit and some do not, and that guarantees **a natural gradient of compressibility** rather than a clean division.

*From Lali, marked:* that is the actual proof of the density claim rather than an intuition about it, and here it is counted. There are fewer than two-to-the-k descriptions shorter than k bits, and there are two-to-the-k integers with k bits, so the descriptions run out before the numbers do — no injection exists. **At least half of all k-bit integers cannot be compressed by even a single bit.** Pigeonhole, and nothing more.

## Density

The consequence, stated: the legible integers thin out as you walk up the line. There are at most two-to-the-n of them ever, and past any point the k-bit integers outnumber the descriptions available to name them, at every k, by a margin that grows. The set does not stop — it just gets more and more nearly empty.

## The invariance theorem

*From Lali, marked.* The unease in the first section has an exact answer, and it is better than "take a minimum."

Take any two universal description languages, U and V. Anything V can express, U can express too: prepend a fixed interpreter for V, written in U, then run V's description. That interpreter has some length c, and **c depends only on the pair of languages, never on the number being described.** So the shortest U-description and the shortest V-description of any number differ by at most c, forever, for every number.

Compressibility is therefore intrinsic **up to an additive constant, and the constant does not grow.** Change the entire representational scheme, top to bottom, and every number's complexity shifts by less than a fixed amount. In the physical setting, with n somewhere around ten-to-the-122 bits, a constant of a few thousand is nothing at all — the legible set barely notices which language was chosen.

*Recorder's reading, marked:* this is a stronger statement than the minimum-over-all-schemes resolution and does not need it. Alan's move makes the quantity well defined by construction; the invariance theorem shows it was nearly well defined already, under any single reasonable choice.

## The name

*From Lali, marked:* the quantity is Kolmogorov complexity. Solomonoff reached it in 1960, Kolmogorov in 1965, Chaitin in 1966, independently of each other. "Legible in under n bits," from [provable-legibility.md](provable-legibility.book-chapter.md#illegible-20), is "K of x is less than n" written out longhand.

## Cross-references

- [swiss-cheese.md](swiss-cheese.book-chapter.md) — the distribution this is the mechanism for.
- [provable-legibility.md](provable-legibility.book-chapter.md) — the "under n bits" formulation this names, and Chaitin's constant, which is the middle drawer's one occupant.
- [finiteness.md](finiteness.book-chapter.md) — the count of two-to-the-n that the density argument works against.
- [../001-legible-numbers.md](../001-legible-numbers.book-chapter.md) — the definition all of this descends from.

## Threads to pull on later

- **The finiteness caveat on compression functions.** I attached it in a parenthesis and never cashed it out. It is what stops the lookup-table cheat, and the invariance theorem's *universal* description language is presumably the precise form of the same requirement — but the session never connects the two.
- **Density as a function rather than a direction.** "Decreases as you move away from the origin" is a direction. The pigeonhole count gives a bound at each k; turning that into a stated density function is not done.
- **Whether the gradient is the right word.** I said a natural *gradient* of compressibility rather than a division, and nothing follows it up. Whether the intermediate cases have a structure worth naming is open.
