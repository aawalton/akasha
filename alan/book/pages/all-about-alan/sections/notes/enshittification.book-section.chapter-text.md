
# Enshittification

> Enshittification as the named primary threat — used broadly. The Doctorow three-stage shape (good-to-users → good-to-intermediaries → good-to-self) usually applies, with two modifications — the org need not be a platform, and the middle stage may be absent.

The named primary threat the trust criterion is defending against. I use the term broadly — broader than Cory Doctorow's original platform-economy framing.

## Definition

The trajectory by which an organization that was once good for its users degrades that goodness in pursuit of profit. The form of the degradation varies; the direction is invariant. Profit pressure pushes the organization away from serving users and toward extracting from them.

## The usual three-stage shape

Doctorow's original shape, which usually applies:

1. **Good to users.** Phase 1. The organization builds value for users — better product, better price, better service, fewer ads, more trust. Users become attached.
2. **Good to intermediaries.** Phase 2. Once users are attached, the organization redirects the value flow to business intermediaries — advertisers, suppliers, sellers, third parties. The user experience degrades; users tolerate it because switching cost has accumulated.
3. **Good to self.** Phase 3. Once intermediaries are also attached and have nowhere better to go, the organization redirects value flow to itself — extracting from both sides. Both users and intermediaries get worse outcomes.

The shape composes with switching cost: each phase locks in dependence further, so the organization can extract more in the next phase.

## Modifications I use in this book

Two modifications from Doctorow's original:

### The organization need not be a platform

Doctorow's framing was platform-centric (Amazon, Facebook, Google) because the platform shape makes the three-stage capture especially clean — users on one side, intermediaries on the other. I use the term beyond platforms.

A grocery chain can enshittify. An insurance company can. A utility can. A hospital system can. A government agency can. The mechanism — profit pressure pushing extraction over service — does not require a literal two-sided platform. It requires only:

- Users dependent on the organization for something they need.
- Switching cost (real, perceived, or invisible) that lets the organization degrade service without losing users.
- Internal or external pressure to convert that dependence into revenue.

That covers most large organizations under current conditions.

### The middle stage may be absent

The platform-economy shape has a clear middle stage where intermediaries get the value. Many non-platform organizations skip it. They go directly from **good to users** to **good to themselves** — no intermediary tier captures value in between.

Examples of the skip-middle shape:

- A grocery chain that pivots from "low margins, good prices" directly to "wider margins, higher prices, worse selection." No intermediary captures value; the organization just keeps more for itself.
- An insurance company that pivots from "honest claims processing" directly to "delay-and-deny." No third party benefits; the company keeps the premiums.
- A utility that pivots from "reliable service at regulated prices" directly to "service quality cuts to boost return on equity." No intermediary; the value flows to shareholders.

The skip-middle shape is the more common one outside platforms. The three-stage shape is the canonical case, but the framework has to recognize both.

## What enshittification looks like, concretely

Specific behaviors that signal the organization is currently somewhere on the trajectory:

- **Shrinkflation** — smaller portions / fewer features at the same price.
- **Fee creep** — new fees added to previously-included service, or fees raised faster than inflation.
- **Quality substitution** — cheaper inputs, longer wait times, fewer staff, reduced support hours.
- **Policy erosion** — return policies, warranty terms, refund timelines getting worse.
- **Attention monetization** — ads inserted into previously ad-free surfaces; user attention sold to advertisers.
- **Data monetization** — customer data sold or used to target the customer with extraction attempts.
- **Lock-in growth** — switching cost increased through artificial constraints (data portability removed, contract terms made stickier, integrations made one-way).
- **Customer-hostile design** — dark patterns, intentional friction in cancellation flows, intentional discoverability obstacles for cheaper options.

Any one of these is suggestive. Several at once across the same organization is the diagnostic signal.

## Why "enshittification" is the right name

The word is the right name for two reasons:

- **It compresses the trajectory into one term.** Three stages, multiple specific behaviors, one verb. The compression matters when reasoning about many organizations at once.
- **It signals the direction is universal.** The word makes clear that I'm not describing a few bad actors — I'm describing a trajectory that profit-pressured organizations follow by default. The trust criterion is the defense against the default.

Other names (decay, decline, degradation) are too neutral; they treat the trajectory as accidental rather than incentive-driven. Enshittification is the right word because it names the cause.

## Applications

- [trust-criterion.md](trust-criterion.book-chapter.md) — the criterion is the defense against this trajectory.
- [ranking-criterion.md → enshittification likelihood](ranking-criterion.book-chapter.md#factor-enshittification-likelihood) — each audit item gets a current-enshittification-likelihood score.
- The audit — every audited dependency is assessed for where it currently sits on the trajectory.
