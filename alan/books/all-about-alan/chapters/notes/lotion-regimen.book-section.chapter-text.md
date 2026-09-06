
# Lotion regimen

> Lotion regimen as a system — baseline maintenance of a protective skin layer, restored after each disruption. Tactile baseline management against skin-state cost. Bottles in 12+ locations; ~5-minute post-handwash window. Specific brand Alan tolerates.

A coherent system across the day: keep a protective lotion layer present on the hands by default, and restore it after each disruption. Promoted from a starter sub-system in [sub-systems.md](sub-systems.book-chapter.md) once the bundle was probed in detail. One of two systems in the tactile baseline management class, alongside [skin-on-skin prevention](skin-on-skin-prevention.book-chapter.md).

## Baseline maintenance, not reactive

The system shape is baseline maintenance. The default state is "protected" — lotion present on the hands continuously — and the response is to *restore* the baseline after disruption. Not "lotion when hands feel bad" but "maintain the protected state continuously, repair after each disruption."

This inverts the naive framing where lotion is a reactive tool used when dry skin shows up. The dry-skin signal is the *failure mode*, not the trigger. The system runs continuously; the trigger is loss of the protective layer, not the appearance of discomfort.

## Self-generated cost from the un-lotioned baseline

The cost of the un-lotioned baseline does not require external contact. Alan notices dry skin even when not touching anything — the skin state itself produces continuous low-level tactile signal.

This is a mechanism-clean way to see the system: the cost source is the skin's own state, not friction with the world. Whatever the regimen defends against is happening on the body, not at the body's interface with the environment. The protective layer suppresses the self-generated signal; without it, the signal runs continuously and drains [Stress Capacity](four-resource-model.book-chapter.md) at the per-input cost rate set by underlying [nervous-system sensitivity](nervous-system-sensitivity.book-chapter.md).

## Disruption response: handwashing and the ~5-minute window

The acute disruption case is handwashing. Soap and water strip the protective layer; the baseline has to be restored.

- **Re-application within ~5 minutes.** Lotion is re-applied roughly 5 minutes after every handwash.
- **Floor on the timing: wetness dilutes effectiveness.** Can't re-apply sooner. Lotion on wet skin doesn't form the protective layer; the water has to evaporate enough for the skin to be dry-enough.
- **Ceiling on the timing: minimize time un-protected.** Once the skin is dry-enough, re-apply immediately — the longer the gap, the more self-generated cost accumulates.

The ~5-minute window is the practical compromise between the two constraints. It's tight enough that the un-protected interval stays short, and loose enough that the lotion can actually bind to the skin.

## Ubiquity: bottles in 12+ locations

Lotion bottles live in 12+ different places throughout Alan's environment, so the tool is wherever he is when disruption happens. The system depends on prompt re-application; promptness depends on availability.

This is the same shape as the [tight clothing](tight-clothing.book-chapter.md) protocol's reliance on a default-on tool — the tool has to be present continuously for the protocol to run continuously. For lotion, "continuously present" means present at every site where disruption is likely to occur.

## Specific lotion: brand-specific

A particular brand of lotion Alan tolerates. The constraint is implicit but real — texture, ingredients, or scent are bounded by what the underlying [tactile sensitivity](sensory-experience.book-chapter.md) and [olfactory sensitivity](sensory-experience.book-chapter.md) can absorb without becoming their own cost source. Wrong lotion adds load instead of removing it.

The selection is one-time-then-stable: find a brand that works, then standardize across all 12+ locations so the tool's properties are consistent at every deployment site.

## Tactile baseline management as a system class

Lotion regimen sits in a system class — **tactile baseline management** — alongside [skin-on-skin prevention](skin-on-skin-prevention.book-chapter.md). Both are *defensive maintenance* patterns against tactile cost sources:

- **Lotion regimen** defends against skin-state cost (the self-generated signal from dry skin).
- **Skin-on-skin prevention** defends against input-doubling cost (skin touching skin registers on both sides — see [skin-on-skin-prevention.md](skin-on-skin-prevention.book-chapter.md) and the [input-doubling mechanism](nervous-system-sensitivity.book-chapter.md#input-doubling-on-skin-on-skin-contact)).

Both run a default-maintained-state shape: maintain a protected baseline continuously, respond to disruption by restoring the baseline.

## Distinct from the asymmetric-cost adaptation pattern

The lotion case is *not* the same shape as the [asymmetric-cost adaptation](auditory-sensitivity-bundle.book-chapter.md#default-mode-and-manual-relief) pattern in the auditory and tactile-tight-clothing systems. Those run default-max-with-manual-relief-downward — protective extreme by default, intentional override toward less protection under load.

The lotion regimen has no intentional downward relief. Alan does not choose to spend time un-lotioned. The baseline-disruption events are externally caused (water from handwashing), not chosen. Restoring the baseline is the only move; there is no relief direction.

This is a different cost-shape than the asymmetric-cost cases. Whether it warrants a refinement to the cost-shape framing or stays as its own pattern is flagged in `/abby`'s backlog.

## Cross-references

- **[skin-on-skin-prevention.md](skin-on-skin-prevention.book-chapter.md).** Sibling system in the tactile baseline management class. Same default-maintained-state shape, different cost source (input-doubling rather than skin-state).
- **[nervous-system-sensitivity.md](nervous-system-sensitivity.book-chapter.md).** Mechanism root — high per-input cost is why the un-lotioned baseline generates measurable load even without external contact.
- **[sensory-experience.md](sensory-experience.book-chapter.md).** Touch sensitivity is the underlying trait this regimen compensates for. The lotion-regimen substance now lives here as the canonical home; sensory-experience.md links back.
- **[tight-clothing.md](tight-clothing.book-chapter.md).** Tactile sibling — also a default-maintained system with continuous tool presence, different mechanism (proprioceptive grounding + touch-stimuli cost reduction). The cross-link is mechanism-only; the loose-vs-tight distinction in tight-clothing doesn't apply to lotion.
- **[sensory-regulation-tools.md](sensory-regulation-tools.book-chapter.md).** The four-tier preference hierarchy. Lotion fits the on/off tier per disruption event, but the baseline-maintenance shape is the more accurate framing than the tier hierarchy.
- **[four-resource-model.md](four-resource-model.book-chapter.md).** Stress Capacity is the resource drained by the un-lotioned baseline.
- **[sub-systems.md](sub-systems.book-chapter.md).** Originally listed as a starter sub-system; promoted to its own file once probed.
