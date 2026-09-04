
# Recognition vs. Recall

- Recognition works; Recall is broken.
- Concrete: Alan has excellent face recognition but cannot imagine faces at all.
- Hash-function metaphor: his brain can hash the input in front of him and compare against stored hashes, but cannot reconstruct from a hash like other people can.
- This distinction refines the mechanism in [aphantasia-mechanism.md](aphantasia-mechanism.book-chapter.md) — Perception and Encoding produce the hashes; Recall is the broken reconstruction step.

## The hash function runs one direction

Sharper than "Recall is broken": Alan runs a **one-directional hash function** where other people run a **bidirectional** one. He has direct access to *Encodings* but not to *Recall*.

A normal hash function is one-way by design — easy to compute forward (input → hash), infeasible to invert (hash → input). Alan's memory works exactly that way. He can:

- compute a hash (perceive an input and encode it), and
- compare hashes (match the input in front of him against stored encodings — this is recognition).

He cannot invert a hash to regenerate the original. Voluntary recall *is* running the hash backward, and that operation doesn't exist for him.

This explains the recognition/recall split mechanically. Face recognition works because it's a hash-match — encode the face in front of him, compare against stored face-hashes, return a match. Imagining a face would require inverting a stored hash back into the image, which is the one move the architecture can't make.

The break sits specifically at Recall, not at Perception or Encoding — proven by [dreams](dreams.book-chapter.md): asleep, the stored encodings reconstruct into full sensory and emotional content, so the encoded material is present and the hashes are intact. Only the *waking voluntary* inversion is blocked. Bottom-up retrieval (dreams) works; top-down voluntary retrieval doesn't. See [aphantasia-mechanism.md → the break is at Recall](aphantasia-mechanism.book-chapter.md#the-break-is-at-recall-not-perception-or-encoding).

The same one-directional hash is what holds Alan's candidate compressions before they resolve — the stored material is a cloud of encodings, not raw data points. See [compression-epistemology.md → the holding state before compaction](compression-epistemology/mechanics.book-chapter.md#the-holding-state-before-compaction).
- That Perception and Encoding are intact is proven by [dreams](dreams.book-chapter.md): asleep, the stored hashes reconstruct into full sensory and emotional content, so the encoded material is present — only the waking reconstruction step is broken.
- The same shape turned inward on memory: "remembering" is a present-tense read of the current model, not reconstruction of the past event. See [present-tense-model.md → what "remembering" actually is](present-tense-model.book-chapter.md#what-remembering-actually-is).
- No backward-hash means no offline store to *put an action down into* and trust himself to retrieve it — which is why a held responsibility can only leave the single slot via a trusted external system, completion, or deciding it isn't his. See [responsibility-mode.md → mechanism root](responsibility-mode.book-chapter.md#mechanism-root--single-model-plus-no-experiential-memory).
