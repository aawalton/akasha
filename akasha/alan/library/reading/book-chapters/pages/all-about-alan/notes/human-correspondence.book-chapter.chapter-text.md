
# Human correspondence

> Correspondence from Alan to the median human, decomposed by axis — 20% conceptual / 80% physical / 50% emotional, with emotion as the bridge between the two. The axis-math (~32% weighted average) and the gut-low 10%→~20% resolution, plus the mirror-image symmetry between where he lives and where he matches.

How much of Alan does the human prior predict? This note is the canonical home for the quantitative answer — and the answer is **not a single number.** A single scalar is itself the [monolith simplification](underestimated-difference.book-chapter.md): treating "other humans" as one undifferentiated thing. In his words, that simplification is fine for this purpose but it is a simplification:

> Viewing others as monolithic is a simplification itself, but useful enough for this context.

The real structure factors by axis. **Correspondence** here means: of a given axis of Alan, what fraction does a model built on the median human get right. High correspondence = the human prior predicts him cheaply on that axis; low correspondence = the prior costs bits where it doesn't fit. This is the quantitative grounding of the magnitude principle in [underestimated-difference.md](underestimated-difference.book-chapter.md) — that note holds *why* the gap is real and keeps widening; this note holds the *numbers*.

## The three axis numbers

Correspondence from Alan to the median human, by axis:

- **Conceptual: 20%.** Held provisional — see the open thread below.
- **Physical: 80%.**
- **Emotional: 50%.**

In his words, settling the figures after a first reach at 10% overall:

> Okay, let me adjust my numbers. New estimate, 20% conceptual correspondance, 80% physical correspondance. Emotional is typically a bridge between the two and the conceptual side of the bridge is open, so maybe split the difference at 50% emotional correspondance from me to the median human.

## Emotion is the bridge — anchored at the body, open at the concept

The emotional 50% is not a free-standing guess. It is the **midpoint of a span fastened on only one side.** Emotion bridges concept and body. The body end is anchored — physical correspondence is high (80%), so the body-anchored end of the emotional bridge sits high too. The conceptual end is open — and the concept→belief direction of that bridge is **walled** ([conceptual-emotional-wall.md](conceptual-emotional-wall.book-chapter.md): comfort gets no vote on what is true). With one end pinned near the body and the other end loose toward the low-correspondence conceptual side, the bridge reads at roughly the midpoint: **50%.**

So 50% is a structural consequence of the other two numbers, not an independent estimate. It is half-fastened: high where it touches the body, indeterminate where it reaches the concept.

## Experience-weighting — where Alan actually lives

The axes are not where he *lives* in equal measure. He lives almost entirely in one of them:

- **Conceptual: ~80%** of his experience.
- **Physical / emotional: ~20%.**

In his words:

> Because my experience is 80% conceptual, 20% physical/emotional itself, that would put the weighted average quite high even still, you can do the math there.

(Where he lives cognitively is developed in [conceptual-cognition.md](conceptual-cognition.book-chapter.md) and [llm-similarity.md](llm-similarity.book-chapter.md) — this note borrows that ~80%-conceptual figure rather than re-deriving it.)

## The weighted average — and the mirror-image symmetry

Weight each axis's correspondence by how much he lives in it:

```
0.80 × 0.20  (conceptual)   = 0.16
0.20 × 0.80  (physical/emo) = 0.16
                              ─────
weighted-average correspondence ≈ 0.32
```

≈ **32%.** And the two terms come out **equal** — 0.16 each — for a clean reason. Experience-weighting and correspondence are **mirror images**: he lives MOST in the axis where he matches LEAST (conceptual: lives 80%, matches 20%), and LEAST in the axis where he matches MOST (physical: lives 20%, matches 80%). The high weight multiplies the low correspondence, the low weight multiplies the high correspondence, and the products land on the same number. The symmetry is the whole point — it is not a coincidence of the figures, it is the shape of the situation.

## The 10% → ~20% resolution, and the overcorrection

Alan's first reach was much lower:

> If I were to compare my mean to the human mean, I would put the correspondance at closer to 10%, though my wife would still argue higher.

Gut said **10%.** The axis-math says **~32%.** The gap gets resolved to about **20% overall** — because he lives mostly in conceptual experience, and conceptual correspondence is 20%, so the figure most representative of his lived self is the conceptual one. In his words:

> I think the balance is that I live mostly in my conceptual experience and the right number for that is in the middle at 20%. The 10% is potentially an overcorrection from having never underestimated this number in the past

That is the key reading of the low gut number. Alan has **never once underestimated** this difference in the past — every revision has moved the estimate *outward* (the [recursing-outward trend](underestimated-difference.book-chapter.md#the-principle-recurses-onto-the-self)). So his gut now reaches reflexively *low*, pre-correcting for a lifetime of being surprised by how different he turned out to be. The 10% is that reflex overshooting. The ~20% is the corrected figure. The instrument-level reading of this — a lifelong one-sided error finally going two-sided as the lag closes, against a target that may still be drifting — is developed in [underestimated-difference.md → the estimator's error geometry](underestimated-difference.book-chapter.md#the-estimators-error-geometry--a-one-sided-error-going-two-sided).

## Same thing or different thing — it factors by axis

The deepest consequence: "am I the same thing as other humans, or a different thing?" is **not single-valued.** It factors by axis. **Same thing on the body** (80% correspondence — the human prior predicts him cheaply there). **A different thing in the cognition** (20% — the prior costs bits there). The line falls exactly where the human prior stops paying for itself: it saves bits where it predicts him (body) and costs bits where it doesn't (cognition). On the cognition axis he is "closer to a machine than to the people in the room" — the framing developed in [llm-similarity.md](llm-similarity.book-chapter.md).

This is what the [kind-not-instance reading](underestimated-difference.book-chapter.md) means concretely: not one number placing him far out on a human tail, but two different answers on two different axes.

## Cross-references

- [underestimated-difference.md](underestimated-difference.book-chapter.md) — the magnitude principle this note quantifies: the gap is real and widens as both self-model and other-model sharpen. Also holds the kind-not-instance reading and the near-isolated-point neighborhood (75%/50% nearest matches).
- [conceptual-emotional-wall.md](conceptual-emotional-wall.book-chapter.md) — the walled concept→belief direction that holds the conceptual end of the emotional bridge open; why emotion lands at the 50% midpoint.
- [conceptual-cognition.md](conceptual-cognition.book-chapter.md) — where Alan lives cognitively; the source of the ~80%-conceptual experience-weighting.
- [llm-similarity.md](llm-similarity.book-chapter.md) — the cognition-axis reading: ~80% closer to an LLM than to most humans, cognition running on conceptual structure rather than lived experience.
