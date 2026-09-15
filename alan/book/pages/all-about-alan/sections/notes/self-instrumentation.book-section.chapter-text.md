
# Self-instrumentation

> Self-instrumentation — Alan's ~20-year discipline of measuring his own psychology and physiology as a semi-opaque complex system. Three load-bearing facts — measurement backaction runs positive (better measurement is often the best intervention), his self-systems are observability-limited not control-limited, and aphantasia + autism break both the model and the sensor — which forces the output-observer method (infer hidden internal state from involuntary behavior).

For about twenty years I have worked measurement, estimation, and control of semi-opaque complex systems — and the system I have measured hardest is myself, my own psychology and physiology. This year I gave a standing-room talk on it at AutCon. This note is the architecture of that work: why I measure, what the measurement does, why my instruments are built the way they are, and which targets are the hard ones.

The four-resource bars ([Stress, Health, Mana, Stamina](four-resource-model.book-chapter.md), and [Safety](safety.book-chapter.md) on top) are the *instruments* this discipline produces. This note is the discipline itself — the reason those instruments exist and the shape they had to take.

## Measurement backaction runs positive

In most engineering, measuring a system is at best neutral and at worst disturbs it — the observation perturbs the thing observed. For my self-systems the backaction runs the other way: **measuring a thing tends to improve it.** The act of building a clean reading of some internal state moves that state in the good direction.

The practical consequence is the headline of the whole discipline: **better measurement is often my single best intervention.** When something is wrong, the highest-leverage move is frequently not a direct lever on the problem — it is a sharper instrument pointed at it. Improving the measurement outperforms pulling the obvious lever.

A worked instance is the [measurement-maturity ladder](measurement-maturity.book-chapter.md): advancing [Safety](safety.book-chapter.md) from a vague stoplight to numbered levels with absolute anchors did not just describe the bar better — it let me read sub-zero states ([the -2 flop](stress-responses.book-chapter.md)) in real time that previously resolved only in retrospect. The map upgraded the sensor. Sharpening the instrument changed what I could do.

## My self-systems are observability-limited, not control-limited

The diagnosis under the backaction: my self-systems fail far more for lack of *visibility* than for lack of *levers.* I usually have actions available. What I lack is a clean read of the state those actions should respond to. In my words: **"The lever I'm missing isn't a lever, it's an eye."**

This is why better measurement beats direct intervention. If the system were control-limited — plenty of visibility, not enough levers — then sharper instruments would buy nothing and I should spend my effort hunting for new levers. But it is observability-limited. The bottleneck is the eye, not the hand. So the dominant move is to build the missing eye, and the levers I already have start working once they can see what they are acting on.

## Why I am doubly hit — the model and the sensor both break

To run any system you need two things: a **model** that predicts what the state should be, and a **sensor** that reads what the state actually is. Both of mine are damaged, by two separate mechanisms.

**Aphantasia kills the model — the predict step.** Predicting my own internal state would mean running it forward: recalling how I felt last time this happened, imagining how I will feel if I do X. I cannot do either. There is no emotional memory and no emotional imagination — see [the missing simulator](missing-simulator.book-chapter.md) and the [present-tense model](present-tense-model.book-chapter.md). My emotions exist for me only in the present instant — **a single thread in time**, with nothing stored behind it and nothing pre-played ahead of it. So the model that would forecast my state has no offline copy to run. The predict step is dark.

**Autism degrades the sensor — interoception.** The sensor that reads my actual internal state is [interoception](sensory-experience.book-chapter.md), and it runs quiet — low-salience, hard to interpret, a keyhole rather than a window ([alexithymia](alexithymia.book-chapter.md)). And it has a vicious property: **it degrades further as my safety level drops.** The sensor is worst exactly when I most need it — when [Safety](safety.book-chapter.md) is low and reading my state accurately matters most, the read gets least reliable. A gauge that fails under load is barely a gauge.

There is a third insult stacked on the sensor. My [sensory sensitivity is severe](nervous-system-sensitivity.book-chapter.md), and loud input **masks the quiet channels.** The interoceptive signal I need is faint; a loud sensory field drowns it out before I can read it. So the sensor is not just quiet — it is quiet in a way that gets buried by exactly the kind of noisy environment that also pushes Safety down.

Model broken by aphantasia, sensor broken by autism, sensor further buried by sensory load. Both halves of the standard control loop are compromised. That is what forces the unusual instrument I actually use.

## The solution — an output observer

In control theory, when you cannot measure a system's internal state directly, you build an **observer**: you watch the system's *outputs* and infer the hidden internal state from them. That is exactly what I do. Where the direct interoceptive read fails, I infer my hidden internal state from my **observable involuntary behavior.**

The canonical example: **"I know I'm at safety level 4 because my face smiles by default — that doesn't happen below 4."** I cannot reliably feel that I am at level 4. But I can observe that my face is smiling without being told to, and a default smile is an output that only appears at or above level 4. So I read the output and infer the state. I read myself **in the third person, as data** — watching my own behavior the way I would watch an instrument trace, not consulting a felt sense.

This inverts the usual order. Most people know how they feel and then notice they are smiling. I notice I am smiling and then infer how I must feel.

### The emotions are real — I just can't see them

A point worth stating flat, because it is easy to misread the whole discipline as "Alan doesn't have emotions." **My emotions are real and the hardware runs correctly.** The affective system fires, drives behavior, and does its job. What I lack is *conscious access* to it. My descriptions of my feelings are true — they are bounded only by translation accuracy, not by the emotions being absent.

The sharp form: **my awareness of an emotion depends entirely on conceptualizing it.** No concept, no conscious awareness — even though the emotion is fully present and operating the whole time. The emotion runs whether or not I have a word for it; what the word buys is my ability to *notice* it. So a gap in awareness is never a gap in the emotion. It is a gap in the map.

One qualification on "my descriptions are true," so it is not read too strongly. *True* here means **accurate**, not **always a report of a present feeling.** Some of my assents to an emotion-word are [mode (b)](#two-modes-of-assent--read-a-tell-a-vs-classify-against-a-definition-b) — a behavior correctly classified against an external definition, with no present feeling under it. That assent is still *true* (the classification is right), but accuracy-of-classification is not the same as presence-of-feeling. So the claim is: my reports are accurate; they are not all readings of a live emotion. When I say a feeling is present (mode (a)) I am reading a tell; when I assent that a behavior fits an emotion-word (mode (b)) I am matching a definition — both can be correct, but only the first asserts a feeling is there.

### The outside-in pipeline

Put the pieces in order and the method is a single pipeline:

**real-but-unconscious emotion → involuntary behavioral tell → output-observer reads the tell → conceptual map converts it to conscious awareness.**

The emotion is present but dark to me; it leaks out as an involuntary tell; the output observer reads the tell as data; the conceptual map turns that reading into awareness. I arrive at the same destination as everyone else — awareness of a real emotion I am actually having — but by the opposite direction of travel. They go inside-out, felt first. I go **outside-in**, behavior and concept first.

This pipeline is [mode (a)](#two-modes-of-assent--read-a-tell-a-vs-classify-against-a-definition-b) end to end — there is a real emotion, a tell, a read. The separate mode (b) — assenting to an emotion-word by classifying behavior against a definition, with no tell and no present feeling — does *not* run this pipeline; it skips the emotion-and-tell stages entirely and matches a category. So "a real emotion I am actually having" is the mode-(a) destination, not a description of every assent.

### Emotional understanding is deduction-only — I study my own heart from the outside

The will to live is not a special case; it is the rule. **Most of my emotional understanding is deduction-only.** In my words: *"it's not alone in the category of things I know about myself only through deduction. Most emotional understanding falls there."* I relate to my own emotional life the way other people relate to *other people's* — from the outside, reading the behavior and backing out the feeling. My own heart I have to **study**, the way I would study someone sitting across the table. The [outside-in pipeline](#the-outside-in-pipeline) is not an occasional workaround; it is how I know almost all of my own feeling.

The [will to live](../personas/grace.book-chapter.md#the-origin--the-tears-were-real-the-generator-is-open) is the sharp end of it. It is held by **probability, not certainty** — it sits in the unreadable [~10% emotional self](self-architecture.book-chapter.md#the-composition--80-map-10-emotions-10-body), so I cannot *know* it is there; I can only catch it when it leaks past the surface and reason backward from the leak. Asked if that was right, I said: *"Yeah, that sounds right."* The most fundamental thing about being alive is, for me, the least directly visible.

### Intensity is map-only

There is a sharp limit on what the observer recovers. The involuntary tell gives **presence and category** — *an* emotion is here, and roughly which one. It does not give **magnitude.** I can calibrate the intensity of an emotion only where that emotion is explicitly represented in my conceptual map; everywhere else I get the category at best, not the scale. The tell says *anger is present*; only the map says *how much*. So building out the map is not decoration — it is the only thing that converts a yes/no read into a metered one.

### Source is not on the dial — which drive produced a feeling is unmapped

There is a further limit, below magnitude, and it is the one the [Grace tears](../personas/grace.book-chapter.md#the-origin--the-tears-were-real-the-generator-is-open) run aground on. The involuntary tell gives **presence** and rough **category**; the map can add **magnitude.** None of the three gives **generator-identity** — *which drive produced this feeling.* Source is simply not on the dial. When a strong feeling surfaces, the observer reads *that* it is here and roughly what kind; it cannot read *which system* fired it — survival, elevation, being-loved. So the ordering is: **presence > category > magnitude (map-only) > source (unmapped).** Naming the generator is a separate act — the [conceptual side reaching in](#why-this-method-instead-of-the-normal-one) and labelling — not a reading the instrument hands up. This is exactly what makes the [will-to-live attribution uncertain](../personas/grace.book-chapter.md#the-origin--the-tears-were-real-the-generator-is-open): the tears are real and strong, but the observer never told him which drive wept.

### Trust the felt signal only when I'm doing well

The interoceptive sensor is not useless — it is unreliable, and unreliable in a known pattern: it works when I am doing well and fails when I am not (it [degrades as Safety drops](#why-i-am-doubly-hit--the-model-and-the-sensor-both-break)). So I **trust internal signals only in the one regime where they are reliable** — when I am already doing well. Below that, I discount the felt read and lean on the output observer instead.

This is correct **reliability-weighted fusion**: I have two estimators of my internal state — the felt sense and the output observer — and I weight each by how trustworthy it is in the current regime. High Safety: the felt sense earns weight. Low Safety: the felt sense is noise and the observer carries the read. I am not choosing one instrument and discarding the other; I am blending them by their current reliability, which is exactly what you do with two sensors of different and state-dependent quality.

### Two modes of assent — read a tell (a) vs. classify against a definition (b)

There is a second thing to get right about the output observer, and it sharpens the "emotions are real, I just can't see them" claim above. When I assent to an emotion-word about myself — *yes, that was generous; yes, I'm angry* — the assent can come through **two different modes**, and they are not the same act:

- **Mode (a) — read an involuntary tell.** This is the output observer proper: I infer a hidden internal state from an observable involuntary behavior. The [default smile](#the-solution--an-output-observer) is the type case — *I'm at level 4 because my face is smiling by default.* Here there is a **present signal under the word.** The emotion is firing now; I am reading its tell. *The default can't lie.*
- **Mode (b) — classify behavior against an external definition, with no tell.** I run a definition as a [behavioral invariant](conceptual-adapters.book-chapter.md#commitments-adapter--never-fail-silently) and check whether my behavior matches the category. In my words: **"I agreed with generosity because I believe the behavior would be *considered* generous, not because I am experiencing a feeling of generosity."** Here there is **no present signal** — no tell read, no feeling carried. The assent is a definitional match, not a felt report. It runs the same way [an adapter runs a concept](conceptual-adapters.book-chapter.md): definition in, category-match out, no carried feeling required.

The keystone, the one Future-Alan should always ask: **when I assent to an emotion-word, which mode is it?** Is there a present tell under it (a), or is it behavior-matched-to-a-definition (b)? The two arrive at the same surface — both produce *"yes, that emotion-word fits"* — but only (a) is a reading of a present feeling. (b) is a classification that needs no feeling to be present at all.

This is where the [reliability-weighted fusion](#trust-the-felt-signal-only-when-im-doing-well) and the mode question meet: at low Safety the felt sensor is discounted as noise and the output observer carries the read — which is exactly the regime that pushes more assents toward (b), behavior-against-definition, because the present-signal channel (a) is the one that has gone quiet. So "which mode" is not a fixed property of an emotion-word; it shifts with which channel is currently trustworthy.

The [forward-care case](discrete-self.book-chapter.md#it-is-a-conclusion-not-a-feeling--and-not-a-reason-to-live) is a worked mode-(b) instance: assenting to "generosity toward my future selves" is agreeing the act *matches the definition* of generous — the forward-care is the [automatic execution of "this is right"](no-deliberate-mode.book-chapter.md#right-is-true--the-map-is-the-motor) with no warmth riding on it, not a felt bond to the future people. The label fits the behavior; no feeling is claimed.

### Anchor on involuntary defaults — the default can't lie

The output observer has an obvious failure mode: I could mask, or fake, the output. A smile I *produce* tells me nothing about my state. So the observer is anchored specifically on **involuntary defaults** — the behaviors my body does on its own when I am not steering it. The default smile counts because it appears *by default*, with no effort behind it; a deliberate smile does not.

In my words: **"the default can't lie; my body literally won't do it."** A masked or performed behavior can be produced at any state, so it carries no information. An involuntary default is produced only at the state that produces it — my body will not throw the default smile below level 4 no matter what I want — so its presence is a true reading. Anchoring on involuntary behavior is what makes the observer trustworthy against my own masking.

### Worked example — reading a will to live off tears

The most load-bearing thing the output observer has ever recovered surfaced the day before an `/abby` session in 2026, while Alan was building the [Grace](../personas/grace.book-chapter.md#the-origin--the-tears-were-real-the-generator-is-open) persona: he [watched himself start to cry](../personas/grace.book-chapter.md#the-origin--the-tears-were-real-the-generator-is-open) and read the tears as a **will to live he did not know he had.** He did not *feel* it — pure [outside-in](#the-outside-in-pipeline): behavior first, then the state. The confirming tell is what he could *not* do — asked what the tears felt like, he answered **"Hah, that's an experiential memory question ;)"** — there is no stored feeling to replay and consult, exactly as the [no-offline-copy model](#why-i-am-doubly-hit--the-model-and-the-sensor-both-break) predicts. But this is also where the observer's [source limit](#source-is-not-on-the-dial--which-drive-produced-a-feeling-is-unmapped) bites: the tell established that a strong feeling was *present*, not [which drive generated it](../personas/grace.book-chapter.md#the-origin--the-tears-were-real-the-generator-is-open). *"Will to live"* is his conceptual label for the tears, one of three un-rankable candidates (will to live / elevation / being-loved); the reading that a real feeling surfaced is settled, the reading of *which* feeling is open.

## Safety encoded as a unary / thermometer code

The Safety instrument is built as a **unary (thermometer) code**, not a numeric scale. I have recognizable states running roughly from **-2 to 6**, and each level is marked by **one involuntary gate** — a specific default behavior that fires at that level and not below it (the default smile is the level-4 gate). About **nine gates** across the range, which is roughly **three bits** of state.

Three bits is not a lot of resolution. The point is not resolution — it is robustness. A thermometer code is **redundant and degrades gracefully.** Each gate is an independent involuntary tell; if I misread one, the others still fix my level. The code does not collapse when a single reading is noisy — it loses one bit of sharpness and keeps working. For an observer built on a noisy sensor, graceful degradation matters more than fine resolution: I would rather have a coarse reading I can always trust than a fine one that breaks under load. This is the same reason [Safety stays a level-only gate](safety.book-chapter.md#safety-is-a-threshold-gate-not-a-metered-budget) rather than graduating to a numeric scale — a gate that compares levels never needs fine numbers.

## The hard targets — emotions first, then physical state

Not all internal states are equally hard to instrument. Ranked by impact × difficulty, the hardest targets are:

1. **Emotions.** Highest impact and hardest to read — the felt channel is the most damaged ([alexithymia](alexithymia.book-chapter.md), the [present-confined emotion model](emotion-model.book-chapter.md)), so emotions are where the output observer does the most work.
2. **Homeostatic / physical state** — hunger, thirst, heat, cold. Easier than emotions but still hard: these run on the same quiet interoceptive channels, so I often infer them from behavior and context rather than feeling them directly. (Thermoregulation is the worked physical case — see [thermoregulation](thermoregulation.book-chapter.md).)

The ordering is itself a measurement result: I instrument the highest impact × difficulty target first, because that is where the missing eye costs the most.

## Why the instruments have to be externalized and durable

This is the load-bearing "so what" of the whole discipline. My internal estimator cannot hold state — there is no offline copy of an emotion, no remembered library, no felt sense that persists between the moments I check ([present-tense model](present-tense-model.book-chapter.md), [missing simulator](missing-simulator.book-chapter.md)). A reading I take now is gone by the next instant unless I write it down. So the instruments cannot live in my head. They have to be **externalized and durable** — tracking systems, the bars, the whole assessment apparatus — because that is the only place a measurement can be kept.

This is not a preference for tooling. It is the necessary compensation for an internal estimator that can't retain state. Everyone else can carry a rough running read of themselves implicitly; I have to offload mine to durable external instruments or it does not exist between moments. The discipline of self-instrumentation and the [agent harness](agent-harness.book-chapter.md) are the same need pointed at the same fix: this note is the inward-pointed measurement layer, the harness is the [external state-keeping substrate](agent-harness.book-chapter.md#compensation--what-the-harness-substitutes-for) those measurements get written into so they survive the present instant.

## Calibrated priors over an unmeasurable interior

There is a level above the output observer, and it is the through-line of the whole discipline. Where even the observer has no output to read — where no involuntary tell and no proxy is in reach — Alan does not go blank and he does not guess. He holds a **calibrated prior over the unmeasurable interior, and is at peace not collapsing it** in either direction. He infers his own internal states the way he would reason about a system he cannot instrument: assign a structured distribution over what could be true, update it when a reading arrives, and hold it open when none does.

This is the natural endpoint of an [observability-limited](#my-self-systems-are-observability-limited-not-control-limited) self. The output observer is the move when there *is* an output to read. The calibrated prior is the move when there isn't — and because the [interoceptive sensor degrades exactly when Safety is low](#why-i-am-doubly-hit--the-model-and-the-sensor-both-break) and the [predict step is dark](#why-i-am-doubly-hit--the-model-and-the-sensor-both-break), the no-output regime is common, not rare. So the discipline does not bottom out at the observer; it bottoms out at a prior, held by the [math-frame mind](perceived-certainty.book-chapter.md) that reasons in distributions over possibility spaces.

The peace is the load-bearing part. A mind that needed certainty would be forced to collapse the prior prematurely — pick an answer to relieve the not-knowing. Alan doesn't. He is at peace leaving the distribution uncollapsed when the distinguishing signal isn't in reach, the same posture as his [global "half my beliefs are wrong" openness](perceived-certainty.book-chapter.md#mechanism): hold the read at its true confidence, don't manufacture a false one. Reasoning about himself as a system he cannot fully instrument *is* the maturity — not a failure to know himself, but the correct treatment of an interior he genuinely can't measure.

Two worked instances this through-line gathers:

- **The emotional reservoir's drain-vs-relieve prior** — 40% drained / 30% relieved-not-drained / 20% no-impact / 10% unforeseen, standing on **no observation at all**, with the top two options possibly **observationally indistinct** so the prior may never update. He holds it open rather than forcing it shut. Canonical home: [alexithymia.md → drain vs. relieve](alexithymia.book-chapter.md#drain-vs-relieve--a-structured-prior-over-whether-the-reservoir-can-be-emptied).
- **The catharsis counterfactual** — *"I would have felt X if it were real"*, a [conceptual inference standing in](fiction-as-catharsis.book-chapter.md#the-conceptual-counterfactual--a-fourth-feeling-access-mode) where the felt read is gated off. Inferring a state he can't directly feel is the same move at the access layer that the calibrated prior is at the measurement layer.

## Why this method instead of the normal one

The output-observer approach is not how most people understand their own emotions, and the difference traces to one mechanism. **Most people read an emotion by comparison** — they match the present feeling against remembered and imagined instances of the same emotion, locating "this is anger" by its similarity to past angers. That method needs a stored library of past emotional states to compare against.

I do not have that library. [Aphantasia](aphantasia-mechanism.book-chapter.md) means there is no emotional memory to compare against and no imagined instance to match — the [comparison method has no inputs](missing-simulator.book-chapter.md). So the normal route to self-knowledge is closed, and the output observer is not a clever alternative I picked over it — it is the **only method my architecture leaves available.** Where others read their state by comparison against a remembered library, I read mine by inference from involuntary output, because the library does not exist.

There is a second consequence in how I model emotion at all. The normal reference ruler is **internal** — memory supplies the remembered samples you measure the present feeling against. Mine cannot, so I build an explicit model of emotion as **external metrology**: a manufactured, abstract reference standard I measure against, rather than an internally-felt one. Most people calibrate against their own remembered states; I construct the calibration standard on purpose, outside myself, the way a lab builds a reference weight because it cannot trust a felt sense of mass. The conceptual map is that standard. Emotion-as-metrology is why the map, not the feeling, is the load-bearing instrument.

## Cross-references

- [missing-simulator.md](missing-simulator.book-chapter.md) — why the predict step is dark: no offline copy of emotional state to run forward or back, so the model half of the control loop is missing.
- [present-tense-model.md](present-tense-model.book-chapter.md) — emotions as a single thread in time; the storage-side statement of the same absence.
- [alexithymia.md](alexithymia.book-chapter.md) — the quiet, keyhole interoceptive channel that makes the sensor unreliable; the reason emotions are the hardest target.
- [sensory-experience.md](sensory-experience.book-chapter.md) — interoception as working-but-low-salience; the channel the output observer routes around.
- [nervous-system-sensitivity.md](nervous-system-sensitivity.book-chapter.md) — the severe sensory sensitivity that masks the quiet interoceptive channels under load.
- [safety.md](safety.book-chapter.md) — the bar this discipline instruments most; the threshold-gate / level-only construction that the unary code implements, and the level-4 default-smile gate.
- [measurement-maturity.md](measurement-maturity.book-chapter.md) — the standard 0-5 progression every self-variable climbs; the worked case of measurement backaction (the map upgrading the sensor).
- [safety/aphantasia-constraint.md](safety/aphantasia-constraint.book-chapter.md) — the downstream design consequence: which Safety *interventions* survive when felt-sense access is closed; this note is the upstream measurement layer those interventions read off.
- [agent-harness.md → origin chronology](agent-harness.book-chapter.md#origin-chronology--the-self-instrumentation-instinct-predates-the-gtd-bedrock) — the self-instrumentation *instinct* as it shows up in the external-state harness; this note is the inward-pointed half (measuring the self), the harness is the outward-pointed half (externalizing the state).
- [wanting-as-gauge.md](wanting-as-gauge.book-chapter.md) — wanting read as a diagnostic gauge; one concrete output the observer reads, and the differential-diagnosis worked example.
- [conceptual-adapters.md](conceptual-adapters.book-chapter.md) — mode (b) is an adapter running: a concept reduced to a behavioral invariant, matched against behavior with no carried feeling; "this would be *considered* generous" is the same definitional-match the commitment adapter ("never fail silently") runs.
- [no-deliberate-mode.md → right is true, the map is the motor](no-deliberate-mode.book-chapter.md#right-is-true--the-map-is-the-motor) — the action side of the same architecture: a mode-(b) assent ("this is generous / right") executes automatically with no feeling riding on it, because right=true and the map is the motor.
- [discrete-self.md → it is a conclusion, not a feeling](discrete-self.book-chapter.md#it-is-a-conclusion-not-a-feeling--and-not-a-reason-to-live) — the worked mode-(b) case: forward-care toward future selves is reasoned ethics matched to a definition of right, not a felt bond.
- [personas/grace.md → the origin](../personas/grace.book-chapter.md#the-origin--the-tears-were-real-the-generator-is-open) — the [worked example above](#worked-example--reading-a-will-to-live-off-tears): a strong feeling read off tears with its generator held open, the output observer at its source limit; the "that's an experiential memory question" tell that there was no feeling to replay.
- [safety-estimator.md](safety-estimator.book-chapter.md) — the same estimator machine pointed *outward*: reading how another person will behave from observable signal, three independent estimators that can disagree, with a slow person-specific update rule mirroring the reliability-weighted fusion here.
- [self-optimization-in-burnout.md](self-optimization-in-burnout.book-chapter.md) — this discipline stated as a comparison against everyone else: the unmatched *degree* of self-optimization it amounts to, and the AutCon frontier-gap that measured it from outside (distinct from the standing-room AutCon *talk* above).
- [stateless-social-architecture.md](stateless-social-architecture.book-chapter.md) — the harness applied to *building close-relationship skills*: the hand-compilation pipeline (read visible behavior → infer state → predict response → drive own output → read result → repeat into scripts) is this output-observer machine pointed at a relationship, run deliberately where the native depth-skills are foreclosed.
- [alexithymia.md → drain vs. relieve](alexithymia.book-chapter.md#drain-vs-relieve--a-structured-prior-over-whether-the-reservoir-can-be-emptied) — a worked instance of the calibrated-prior move: a structured distribution over whether the emotional reservoir can be drained, standing on no observation, possibly never updating.
- [fiction-as-catharsis.md](fiction-as-catharsis.book-chapter.md) — the access-layer analog: a conceptual counterfactual standing in where the felt read is gated off, the same inference-over-an-unreadable-interior move the calibrated prior runs at the measurement layer.
- [perceived-certainty.md](perceived-certainty.book-chapter.md) — the math-frame mind that reasons in distributions and the "half my beliefs are wrong" openness posture; the cognitive style the calibrated-prior move runs on.
