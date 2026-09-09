
# Harness attention

> Harness attention — how Alan visually monitors and paces 8-12 concurrent agent teams while playing ESO. The motion-attractor / stillness-find detection rule, the boredom thermostat that paces switching, and the 12-team ceiling that turns out to be screen legibility. Every parameter of the system is visual.

The [agent harness](agent-harness.book-chapter.md) describes *what* the system substitutes for and amplifies. This note is the lived level: how Alan actually runs a harness day at the screen — how he detects which agent needs him, and what paces his switching between them.

The setup looks like it should be chaos and isn't. Alan runs 8-12 agent teams at once on the left half of his monitor (VSCode Claude Code terminal windows), with ESO open and music playing. The streams don't collide because his attention is governed by a few simple visual rules. The whole system, it turns out, closes entirely on the visual.

## Detecting "needs me" — motion is the attractor, stillness is the find

An agent needs him when its work stops — text was streaming, now it's still. A blue tint fires on the window at 60 seconds as a backstop, but most of the time he catches the agent before the tint, off the raw window.

The naive version of this is wrong: it is *not* that a still window pops out on its own and grabs his eye. Stillness doesn't attract. Motion does, the ordinary way — a moving thing draws the gaze. Once motion has pulled his gaze to a patch of screen, he reads the *neighbors* there and clocks the still one. In his words: *"the motion is catching my eye and when the motion catches my eye I notice if nearby windows are still."* So motion is the attractor; stillness is what he finds once he's arrived. *"The stillness catches my eye"* — but only after motion has brought him to the neighborhood.

This makes one case predictable: the window most likely to slip all the way to the 60-second blue tint is a still window whose **neighbors are also still** — a quiet neighborhood with no motion nearby to drag his eye over. A window that finishes alone next to busy ones gets caught fast; a cluster that all goes quiet together has nothing to summon him. That dead-patch case is exactly where the blue-tint backstop earns its keep.

## Two gears

The detection runs in two gears.

- **Ambient.** Motion tugs his eye, he scans the neighbors. This is the default, running continuously underneath whatever else he's doing.
- **Deliberate.** He turns to the whole left half and sweeps every window on purpose: *"when I'm looking at the agents in general, I'll usually check all of them."*

The blue tint covers the blind spot of the ambient gear — the dead patch where no motion fires. The full sweep is a separate, deliberate act, not a refinement of the ambient one.

## Boredom is the needle — what paces the switching

What moves him between the agents and ESO is boredom. *"Basically, I transition when I'm bored."* As long as the agents hold his attention — there's a question to answer, something to decide — he stays on the agents. When all of them are working and there's nothing for him, he switches back to ESO until the next loading screen. A loading screen is the moment he checks whether the agents need him again.

This flips the apparent roles. The agents are the **primary** surface; ESO is the **filler** — what he drops into when the agents have nothing for him, not the other way around. Engagement keeps him where the engagement is.

## The thermostat — boredom converts to more work-in-flight

Boredom is an error signal, and it has two ways to burn off. One is to flip to ESO. The other is to spin up a *new* project — if there's an open slot among the twelve. *"Whenever I'm bored in general, waiting on everything, I start up a new project, assuming I have an empty slot in the 12 teams."*

So idle time converts straight into more work-in-flight. Boredom keeps feeding the slots until he hits the ceiling, then ESO mops up whatever quiet is left.

This interest-driven pacing only *looks* like the opposite of Alan's [importance-over-urgency law](importance-over-urgency.book-chapter.md). It isn't: the boredom thermostat ranges only over an **importance-gated board** — every one of the twelve slots already passed the importance test to exist at all, so letting boredom pick which survivor he touches next is what he is allowed to do once importance has done its gating upstream. The two-floors resolution is in [importance-over-urgency.md → two floors](importance-over-urgency.book-chapter.md#two-floors--why-interest-chasing-is-not-a-contradiction).

This reframes the team count. Running 8-12 teams is partly an **attention defense**, not only a throughput play — enough live streams that the odds of "something needs me right now" stay high, so he's rarely sitting in an understimulated trough. The throughput is real, but the boredom-thermostat is a second reason the number runs high. This is the work-stream face of the same arousal-band regulation in [stimulation regulation](stimulation-regulation.book-chapter.md): there ESO and music are the knobs; here a new team is a knob too, and boredom is the sensor calling for more.

## The ceiling is the glass

What sets the ceiling at twelve is not supervision cost and not the limit of his eye's sweep. It is screen space. *"12 is the number of VSCode Claude Code terminal windows that fit on the left half of my screen while still being legible."* Legibility on the left half is the wall — fit one more window and the text gets too small to read at a glance, which breaks the motion-and-stillness detection the whole system runs on.

## The waterline — pushing work below the glass

Twelve visible windows is not a ceiling on the *work*. It is the size of the layer Alan personally stands on — the legible-on-the-left-half limit from the section above. When he needs more parallelism than his eyes can hold, he does not widen his attention. He pushes the extra work **under the waterline**: one of the twelve visible slots is itself a manager that fans out to **headless agents he never watches**. That one slice does the watching for him, so the work scales past twelve while the thing his eye monitors stays at twelve.

What stays above the line versus what sinks below it is set by **interaction cost.** In his words: *"Mostly based on how much interaction is needed. Its inconvenient to pass interaction back and forth through a proxy."* So the visible twelve are not his most *important* work — they are his most *conversational* work, the streams that need him in the loop. Throughput that does not need to talk to him sinks below the waterline.

The waterline has no stillness-signal and no blue tint — below-glass work is out of his visual field entirely. So how does a headless slice that turns out to need him mid-run reach him? In his words: *"The headless agent communicates to the manager and the manager gets the input from me."* A headless agent cannot reach him directly, but its manager can, and the manager is always one of the visible twelve. So any below-waterline need surfaces as a change in a window he is already watching — it re-enters through the same motion-and-stillness detection every other stream runs through. The system closes: every signal that wants him, wherever it originates, ends up on the glass.

## The through-line — every parameter is visual

Each piece of the system turns out to be a visual fact:

- The **signal** he detects by — motion, then stillness in the neighbors.
- The **trigger** that switches him — the ESO loading screen, and the swept windows.
- The **ceiling** itself — legibility on the left half of the glass.
- The **waterline** — below-glass work re-enters through a visible manager, so even the work he never watches reports up onto the screen.

The whole attention system closes on the screen. This is the [stateless-server working model](discrete-self.book-chapter.md#the-stateless-server-working-model) made concrete at the level of the eye: the long-horizon state lives in the teams, and Alan — living inside the [roughly-3-second window](discrete-self.book-chapter.md#a-roughly-3-second-window) — serves whichever request the screen shows him needs serving, then drops back to the filler.

## Cross-references

- [agent-harness.md → the stateless-server working configuration](agent-harness.book-chapter.md#the-stateless-server-working-configuration) — the architecture-level treatment of the 8-12-team day; this note is its lived, screen-level operation.
- [stimulation-regulation.md](stimulation-regulation.book-chapter.md) — the arousal thermostat the boredom-thermostat is the work-stream instance of; ESO, music, and a new team are all knobs, focus and boredom the sensors.
- [discrete-self.md → the stateless-server working model](discrete-self.book-chapter.md#the-stateless-server-working-model) — the present-bound architecture the screen-level monitoring instantiates.
- [interest-modulator.md → multi-stream parallelism](interest-modulator.book-chapter.md#multi-stream-parallelism) — the multi-stream day the detection and pacing run across.
- [attention-budget.md](attention-budget.book-chapter.md) — the budget this monitoring spends, from the attention-economics side.
- [importance-over-urgency.md](importance-over-urgency.book-chapter.md) — the general law the boredom thermostat appears to contradict; the two-floors resolution shows the interest-pacing ranges only over an importance-gated board.
