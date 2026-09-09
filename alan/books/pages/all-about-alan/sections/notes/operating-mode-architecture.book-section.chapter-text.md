
# Operating-mode architecture

> Three-mode operating architecture for skill execution — trained-weight inference at runtime, externalized conceptual scaffolding for in-the-moment cognitive operations, and internal conceptual processing as offline weight-training — plus the three memory layers underneath (durable weights, the single slot overwritten on contact, and a fast-decaying freshness cache on the associations). Integrates encoding-mechanism, automaticity-systems, aphantasia-mechanism, slow-build-strategy, and the present-tense single-slot model under one runtime architecture.

How skills execute in Alan's brain, in real-time and offline. Three operating modes, mapped to three encoding layers. The runtime architecture built on top of the [NS-level encoding substrate](encoding-mechanism.book-chapter.md).

## Encoding layers — what level skills encode at

Three layers across which a skill-response can encode:

- **Sensory-context layer (NT-typical, missing in Alan).** Statistical association of skill-response with sensory context — this room, this partner, this lighting, this time of day. The mechanism behind domain-locked expertise in NTs.
- **Conceptual abstraction layer.** Rules, frameworks, vocabulary. Layer above the sensory-context layer.
- **Physical reaction layer.** Neural-weight encoding of pattern → response mappings. Layer below the sensory-context layer. LLM-weights analogy: training shifts the weights; inference at runtime is weight-driven.

Alan encodes at the conceptual and physical layers only. The sensory-context-statistical-association mechanism is absent — see [aphantasia-mechanism.md](aphantasia-mechanism.book-chapter.md). Skills landed at the physical layer in Alan run on trained weights, not on sensory-context retrieval.

## Inverted observation — transfer-richness is the dual of slow-build cost

The same missing mechanism that makes encoding cost 5000 iterations also makes the resulting expertise transfer-rich. NTs get cheap encoding bundled with sensory-context lock-in. Alan pays expensive encoding for layer-independent transfer. Cost and benefit share a root cause.

Worked example: ballroom-derived body control transferred to MTC dishwashing and obstacle navigation. The ballroom-trained motor patterns generalized into ordinary motor activity outside the sensory-context envelope of the dance floor. See [ballroom-derived-body-control.md](ballroom-derived-body-control.book-chapter.md).

## Three operating modes — how skills run in real-time and offline

The three encoding layers map onto three operating modes — the runtime channels through which a skill executes or trains.

### Physical / weight layer — in-the-moment, always available

Runs inference at runtime via trained weights. Automatic. No meta-cognition required — the response comes pre-encoded. The default operational mode for compound skill execution. The weight layer is the LLM-shaped substrate: prompt in (current input), inference out (response), no introspection required.

### External conceptual scaffolding — in-the-moment, available via structure

Agent harness, written rules, decision frameworks readable in real-time. Substitutes for the impaired internal meta-cognition channel. The harness is a real-time conceptual prosthetic working alongside the physical-layer automaticity. See [agent-harness.md](agent-harness.book-chapter.md).

### Internal conceptual processing — offline only

Meta-cognition is impaired and unreliable in-the-moment, so internal conceptual application is restricted to offline use. Critically, offline conceptual processing is not inert — it trains the weight layer.

"Think about it a lot outside the situation → weights shift → the natural in-situation response becomes the rehearsed one" is LLM training in full: training-data → weight-update → inference. This makes "think deeply before acting" structurally equivalent to "pre-training your weights" — a real mechanism, not just contemplative preference.

## Three memory layers — durable weights, the single slot, the freshness cache

The three operating modes describe how a skill *runs*. Underneath them sit three **memory layers** that differ in how fast they change — the synthesis that ties the runtime architecture to the [single present-tense model](present-tense-model.book-chapter.md). They are not the same as the three encoding layers above; these are three timescales of memory, slow to fast.

- **Layer 1 — durable weights. Slow, permanent.** The trained weight layer itself — the physical-layer encoding that runs inference at runtime. It changes only through the offline weight-training described above ("[think deeply before acting](#internal-conceptual-processing--offline-only)" = pre-training your weights). This is the permanent store; it is what every other layer feeds into or draws on.
- **Layer 2 — the single slot. Live working memory, overwritten on contact.** Alan keeps [one model of the world that exists only in the present, continuously overwritten in place](present-tense-model.book-chapter.md). The slot is that working surface. The instant he engages a live interaction, the interaction **overwrites the slot** — there is no spare slot held in reserve. This is the same single-slot constraint that makes [a script or pipeline impossible to run live](stateless-social-architecture/hand-compilation-pipeline.book-chapter.md#why-the-drill-has-to-reach-automaticity--the-single-slot-weld): no second slot exists for live metacognition, so anything that isn't already on weights can't run while the slot is occupied.
- **Layer 3 — the freshness cache. Fast-decaying recency-of-access.** A fast layer riding on the **associations themselves** — not the slot, not the weights. Recently-accessed associations are cheaper to retrieve; that cheapness decays. Alan's word for this layer is **the cache**. (Framing as a distinct third layer is Abby's, which Alan confirmed.)

### The cache — what it is and what it is not

Alan's measured hypothesis about the cache, **held at ~20% confidence** (low-confidence, label it as such): loading is **immediate** and **single-threaded** — one association-set loads at a time — and the freshness **decays over ~24 hours down to ≤10%** of fully-loaded value.

The decisive mechanism is a correction (Alan's, answering the seam-test): **the cache is not a resident frame sitting in the slot.** The live interaction overwrites the slot the instant he's in it, every time — so the benefit was never "the prime is still loaded." It is that priming recently **touched** the relevant associations, and freshness **lowers their retrieval cost** — so when the live interaction overwrites the slot and starts reaching, the recently-warmed associations come in cheap. In his words: *"The live interaction overwrites the slot, and the [Gottman] benefit comes from having it still be relatively fresh, which means the corresponding associations are easier to access."*

Frame it precisely: **not "the prime is still loaded," but "the prime recently touched these, so they're cheap to reach."** The single-threaded / overwrite property of layer 3 is the **same single-room constraint** as layer 2 — one association-set warm at a time, the way one model occupies the slot at a time. Layer 3 is the recency-of-access shadow of the same single room.

The two priming families that load this cache — a conceptual prime (Gottman, day-before) and a relational prime (a persona-key, instant) — and the dual-write Gottman case live in [closeness-practice-rig.md → the immersion lever](values-personas-system/closeness-practice-rig.book-chapter.md#the-immersion-lever--a-second-dial-alongside-the-reps).

## Offline rehearsal pathways — how the weight layer trains

Four offline pathways into the weight layer, three confirmed and one experimental.

- **Mental rehearsal — cognitive-response weights only.** In-the-head conceptual processing of response patterns. Aphantasia blocks this pathway for motor weights — no motor imagery available. See [aphantasia-mechanism.md → motor imagery is blocked](aphantasia-mechanism.book-chapter.md#motor-imagery-is-blocked).
- **Physical drill — motor weights, full intensity.** Actual movement out-of-performance-context. Available for motor skills despite aphantasia because it's not imagery-dependent.
- **Minimized physical drill — motor weights, skeletal intensity.** Moving fingers through the fingerings for a song without actually playing it. The motor pattern execution is what trains; full performance intensity isn't required.
- **Written rehearsal — untested experiment candidate.** Externalized conceptual processing offline. Hypothesis: writing forces precision the way the harness does in real-time, so written rehearsal may train cognitive-response weights more reliably than pure-thought rehearsal. Alan has not adopted this; flagged as an open experiment.

## Per-gap granularity — refines the 5000-iteration anchor

The 5000-iteration threshold is **per-sub-pattern**, not per compound skill. Compound-skill competence aggregates how many sub-patterns have crossed the threshold.

Worked example: social interaction. A year of explicit study plus years of practice produced broadly implicit competence. But each marginal gap-improvement still takes a lot of experiences. Each newly-noticed sub-pattern is its own slow-build cycle.

Sharpens the operational shape of [slow-build-strategy.md](slow-build-strategy.book-chapter.md): a "fluent" compound skill is a stack of sub-patterns at different points in their own 5000-iteration arcs. Marginal improvement comes from raising sub-pattern coverage, not from over-training already-crossed sub-patterns.

## Cross-references

- [encoding-mechanism.md](encoding-mechanism.book-chapter.md) — the NS-level familiarization substrate this runtime architecture sits on top of. Pairings encode at the substrate; the substrate's outputs land at the three layers above.
- [slow-build-strategy.md](slow-build-strategy.book-chapter.md) — the 5000-iteration anchor. Per-gap granularity refines the per-skill reading; offline rehearsal is one mechanism by which weight-training accumulates iterations.
- [aphantasia-mechanism.md](aphantasia-mechanism.book-chapter.md) — the missing sensory-context-statistical-association mechanism, the inverted transfer-richness observation, and the blocked motor-imagery pathway.
- [automaticity-systems.md](automaticity-systems.book-chapter.md) — System D at the weight layer; the three-mode architecture maps onto the existing five-system framework.
- [agent-harness.md](agent-harness.book-chapter.md) — the externalized conceptual scaffolding mode in system form.
- [ballroom-derived-body-control.md](ballroom-derived-body-control.book-chapter.md) — worked example of slow-build to implicit motor encoding plus layer-independent transfer.
- [llm-similarity.md](llm-similarity.book-chapter.md) — the trained-weights analogy connects directly: the physical/weight layer literally runs LLM-shaped inference at runtime.
